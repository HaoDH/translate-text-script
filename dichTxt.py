import asyncio
import os
import logging
from typing import Tuple, List, Optional
from lingua import Language, LanguageDetectorBuilder
import translators as ts
import re

logging.basicConfig(filename='translation_errors.log', level=logging.ERROR, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

detector = LanguageDetectorBuilder.from_languages(Language.ENGLISH, Language.VIETNAMESE).build()

def detect_language(text: str) -> Optional[str]:
    try:
        if not text or not text.strip():
            return None
        language = detector.detect_language_of(text)
        return language.iso_code_639_1.name.lower() if language else None
    except Exception as e:
        logging.error(f"Lỗi khi phát hiện ngôn ngữ của '{text}': {e}")
        return None

def is_english(text: str) -> bool:
    detected_lang = detect_language(text)
    return detected_lang == 'en'

def is_key_value_format(text: str) -> bool:
    """
    Kiểm tra xem chuỗi có dạng key=value không (ví dụ: Event=3, Event=4).
    Quy tắc: chứa dấu =, không có khoảng trắng trước/sau dấu =.
    """
    return bool(re.match(r'^[^=\s]+=[^=\s]+$', text))

async def translate_text(text: str) -> Optional[str]:
    if not is_english(text):
        print(f"Văn bản '{text}' không phải tiếng Anh, không thực hiện dịch.")
        return text
    if is_key_value_format(text):
        print(f"Văn bản '{text}' có dạng key=value, không thực hiện dịch.")
        return text
    try:
        print(f"Đang dịch '{text}' từ tiếng Anh sang tiếng Việt...")
        # Dùng Google Translate rõ ràng và thử lại nếu dịch sai
        translated_text = await asyncio.to_thread(ts.translate_text, text, translator='google', 
                                                 from_language='en', to_language='vi')
        # Kiểm tra nếu dịch không thay đổi thì thử lại
        if translated_text.strip() == text.strip():
            print(f"Dịch thất bại lần 1 cho '{text}', thử lại...")
            translated_text = await asyncio.to_thread(ts.translate_text, text, translator='google', 
                                                     from_language='en', to_language='vi')
        print(f"Đã dịch: '{text}' -> '{translated_text}'")
        return translated_text.strip()
    except Exception as e:
        logging.error(f"Lỗi khi dịch văn bản '{text}': {e}")
        return None

async def process_line(line: str) -> Tuple[str, Optional[str], Optional[str]]:
    match = re.search(r'string value = "(.*?)"', line)
    if match:
        text_to_translate = match.group(1)
        translated_text = await translate_text(text_to_translate)
        if translated_text:
            line = line.replace(text_to_translate, translated_text)
            return line, text_to_translate, translated_text
    return line, None, None

async def process_file(input_filename: str, output_filename: str) -> None:
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

    tasks = [process_line(line) for line in lines]
    results = await asyncio.gather(*tasks)

    with open(output_filename, 'w', encoding='utf-8') as outfile:
        for line, original, translated in results:
            outfile.write(line)
            if original and translated and original != translated:  # Chỉ thêm nếu có thay đổi
                translations.append((original, translated))
                count += 1

    print(f"Đã xử lý xong. Kết quả đã được lưu vào: {output_filename}")
    if translations:
        print(f"\nTổng số câu đã dịch: {count}")
        print("\nCác câu đã dịch:")
        for original, translated in translations:
            print(f"Tiếng Anh: {original} -> Tiếng Việt: {translated}")
    else:
        print("Không có câu nào được dịch.")
    print(f"\nTổng số câu đã dịch trong file: {count}")

async def main():
    input_filename = 'file.txt'
    output_filename = 'file_tran.txt'
    await process_file(input_filename, output_filename)

if __name__ == "__main__":
    asyncio.run(main())
