import { HDD, MULTI, SINGLE, SSD } from "./word_constants";

export const servicesList = [
    {
        name: "backblaze.com",
        serviceIcon: "https://www.backblaze.com/blog/wp-content/uploads/2017/12/backblaze_icon_transparent.png",
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
        serviceIcon: "https://i.fbcd.co/products/original/af672813cb7a7c9465c827a52ac7356c91efecb3a98b3aa7745d61a66cad910a.jpg",
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
        serviceIcon: "https://avatars.githubusercontent.com/u/5185491?s=280&v=4",
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
         serviceIcon: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/06/vultr-alternative-logo.webp",
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