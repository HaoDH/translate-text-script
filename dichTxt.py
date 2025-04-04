import asyncio
import os
import logging
from typing import Tuple, List, Optional
from lingua import Language, LanguageDetectorBuilder
import translators as ts
import re

# Thiết lập logging để ghi lỗi vào file
logging.basicConfig(filename='translation_errors.log', level=logging.ERROR, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Khởi tạo detector ngôn ngữ với lingua-py
detector = LanguageDetectorBuilder.from_languages(Language.ENGLISH, Language.VIETNAMESE).build()

def detect_language(text: str) -> Optional[str]:
    """Phát hiện ngôn ngữ của văn bản bằng lingua-py.

    Args:
        text: Chuỗi văn bản cần kiểm tra.
    Returns:
        Mã ngôn ngữ ('en', 'vi', hoặc None nếu lỗi).
    """
    try:
        if not text or not text.strip():
            return None
        language = detector.detect_language_of(text)
        return language.iso_code_639_1.name.lower() if language else None
    except Exception as e:
        logging.error(f"Lỗi khi phát hiện ngôn ngữ của '{text}': {e}")
        return None

def is_english(text: str) -> bool:
    """Kiểm tra nếu văn bản là tiếng Anh.

    Args:
        text: Chuỗi văn bản cần kiểm tra.
    Returns:
        True nếu là tiếng Anh, False nếu không.
    """
    detected_lang = detect_language(text)
    return detected_lang == 'en'

async def translate_text(text: str) -> Optional[str]:
    """Dịch văn bản từ tiếng Anh sang tiếng Việt nếu cần.

    Args:
        text: Chuỗi văn bản cần dịch.
    Returns:
        Văn bản đã dịch hoặc văn bản gốc nếu không cần dịch.
    """
    if not is_english(text):
        print(f"Văn bản '{text}' không phải tiếng Anh, không thực hiện dịch.")
        return text

    try:
        print(f"Đang dịch '{text}' từ tiếng Anh sang tiếng Việt...")
        # Sử dụng translators với Google Translate, tối ưu cho batching
        translated_text = await asyncio.to_thread(ts.translate_text, text, from_language='en', to_language='vi')
        print(f"Đã dịch: '{text}' -> '{translated_text}'")
        return translated_text.strip()
    except Exception as e:
        logging.error(f"Lỗi khi dịch văn bản '{text}': {e}")
        return None

async def process_line(line: str) -> Tuple[str, Optional[str], Optional[str]]:
    """Xử lý từng dòng văn bản, tìm và dịch các chuỗi cần thiết.

    Args:
        line: Dòng văn bản cần xử lý.
    Returns:
        Tuple chứa dòng đã xử lý, văn bản gốc, và văn bản đã dịch (nếu có).
    """
    match = re.search(r'string value = "(.*?)"', line)
    if match:
        text_to_translate = match.group(1)
        translated_text = await translate_text(text_to_translate)
        if translated_text:
            line = line.replace(text_to_translate, translated_text)
            return line, text_to_translate, translated_text
    return line, None, None

async def process_file(input_filename: str, output_filename: str) -> None:
    """Xử lý file đầu vào và xuất file đầu ra sau khi dịch.

    Args:
        input_filename: Đường dẫn file đầu vào.
        output_filename: Đường dẫn file đầu ra.
    """
    # Kiểm tra file đầu vào
    if not os.path.exists(input_filename):
        logging.error(f"File đầu vào '{input_filename}' không tồn tại.")
        print(f"File '{input_filename}' không tồn tại.")
        return

    try:
        with open(input_filename, 'r', encoding='utf-8') as infile:
            lines = infile.readlines()
    except UnicodeDecodeError:
        logging.error(f"Không thể đọc file '{input_filename}' với mã hóa UTF-8.")
        print(f"File '{input_filename}' không đọc được, kiểm tra mã hóa.")
        return

    print(f"Đang xử lý file: {input_filename}")
    translations: List[Tuple[str, str]] = []
    count = 0

    # Xử lý bất đồng bộ các dòng
    tasks = [process_line(line) for line in lines]
    results = await asyncio.gather(*tasks)

    # Ghi kết quả vào file đầu ra
    with open(output_filename, 'w', encoding='utf-8') as outfile:
        for line, original, translated in results:
            outfile.write(line)
            if original and translated:
                translations.append((original, translated))
                count += 1

    print(f"Đã xử lý xong. Kết quả đã được lưu vào: {output_filename}")

    # In danh sách các câu đã dịch
    if translations:
        print(f"\nTổng số câu đã dịch: {count}")
        print("\nCác câu đã dịch:")
        for original, translated in translations:
            print(f"Tiếng Anh: {original} -> Tiếng Việt: {translated}")
    else:
        print("Không có câu nào được dịch.")

    print(f"\nTổng số câu đã dịch trong file: {count}")

# Hàm chính để chạy chương trình
async def main():
    input_filename = 'file.txt'
    output_filename = 'file_tran.txt'
    await process_file(input_filename, output_filename)

if __name__ == "__main__":
    asyncio.run(main())