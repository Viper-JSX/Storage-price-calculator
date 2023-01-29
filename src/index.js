import "./css/main.css";
import { servicesList } from "./js/various_things/services_list";
import { HDD, SINGLE, SSD } from "./js/various_things/word_constants";

let storageSize = 100;
let transferSize = 100;

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

console.log(servicesStateList);

function calculatePricing(){
    const pricing = servicesStateList.map((serviceState) => {
        let resultingStorageSize = storageSize;
        let resultingTransferSize = transferSize;
        let storagePrice = 0;
        let transferPrice = transferPrice = serviceState.service.pricing.transfer * transferSize; //Currently there is only one transfer option
        let totalPrice = 0;
        const discounts = serviceState.service.discounts;

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

        if(serviceState.storageType){
            switch(serviceState.storageType){
                case HDD: {
                    storagePrice = storageSize * serviceState.service.pricing.storage.hdd;
                    break;
                }
                case SSD: {
                    storagePrice = storageSize * serviceState.service.pricing.storage.ssd;
                    break;
                }
                case SINGLE: {
                    storagePrice = storageSize * serviceState.service.pricing.storage.single;
                    break;
                }
                case MULTI: {
                    storagePrice = storageSize * serviceState.service.pricing.storage.multi;
                    break;
                }
            }
        }
        else{
            storagePrice = storageSize * serviceState.service.pricing.storage;
        }

        console.log(serviceState.service.name, resultingStorageSize, resultingTransferSize, storagePrice, transferPrice);
    });
}

calculatePricing();