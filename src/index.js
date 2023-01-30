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

    if(service.pricing.storage[HDD]){ // HDD or SSD
        serviceState.storageType = HDD; 
    }
    else if(service.pricing.storage[SINGLE]){ // single or multi
        serviceState.storageType = SINGLE;
    }

    return serviceState;
});

storageSizeInput.addEventListener("change", hanbdleStorageSizeChange);
transferSizeInput.addEventListener("change", hanbdleTransferSizeChange);









function renderChartServices(){
    servicesList.forEach((service, index) => {
        const serviceItem = document.createElement("div");
        serviceItem.addEventListener("change", (event) => handleStorageOptionChange({ event, serviceName: service.name }));
        serviceItem.innerHTML = `
            <b>${service.name}</b>
        `;

        if(service.hddOrSsdOption || service.singleOMultiOption){
            const avaliableOptions = Object.keys(service.pricing.storage);
            const serviceStorageOptions = document.createElement("fieldset");
            serviceStorageOptions.name = `storageOptions_${index}`;


            avaliableOptions.forEach((option) => {  
                const serviceStorageOption = document.createElement("input");
                const serviceStorageOptionLabel = document.createElement("label");
                serviceStorageOptionLabel.textContent = option;

                serviceStorageOption.type = "radio";
                serviceStorageOption.name = `storageOptions_${index}`;
                serviceStorageOption.value = option;
                serviceStorageOptions.append(serviceStorageOptionLabel, serviceStorageOption);
            })

            serviceItem.append(serviceStorageOptions);
        }

        chartServices.append(serviceItem)
    });
}

function renderChartColumns(){
    const servicesPricing = calculatePricing(servicesStateList, storageSize, transferSize);
    chartColumns.textContent = "";

    servicesPricing.forEach((pricing) => {
        const pricingItem = document.createElement("div");
        pricingItem.innerHTML = `
            <b>${pricing.name}</b>
            <span>${pricing.totalPrice}</span>
        `;

        chartColumns.append(pricingItem);
    })
}

renderChartServices();

function hanbdleStorageSizeChange(event){
    storageSize = parseInt(event.target.value);
    const pricing = calculatePricing(servicesStateList, storageSize, transferSize);
    console.log(pricing);
    renderChartColumns();
}

function hanbdleTransferSizeChange(event){
    transferSize = parseInt(event.target.value);
    const pricing = calculatePricing(servicesStateList, storageSize, transferSize);

    console.log(pricing);
    renderChartColumns();
}

function handleStorageOptionChange({ event, serviceName }){
    servicesStateList.find((servicesState) => servicesState.service.name === serviceName).storageType = event.target.value;
    console.log(servicesStateList);
    const pricing = calculatePricing(servicesStateList, storageSize, transferSize);

    renderChartColumns();
}
