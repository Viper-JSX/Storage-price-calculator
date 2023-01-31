import { HDD, MULTI, SINGLE, SSD } from "./word_constants";

export const servicesList = [
    {
        name: "backbaze.com",
        pricing: {
            storage: 0.005,
            transfer: 0.01
        },
        limits: {
            minPay: 7,
            maxPay: null
        },
        hddOrSsdOption: false,
        singleOMultiOption: false,
        discounts: null
    }, 

    {
        name: "bunny.net",
        pricing: {
            storage: {
                [HDD]: 0.01,
                [SSD]: 0.02
            },
            transfer: 0.01
        },
        limits: {
            minPay: null,
            maxPay: 10
        },
        hddOrSsdOption: true,
        singleOMultiOption: false,
        discounts: null
    }, 

    {
        name: "scaleway.com",
        pricing: {
            storage: {
                [SINGLE]: 0.03,
                [MULTI]: 0.06
            },
            transfer: 0.02
        },
        limits: null,
        hddOrSsdOption: false,
        singleOMultiOption: true,
        discounts: {
            storage: {
                gigabytesForFree: 75
            },
            transfer: {
                gigabytesForFree: 75
            }
        }
    }, 

     {
         name: "vultrl.com",
         pricing: {
             storage: 0.01,
             transfer: 0.01
         },
         limits: {
             minPay: 5,
             maxPay: null
         },
         hddOrSsdOption: false,
         singleOMultiOption: false,
         discounts: null
     },   
     
];