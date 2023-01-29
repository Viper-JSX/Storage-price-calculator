import "./css/main.css";
import { calculatePricing } from "./js/utilities/calculatePricing";
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


console.log(calculatePricing(servicesStateList, storageSize, transferSize));

