/******************************

脚本功能：Grammarly解锁订阅
软件版本：2.2.0
下载地址：http://t.cn/A66x3u4I
脚本作者：Hausd0rff
更新时间：2022-07-16
脚本发布：https://t.me/yqc_123
问题反馈：https://t.me/yqc_777
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > Grammarly解锁订阅
^https?:\/\/subscription\.grammarly\.com\/api\/v1\/subscription$ url script-response-body https://raw.githubusercontent.com/yqc007/QuantumultX/master/GrammarlyPremiumCrack.js

[mitm] 
hostname = subscription.grammarly.com

*******************************/

var body = $response.body;
var objc = JSON.parse(body);

objc = {
  "isFree" : false,
  "proPlans" : [
    {
      "id" : 10203085,
      "description" : "Monthly Grammarly Pro plan",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 30
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 30
      },
      "regularPlanId" : 10203085,
      "renewalPriceMoney" : {
        "currency" : "USD",
        "value" : 30
      },
      "baseInstitutionCampaign" : false,
      "title" : "Monthly",
      "price" : 30,
      "renewalPlanId" : 10203085,
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 30,
      "periodMonths" : 1,
      "renewalPrice" : 30
    },
    {
      "id" : 10203908,
      "description" : "Quarterly Grammarly Pro plan",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 60
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 60
      },
      "regularPlanId" : 10203908,
      "renewalPriceMoney" : {
        "currency" : "USD",
        "value" : 60
      },
      "baseInstitutionCampaign" : false,
      "title" : "Quarterly",
      "price" : 60,
      "priceTiers" : [
        {
          "priceMoney" : {
            "currency" : "USD",
            "value" : 60
          },
          "fromSeats" : 0,
          "price" : 60,
          "toSeats" : 149
        }
      ],
      "renewalPlanId" : 10203908,
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 60,
      "periodMonths" : 3,
      "renewalPrice" : 60
    },
    {
      "id" : 10203084,
      "description" : "Annual Grammarly Pro plan",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 144
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 144
      },
      "regularPlanId" : 10203084,
      "renewalPriceMoney" : {
        "currency" : "USD",
        "value" : 144
      },
      "baseInstitutionCampaign" : false,
      "title" : "Annual",
      "price" : 144,
      "priceTiers" : [
        {
          "priceMoney" : {
            "currency" : "USD",
            "value" : 144
          },
          "fromSeats" : 0,
          "price" : 144,
          "toSeats" : 149
        }
      ],
      "renewalPlanId" : 10203084,
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 144,
      "periodMonths" : 12,
      "renewalPrice" : 144
    }
  ],
  "isSamsungPlan" : false,
  "lastSubscribedDate" : "Jun 18, 2025, 09:34:05 AM",
  "expirationDate" : "Jun 18, 2027, 09:33:47 AM",
  "isUngatedTrialDisabled" : false,
  "isEligibleForGr4vyMigration" : false,
  "isPremium" : true,
  "isLegacyPayPal" : false,
  "currentPlan" : {
    "id" : 10200481,
    "description" : "Apple Annual",
    "regularPriceMoney" : {
      "currency" : "USD",
      "value" : 144
    },
    "priceMoney" : {
      "currency" : "USD",
      "value" : 139.99000000000001
    },
    "regularPlanId" : 1005,
    "baseInstitutionCampaign" : false,
    "title" : "Annual",
    "price" : 139.99000000000001,
    "hasTrial" : false,
    "trialDays" : 0,
    "regularPrice" : 144,
    "periodMonths" : 12
  },
  "countryCode" : "VN",
  "isDunning" : false,
  "institutionDynamicPlans" : [
    {
      "id" : 10201490,
      "description" : "Annual tiered plan",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 180
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 180
      },
      "regularPlanId" : 10201490,
      "baseInstitutionCampaign" : true,
      "title" : "Annual",
      "price" : 180,
      "priceTiers" : [
        {
          "priceMoney" : {
            "currency" : "USD",
            "value" : 180
          },
          "fromSeats" : 0,
          "price" : 180,
          "toSeats" : 9
        },
        {
          "priceMoney" : {
            "currency" : "USD",
            "value" : 174
          },
          "fromSeats" : 10,
          "price" : 174,
          "toSeats" : 49
        },
        {
          "priceMoney" : {
            "currency" : "USD",
            "value" : 150
          },
          "fromSeats" : 50,
          "price" : 150,
          "toSeats" : 149
        }
      ],
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 180,
      "periodMonths" : 12
    },
    {
      "id" : 10201491,
      "description" : "Annual tiered plan",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 180
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 180
      },
      "regularPlanId" : 10201491,
      "baseInstitutionCampaign" : true,
      "title" : "Annual",
      "price" : 180,
      "priceTiers" : [
        {
          "priceMoney" : {
            "currency" : "USD",
            "value" : 180
          },
          "fromSeats" : 0,
          "price" : 180,
          "toSeats" : 9
        },
        {
          "priceMoney" : {
            "currency" : "USD",
            "value" : 174
          },
          "fromSeats" : 10,
          "price" : 174,
          "toSeats" : 49
        },
        {
          "priceMoney" : {
            "currency" : "USD",
            "value" : 150
          },
          "fromSeats" : 50,
          "price" : 150,
          "toSeats" : 149
        }
      ],
      "hasTrial" : true,
      "trialDays" : 7,
      "regularPrice" : 180,
      "periodMonths" : 12
    }
  ],
  "proPricingOptions" : {
    "discountSuppressed" : false
  },
  "paymentMethodOptions" : {
    "disabledCardTypes" : [

    ],
    "payPalDisabled" : false,
    "americanExpressDisabled" : false
  },
  "state" : "DEFAULT",
  "usePaymentsApi" : false,
  "subscriptionPaymentMethods" : [
    "appStore"
  ],
  "isGooglePlaySubscription" : false,
  "pricingOptions" : {
    "discountSuppressed" : false,
    "renewalPriceType" : "INCLUSIVE"
  },
  "plans" : [
    {
      "id" : 1001,
      "description" : "1-month Grammarly Subscription",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 30
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 30
      },
      "regularPlanId" : 1001,
      "baseInstitutionCampaign" : false,
      "title" : "Monthly",
      "price" : 30,
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 30,
      "periodMonths" : 1
    },
    {
      "id" : 1003,
      "description" : "3-month Grammarly Subscription",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 60
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 60
      },
      "regularPlanId" : 1003,
      "baseInstitutionCampaign" : false,
      "title" : "Quarterly",
      "price" : 60,
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 60,
      "periodMonths" : 3
    },
    {
      "id" : 1005,
      "description" : "1-year Grammarly Subscription",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 144
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 144
      },
      "regularPlanId" : 1005,
      "baseInstitutionCampaign" : false,
      "title" : "Annual",
      "price" : 144,
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 144,
      "periodMonths" : 12
    }
  ],
  "institutionPlans" : [
    {
      "id" : 10200462,
      "description" : "1-month Grammarly Subscription",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 25
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 25
      },
      "regularPlanId" : 10200462,
      "baseInstitutionCampaign" : true,
      "title" : "Monthly",
      "price" : 25,
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 25,
      "periodMonths" : 1
    },
    {
      "id" : 10200487,
      "description" : "1-month Grammarly Subscription",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 25
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 25
      },
      "regularPlanId" : 10200487,
      "baseInstitutionCampaign" : true,
      "title" : "Monthly",
      "price" : 25,
      "hasTrial" : true,
      "trialDays" : 7,
      "regularPrice" : 25,
      "periodMonths" : 1
    }
  ],
  "canCancelPlanSwitch" : false,
  "isFreebie" : false,
  "isOnTrial" : false,
  "customerSince" : "Jun 18, 2025, 09:34:05 AM",
  "isPaymentMethodFailed" : false,
  "isPremiumConversion" : false,
  "institutionEduPlans" : [
    {
      "id" : 10201059,
      "description" : "A plan for EDU with flat pricing per seat.",
      "regularPriceMoney" : {
        "currency" : "USD",
        "value" : 50
      },
      "priceMoney" : {
        "currency" : "USD",
        "value" : 50
      },
      "regularPlanId" : 10201059,
      "baseInstitutionCampaign" : false,
      "title" : "flat_edu_plan",
      "price" : 50,
      "hasTrial" : false,
      "trialDays" : 0,
      "regularPrice" : 50,
      "periodMonths" : 12
    }
  ],
  "isAppleSubscription" : true,
  "isCancelled" : true
};

body = JSON.stringify(objc);
$done({ 
    body 
});
