import "./css/main.css";
import { servicesList } from "./js/various_things/services_list";
import { HDD, SINGLE } from "./js/various_things/word_constants";

let storageSize = 0;
let transferSize = 0;

const servicesState = servicesList.map((service) => {
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

console.log(servicesState);