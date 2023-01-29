import "./css/main.css";
import { servicesList } from "./js/various_things/services_list";
import { HDD, MULTI, SINGLE, SSD } from "./js/various_things/word_constants";

let storageSize = 1000;
let transferSize = 1000;

const servicesStateList = servicesList.map((service) => {
    const serviceState = {
        service: JSON.parse(JSON.stringify(service)) //To remove all object references
    };

    if(service.pricing.storage.hdd){ // HDD or SSD
        serviceState.storageType = HDD; 
    }
    else if(service.pricing.storage.multi){ // single or multi
        serviceState.storageType = SINGLE;
    }

    return serviceState;
});


function calculatePricing(){
    const pricing = servicesStateList.map((serviceState) => {
        let resultingStorageSize = storageSize;
        let resultingTransferSize = transferSize;
        let storagePrice = 0;
        let transferPrice = 0;
        let totalPrice = 0;
        const discounts = serviceState.service.discounts;
        const limits = serviceState.service.limits;

        if(discounts){ //There are some discounts present
            if(discounts.storage && discounts.storage.gigabytesForFree){
                const gigabytesForFree = discounts.storage.gigabytesForFree;
                resultingStorageSize = storageSize - gigabytesForFree > 0 ? storageSize - gigabytesForFree : 0
            }

            if(discounts.transfer && discounts.transfer.gigabytesForFree){
                const gigabytesForFree = discounts.transfer.gigabytesForFree;
                resultingTransferSize = transferSize - gigabytesForFree > 0 ? transferSize - gigabytesForFree : 0
            }
        }

        //Storage price calculation
        if(serviceState.storageType){
            switch(serviceState.storageType){
                case HDD: {
                    storagePrice = resultingStorageSize * serviceState.service.pricing.storage.hdd;
                    break;
                }
                case SSD: {
                    storagePrice = resultingStorageSize * serviceState.service.pricing.storage.ssd;
                    break;
                }
                case SINGLE: {
                    storagePrice = resultingStorageSize * serviceState.service.pricing.storage.single;
                    break;
                }
                case MULTI: {
                    storagePrice = resultingStorageSize * serviceState.service.pricing.storage.multi;
                    break;
                }
            }
        }
        else{
            storagePrice = resultingStorageSize * serviceState.service.pricing.storage;
        }

        transferPrice = serviceState.service.pricing.transfer * resultingTransferSize; //Currently there is only one transfer option

        totalPrice = storagePrice + transferPrice;

        //Price bound
        if(limits){
            if(limits.minPay && totalPrice < limits.minPay) totalPrice = limits.minPay;
            if(limits.maxPay && totalPrice > limits.maxPay) totalPrice = limits.maxPay;
        }

        console.log(serviceState.service.name, "total:", totalPrice);
    });
}

calculatePricing();