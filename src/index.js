import "./css/main.css";
import { calculatePricing } from "./js/utilities/calculatePricing";
import { servicesList } from "./js/various_things/services_list";
import { HDD, MULTI, SINGLE, SSD } from "./js/various_things/word_constants";

const storageSizeInput = document.getElementById("storageSizeInput");
const transferSizeInput = document.getElementById("transferSizeInput");

const chartServices = document.getElementById("chartServices");
const chartColumns = document.getElementById("chartColumns");


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

storageSizeInput.addEventListener("change", hanbdleStorageSizeChange);
transferSizeInput.addEventListener("change", hanbdleTransferSizeChange);



function hanbdleStorageSizeChange(event){
    storageSize = parseInt(event.target.value);
    const pricing = calculatePricing(servicesStateList, storageSize, transferSize);
}

function hanbdleTransferSizeChange(event){
    transferSize = parseInt(event.target.value);
    const pricing = calculatePricing(servicesStateList, storageSize, transferSize);
}


