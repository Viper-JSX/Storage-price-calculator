import "./css/main.css";
import { calculatePricing } from "./js/utilities/calculatePricing";
import { servicesList } from "./js/various_things/services_list";
import { HDD, MULTI, SINGLE, SSD } from "./js/various_things/word_constants";

const storageSizeInput = document.getElementById("storageSizeInput");
const transferSizeInput = document.getElementById("transferSizeInput");
const storageSizeCount = document.getElementById("storageSizeCount");
const transferSizeCount = document.getElementById("transferSizeCount");

const chartServices = document.getElementById("chartServices");
const chartColumns = document.getElementById("chartColumns");


let storageSize = 50;
let transferSize = 50;

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

storageSizeInput.value = storageSize;
transferSizeInput.value = transferSize;
storageSizeCount.textContent = storageSize;
transferSizeCount.textContent = transferSize;

storageSizeInput.addEventListener("change", hanbdleStorageSizeChange);
transferSizeInput.addEventListener("change", hanbdleTransferSizeChange);

renderChartColumns();
renderChartServices();







function renderChartServices(){
    servicesStateList.forEach((serviceState, index) => {
        const serviceItem = document.createElement("div");
        serviceItem.addEventListener("change", (event) => handleStorageOptionChange({ event, serviceName: serviceState.service.name }));
        serviceItem.innerHTML = `
            <b>${serviceState.service.name}</b>
        `;

        if(serviceState.service.hddOrSsdOption || serviceState.service.singleOMultiOption){ //storage options
            const avaliableOptions = Object.keys(serviceState.service.pricing.storage);
            const serviceStorageOptions = document.createElement("fieldset");
            serviceStorageOptions.name = `storageOptions_${index}`;


            avaliableOptions.forEach((option) => {  
                const serviceStorageOption = document.createElement("input");
                const serviceStorageOptionLabel = document.createElement("label");
                const serviceStorageOptionId = serviceState.service.name + option;

                
                serviceStorageOption.id = serviceStorageOptionId;
                serviceStorageOption.type = "radio";
                serviceStorageOption.name = `storageOptions_${index}`;
                serviceStorageOption.value = option;

                if(serviceState.storageType === option){ //if option is selcted by default
                    serviceStorageOption.checked = true;
                }

                serviceStorageOptionLabel.textContent = option;
                serviceStorageOptionLabel.htmlFor = serviceStorageOptionId;

                serviceStorageOptions.append(serviceStorageOptionLabel, serviceStorageOption);
            })

            serviceItem.append(serviceStorageOptions);
        }

        chartServices.append(serviceItem)
    });
}


function renderChartColumns(){
    const servicesPricing = calculatePricing(servicesStateList, storageSize, transferSize);
    if(servicesPricing.length <= 1){ //if there is only one or no services
        return;
    }


    const servicesPricingSortedAsc = [...servicesPricing].sort((a, b) => a.totalPrice - b.totalPrice);
    const [ minPricing, maxPricing ] = [ servicesPricingSortedAsc[0], servicesPricingSortedAsc[servicesPricingSortedAsc.length - 1]];
    const servicesPricingAndColumnsSize = servicesPricing.map((item) => ( { ...item, columnSize: item.totalPrice / maxPricing.totalPrice }));

    chartColumns.textContent = "";

    servicesPricingAndColumnsSize.forEach((item) => {
        const chartItem = document.createElement("div");
        chartItem.classList.add("chartItem");

        chartItem.innerHTML = `
            <div class="chartColumn ${minPricing.name === item.name ? 'minPrice' : '' }" style="--size: ${item.columnSize};"></div>
            <b>${item.totalPrice.toFixed(2)}$</b>
        `;

        chartColumns.append(chartItem);
    })
}

function hanbdleStorageSizeChange(event){
    storageSize = parseInt(event.target.value);
    storageSizeCount.textContent = storageSize;
    renderChartColumns();
}

function hanbdleTransferSizeChange(event){
    transferSize = parseInt(event.target.value);
    transferSizeCount.textContent = transferSize;
    renderChartColumns();
}

function handleStorageOptionChange({ event, serviceName }){
    servicesStateList.find((servicesState) => servicesState.service.name === serviceName).storageType = event.target.value;
    const pricing = calculatePricing(servicesStateList, storageSize, transferSize);

    renderChartColumns();
}
