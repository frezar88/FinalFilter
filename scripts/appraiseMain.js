import { CreateAppraiseBlock } from "./createAppraiseBlock.js";
import { RequestData } from "./ajax.js";
let host = "";
if (window.location.hostname == "127.0.0.1") {
    host = "http://dev.mitsubishi.by/";
}
let formInputCheckedAppraise;
let typeBlock = {
    year: ["mileage"],
    equipment: ["year", "mileage"],
    modification: ["equipment", "year", "mileage"],
    generation: ["modification", "equipment", "year", "mileage"],
    model: ["generation", "modification", "equipment", "year", "mileage"],
    brand: [
        "model",
        "generation",
        "modification",
        "equipment",
        "year",
        "mileage",
    ],
};
let equipmentId;
let yearId;
let crossClose = document.querySelector(".appraise-car-header__closecross");
let tradeInInput = document.querySelector(".trade-in__switch input");
let appraiseBlock = document.querySelector(".appraise-car");
let AppraiseYouCarInPriceBlock = document.querySelector(".appraise-you-car p");
let appraiseButton = document.querySelector(
    ".appraise-car-body__mileage-btn div"
);
let tradeInTextAppraiseYouCar = document.querySelector(".trade-in__text div");

/* -------------------------------------------------- */

async function addEventChangeGeneralFormAppraise() {
    let formAppraise = document.querySelector(".appraise-form");
    ajaxRequestAppraise("brand", "Бренд", "-brands");
    let brand = document.querySelector('.acord [data-name="brand"]');
    formAppraise.addEventListener("change", (event) => {
        /* removeCallbackFormBlock() */

        switch (event.target.name) {
            case "brand":
                ajaxRequestAppraise(
                    "model",
                    "Модель",
                    "-models?brand_id=" + getTargetInput(event),
                    event
                );
                addDescriptionToTheRolledUpAccardion(
                    event.target.value,
                    event.target.name,
                    "Бренд"
                );
                collectAppraiseAllTheInformationAboutTheCar();

                break;
            case "model":
                ajaxRequestAppraise(
                    "generation",
                    "Поколение",
                    "-generations?model_id=" + getTargetInput(event),
                    event
                );
                addDescriptionToTheRolledUpAccardion(
                    event.target.value,
                    event.target.name,
                    "Модель"
                );
                collectAppraiseAllTheInformationAboutTheCar();

                break;

            case "generation":
                ajaxRequestAppraise("modification", "Модификация", "-versions?generation_id=" + getTargetInput(event), event);
                addDescriptionToTheRolledUpAccardion(
                    event.target.value,
                    event.target.name,
                    "Поколение"
                );
                collectAppraiseAllTheInformationAboutTheCar();
                break;
            case "modification":
                ajaxRequestAppraise("equipment", "Уровень оснащения", "-equipments?version_id=" + getTargetInput(event), event);
                addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, "Модификация");
                collectAppraiseAllTheInformationAboutTheCar();

                break;
            case "equipment":
                ajaxRequestAppraise("year", "Год выпуска", "-years?equipment_id=" + getTargetInput(event), event);
                addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, "Уровень оснащения");
                collectAppraiseAllTheInformationAboutTheCar();

                break;
            case "year":
                getTargetInput(event);
                if (event.target.attributes.value.value != 'newInput') {
                    if (!document.querySelector(".appraise-car-body__mileage.list-content")) {
                        CreateAppraiseBlock("mileage", "Пробег");
                        addDescriptionToTheRolledUpAccardion(event.target.value, event.target.name, "Год выпуска");
                        addAnEventToTheRateButtonAndRateTheCar();
                        collectAppraiseAllTheInformationAboutTheCar();
                        if (document.querySelector('.callback-form')) {
                            document.querySelector('.callback-form').remove()
                        }
                    }
                } else {
                    document.querySelector('.appraise-car-body__mileage.list-content')
                    CreateAppraiseBlock('callback')

                    if (document.querySelector('.appraise-car-body__mileage.list-content')) {
                        document.querySelector('.appraise-car-body__mileage.list-content').remove()

                    }
                }
                break;
            default:
                break;
        }
    });
}

let appraiseCarList = document.querySelector(".appraise-car-body__list");
appraiseCarList.addEventListener("click", function(e) {
    if (
        e.target.className == "acord" ||
        e.target.className == "acord acc-active" ||
        e.target.className == "acord acc-close" ||
        e.target.className == "acord acc-active acc-close"
    ) {
        let target = e.target.attributes["data-name"].value;
        let content = document.querySelector(
            '.app-list-item[data-name="' + target + '"]'
        );
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            e.target.classList.remove("acc-active");
            e.target.classList.add("acc-close");
        } else {
            content.style.maxHeight = content.scrollHeight + +270 + "px";
            e.target.classList.remove("acc-close");
            e.target.classList.add("acc-active");
        }
    }
});

function ajaxRequestAppraise(nameBlock, nameAccardeon, url, e) {
    new RequestData().requestRun(host + "new-filter/get-with-mileage" + url, "GET").then((data) => {
        setLocalStorage(arrayData, data, nameBlock);
        if (e) {
            removeBlockDependsOnEventTarget(e.target.name);
        }
        let blockList = document.querySelector(
            ".appraise-car-body__" + nameBlock
        );
        if (!blockList) {
            CreateAppraiseBlock(nameBlock, nameAccardeon, data);
            trackingAppraiseComleteLine();
        }

        showOrNoShowBtnShowMore();
        searchAppraise(nameBlock);
        trackingAppraiseComleteLine();
        addNewInputRangeFromYearBlock(nameBlock)
        return (formInputCheckedAppraise = "");
    });
}

function addNewInputRangeFromYearBlock(nameBlock) {
    if (nameBlock == "year") {
        let generationInput = document.querySelector('input[name="generation"]:checked');
        let yearInput = document.querySelectorAll('.appraise-car-body__year-input-radio input[name="year"]');
        let generationInputValue = generationInput.value
        let lengthOfYearValue = generationInputValue.substring(generationInputValue.length - 13).replace('(', '').replace('-', '').replace(')', '').replace(' ', '')
        let yearStart = +lengthOfYearValue.substring(0, 5)
        let yearEnd = +lengthOfYearValue.substring(5)
        if (yearStart && yearEnd) {
            for (let i = yearStart; i <= yearEnd; i++) {

                if (!document.querySelector('.appraise-car-body__year-input-radio label[name="' + i + '"]')) {

                    createNewInputRangeForYearBlock(i)
                }

            }


        }

    }
}

function createNewInputRangeForYearBlock(yearValue) {
    let label = document.createElement('label')
    label.setAttribute('name', yearValue)
    label.setAttribute('value', 'year')

    let inputYear = document.createElement('input')
    inputYear.setAttribute('type', 'radio')
    inputYear.setAttribute('name', 'year')
    inputYear.setAttribute('value', 'newInput')
    inputYear.setAttribute('data-id', yearValue)

    let spanFromLabelYear = document.createElement('span')
    spanFromLabelYear.setAttribute('style', 'color:#cdcdcd;')
    spanFromLabelYear.innerHTML = yearValue

    label.append(inputYear)
    label.append(spanFromLabelYear)
    if (document.querySelector('.appraise-car-body__year-input-radio')) {
        document.querySelector('.appraise-car-body__year-input-radio').append(label)
    }

}

let arrayData = {
    brand: [],
    model: [],
};

function setLocalStorage(arrayData, data, nameBlock) {
    if (nameBlock == "brand") {
        arrayData.brand = [];
        data.forEach((element) => {
            arrayData.brand.push(element);
        });
    }
    if (nameBlock == "model") {
        arrayData.model = [];
        data.forEach((element) => {
            arrayData.model.push(element);
        });
    }
    return (localStorage.dataCars = JSON.stringify({ arrayData }));
}

function getTargetInput(event) {
    formInputCheckedAppraise = event.target.attributes["data-id"].value;
    let activAccardeon = document.querySelector(
        '.acord[data-name="' + event.target.attributes["name"].value + '"]'
    );

    if (
        activAccardeon.className == "acord acc-active" &&
        activAccardeon.className != "acord acc-close"
    ) {
        activAccardeon.click();
    }

    if (event.target.attributes.name.value == "equipment") {
        return (equipmentId = formInputCheckedAppraise), formInputCheckedAppraise;
    }
    if (event.target.attributes.name.value == "year") {
        return (yearId = formInputCheckedAppraise), formInputCheckedAppraise;
    }

    return formInputCheckedAppraise;
}

function removeBlockDependsOnEventTarget(blockTarget) {
    typeBlock[blockTarget].forEach((element) => {
        let block = document.querySelector(
            ".appraise-car-body__" + element + ".list-content"
        );
        if (block) {
            block.remove();
        }
        let callBack = document.querySelector(".callback-form");
        if (callBack) {
            callBack.remove();
        }
    });
}

function trackingBtnShowMoreAndAddEvent() {
    appraiseBlock.addEventListener("click", (event) => {
        if (
            event.target.className ==
            "btn-show-more-" +
            event.target.className
            .replace("btn-show-more-", "")
            .replace(" btn-show-more", "") +
            " btn-show-more"
        ) {
            let contentList = document.querySelector(
                ".appraise-car-body__" +
                event.target.className
                .replace("btn-show-more-", "")
                .replace(" btn-show-more", "") +
                "-input-radio"
            );
            let headerContainer = document.querySelector(
                ".app-list-item." +
                event.target.className
                .replace("btn-show-more-", "")
                .replace(" btn-show-more", "")
            );
            headerContainer.style.maxHeight = "unset";

            if (
                contentList.style.maxHeight < 140 + "px" ||
                contentList.style.maxHeight == 140 + "px"
            ) {
                contentList.style.maxHeight = headerContainer.scrollHeight + "px";
                contentList.style.maxHeight = "unset";
                event.target.innerHTML = "свернуть";
            } else {
                event.target.innerHTML = "Показать все";
                contentList.style.maxHeight = 140 + "px";
            }
        }
    });
}

function showOrNoShowBtnShowMore() {
    let btnShowMore = document.querySelectorAll(".btn-show-more");

    btnShowMore.forEach((element) => {
        let btnClassName = element.className
            .replace("btn-show-more-", "")
            .replace("btn-show-more", "");
        let label = document.querySelectorAll("." + btnClassName + " label");

        if (label.length <= 16) {
            element.style.opacity = 0;
            element.style.pointerEvents = "none";
        } else {
            element.style.opacity = 1;
            element.style.pointerEvents = "unset";
        }
    });
}

trackingBtnShowMoreAndAddEvent();

function addDescriptionToTheRolledUpAccardion(
    eventTargetValue,
    eventTargetName,
    text
) {
    document.querySelector(
        '.acord[data-name="' + eventTargetName + '"]'
    ).innerHTML = text + ": " + eventTargetValue;
}

function removeCallbackFormBlock() {
    let callBackForm = document.querySelector(".callback-form");
    if (callBackForm) {
        callBackForm.parentNode.removeChild(callBackForm);
    }
}

function trackingAppraiseComleteLine() {
    let appraiseLine = document.querySelector(
        ".appraise-car-header__comlete-line"
    );
    let appraiseListContentCount = document.querySelectorAll(".list-content");
    appraiseLine.className = "appraise-car-header__comlete-line";

    switch (appraiseListContentCount.length) {
        case 1:
            break;
        case 2:
            appraiseLine.className = "appraise-car-header__comlete-line one";
            break;
        case 3:
            appraiseLine.className = "appraise-car-header__comlete-line two";
            break;
        case 4:
            appraiseLine.className = "appraise-car-header__comlete-line three";
            break;
        case 5:
            appraiseLine.className = "appraise-car-header__comlete-line four";
            break;
        case 6:
            appraiseLine.className = "appraise-car-header__comlete-line five";
            break;
        case 7:
            appraiseLine.className = "appraise-car-header__comlete-line six";

            break;
        default:
            break;
    }
}

function addAnEventToTheRateButtonAndRateTheCar() {
    document
        .querySelector(".appraise-car-body__mileage-btn div")
        .addEventListener("click", () => {
            setLocalStorageBrandAndModel();
            let appraiseLine = document.querySelector(
                ".appraise-car-header__comlete-line"
            );
            appraiseLine.className = "appraise-car-header__comlete-line full";
            let staticValueYouCarParams = collectAppraiseAllTheInformationAboutTheCar();
            localStorage.pastCarEstimates = staticValueYouCarParams;

            let mileage = document
                .querySelector('input[list="mileage"]')
                .value.replace(/\s+/g, "");
            if (mileage.length > 0) {
                appraiseBlock.style.transform = "translateX(-1000px)";
                appraiseBlock.style.zIndex = "-100";
                tradeInInput.checked = false;
            }

            if (mileage) {
                new RequestData()
                    .requestRun(
                        host +
                        "new-filter/get-with-mileage-price?equipment_id=" +
                        equipmentId +
                        "&year=" +
                        yearId +
                        "&mileage=" +
                        mileage +
                        "",
                        "GET"
                    )
                    .then((data) => {
                        if (data.price_byn <= 0) {
                            localStorage.finalPriceYouCar = JSON.stringify(0);
                        } else {
                            localStorage.finalPriceYouCar = JSON.stringify(
                                Math.round(data.price_byn)
                            );
                        }
                        collectAppraiseAllTheInformationAboutTheCar(data);
                        showTheResultBlockOfTheVehicleEvaluation();
                    });
            }
        });
}

function searchAppraise(nameBlock) {
    let inputbrand = document.querySelector('input[list="brand"]');
    let inputModel = document.querySelector('input[list="model"]');
    let localData = JSON.parse(localStorage.getItem("dataCars"));
    let blockOfFoundCarsBrand = document.querySelector(
        ".block-of-found-cars-brand"
    );
    blockOfFoundCarsBrand.style.display = "none";
    let blockOfFoundCarsModel = document.querySelector(
        ".block-of-found-cars-model"
    );
    addContentInblockOfFoundCars(
        nameBlock,
        blockOfFoundCarsBrand,
        blockOfFoundCarsModel
    );
    addAnEventOnInputTextBrandAndModelAndShowTooltips(
        inputbrand,
        blockOfFoundCarsBrand,
        ".brand-search-block"
    );
    if (inputModel) {
        blockOfFoundCarsModel.style.display = "none";
        addAnEventOnInputTextBrandAndModelAndShowTooltips(
            inputModel,
            blockOfFoundCarsModel,
            ".model-search-block"
        );
    }

    function addContentInblockOfFoundCars(nameBlock, brand, model) {
        if (nameBlock == "brand" && brand) {
            for (const key in localData.arrayData.brand) {
                let div = document.createElement("div");
                div.classList.add("brand-search-block");
                div.setAttribute("data-id", localData.arrayData.brand[key].id);
                div.setAttribute("data-name", localData.arrayData.brand[key].name);
                div.innerHTML = "";
                div.innerHTML = localData.arrayData.brand[key].name;
                brand.appendChild(div);
            }
        }
        if (nameBlock == "model" && model) {
            for (const key in localData.arrayData.model) {
                let div = document.createElement("div");

                div.classList.add("model-search-block");
                div.setAttribute("data-id", localData.arrayData.model[key].id);
                div.setAttribute("data-name", localData.arrayData.model[key].name);
                div.innerHTML = "";

                div.innerHTML = localData.arrayData.model[key].name;
                model.appendChild(div);
            }
        }
    }

    function addAnEventOnInputTextBrandAndModelAndShowTooltips(
        inputBrand,
        brand,
        pathSearchBlock
    ) {
        let searchblock;
        inputBrand.addEventListener("keyup", (key) => {
            searchblock = document.querySelectorAll(pathSearchBlock);

            if (event.currentTarget.value) {
                brand.style.display = "block";
                searchblock.forEach((element) => {
                    element.style.display = "none";
                    if (
                        element.innerHTML
                        .toLowerCase()
                        .indexOf(event.currentTarget.value.toLowerCase()) != -1
                    ) {
                        element.style.display = "block";
                        addAnEventForVisibleTooltips(element);
                    }
                });
            }
            if (event.currentTarget.value.length < 1) {
                brand.style.display = "none";
            }
        });

        function addAnEventForVisibleTooltips(tooltipItem) {
            tooltipItem.addEventListener("click", (e) => {
                document
                    .querySelector(
                        'input[value="' + e.target.attributes["data-name"].value + '"]'
                    )
                    .click();
            });
        }
    }
}

function showAppraiseOrCloseAppraise() {
    function showAppraise() {
        AppraiseYouCarInPriceBlock.addEventListener("click", () => {
            if (!localStorage.pastCarEstimates) {
                addEventChangeGeneralFormAppraise();
            }
            appraiseBlock.style.zIndex = "120";
            appraiseBlock.style.opacity = "1";
            appraiseBlock.style.transform = "translateX(1000px)";
        });
        tradeInTextAppraiseYouCar.addEventListener("click", () => {
            if (!localStorage.pastCarEstimates) {
                addEventChangeGeneralFormAppraise();
            }
            appraiseBlock.style.zIndex = "120";
            appraiseBlock.style.opacity = "1";
            appraiseBlock.style.transform = "translateX(1000px)";
        });

        tradeInInput.addEventListener("click", () => {
            if (tradeInInput.checked && !localStorage.finalPriceYouCar) {
                if (!localStorage.pastCarEstimates) {
                    addEventChangeGeneralFormAppraise();
                }
                appraiseBlock.style.zIndex = "120";

                appraiseBlock.style.opacity = "1";
                appraiseBlock.style.transform = "translateX(1000px)";
            } else {
                appraiseBlock.style.transform = "translateX(-1000px)";
                setTimeout(() => {
                    appraiseBlock.style.display = "block";
                }, 300);
            }
        });
    }

    function closeAppraise() {
        crossClose.addEventListener("click", () => {
            if (!localStorage.finalPriceYouCar) {
                tradeInInput.checked = false;
            }

            appraiseBlock.style.transform = "translateX(-1000px)";
            appraiseBlock.style.zIndex = "-100";
        });
    }
    closeAppraise();
    showAppraise();
}
showAppraiseOrCloseAppraise();

function setLocalStorageBrandAndModel(params) {
    if (params) {}
    let brandInput = document.querySelector(
        ".appraise-car-body__brand-input-radio input:checked"
    );
    let modelInput = document.querySelector(
        ".appraise-car-body__model-input-radio input:checked "
    );
    let arrayYouBrandAndModel = {
        brand: [],
        model: [],
    };
    arrayYouBrandAndModel.brand.push(brandInput.attributes.value.value);
    arrayYouBrandAndModel.model.push(modelInput.attributes.value.value);
    localStorage.BrandAndModel = JSON.stringify({ arrayYouBrandAndModel });
}

function collectAppraiseAllTheInformationAboutTheCar(data) {
    let appraiseDataCheckInput = {
        brand: "",
        model: "",
        generation: "",
        modification: "",
        equipment: "",
        year: "",
        mileage: "",
        finalPriceYouCar: "",
    };
    getAppraiseBrand();
    getAppraiseModel();
    getAppraiseGeneration();
    getAppraiseModification();
    getAppraiseEquipment();
    getAppraiseYear();
    getAppraiseMileage();
    getPriceYouCar(data);

    function getAppraiseBrand() {
        let brand = document.querySelector(
            ".appraise-car-body__brand-input-radio input:checked"
        );
        if (brand) {
            return (appraiseDataCheckInput.brand = brand.value);
        }
    }

    function getAppraiseModel() {
        let model = document.querySelector(
            ".appraise-car-body__model-input-radio input:checked"
        );
        if (model) {
            return (appraiseDataCheckInput.model = model.value);
        }
    }

    function getAppraiseGeneration() {
        let generation = document.querySelector(
            ".appraise-car-body__generation-input-radio input:checked"
        );
        if (generation) {
            return (appraiseDataCheckInput.generation = generation.value);
        }
    }

    function getAppraiseModification() {
        let modification = document.querySelector(
            ".appraise-car-body__modification-input-radio input:checked"
        );
        if (modification) {
            return (appraiseDataCheckInput.modification = modification.value);
        }
    }

    function getAppraiseEquipment() {
        let equipment = document.querySelector(
            ".appraise-car-body__equipment-input-radio input:checked"
        );
        if (equipment) {
            return (appraiseDataCheckInput.equipment = equipment.value);
        }
    }

    function getAppraiseYear() {
        let year = document.querySelector(
            ".appraise-car-body__year-input-radio input:checked"
        );
        if (year) {
            return (appraiseDataCheckInput.year = year.value);
        }
    }

    function getAppraiseMileage() {
        let mileage = document.querySelector('input[list="mileage"]');

        if (mileage) {
            let value = mileage.value.replace(/\s+/g, "");

            return (appraiseDataCheckInput.mileage = value);
        }
    }

    function getPriceYouCar(data) {
        if (data && data.price_byn <= 0) {
            return (appraiseDataCheckInput.finalPriceYouCar = "0");
        }

        if (data && data.price_byn > 0) {
            return (appraiseDataCheckInput.finalPriceYouCar =
                Math.round(data.price_byn) + "");
        } else return (appraiseDataCheckInput.finalPriceYouCar = "");
    }
    return (localStorage.selectYouCar = JSON.stringify(appraiseDataCheckInput));
}

function showTheResultBlockOfTheVehicleEvaluation() {
    let resultBlockOfTheVehicleEvaluation = document.querySelector(
        ".evaluated-car"
    );

    let evaluatedCarContentModel = document.querySelector(
        ".evaluated-car__content p:first-child span"
    );
    let evaluatedCarContentPrice = document.querySelector(
        ".evaluated-car__content p:last-child span"
    );
    let evaluatedCarFooter = document.querySelector(".appraise-car-footer");
    let appraiseCarBodyList = document.querySelector(".appraise-car-body__list");

    if (localStorage.finalPriceYouCar && localStorage.pastCarEstimates) {
        appraiseCarBodyList.innerHTML = "";
        appraiseCarBodyList.append(resultBlockOfTheVehicleEvaluation);
        resultBlockOfTheVehicleEvaluation.style.display = "block";
        evaluatedCarContentModel.innerHTML =
            " " +
            JSON.parse(localStorage.pastCarEstimates).brand +
            " " +
            JSON.parse(localStorage.pastCarEstimates).model;
        evaluatedCarContentPrice.innerHTML =
            " " +
            localStorage.finalPriceYouCar.replace(
                /(\d{1,3})(?=((\d{3})*)$)/g,
                " $1"
            ) +
            " BYN";
        evaluatedCarFooter.style.display = "inline-block";
        addEventEvaluatedBtnAccept();
    }
}

function addEventEvaluatedBtnAccept() {
    let evaluatedCarFooter = document.querySelector(".appraise-car-footer");
    let tradeInInput = document.getElementById("trade-in_switch");
    evaluatedCarFooter.addEventListener("click", () => {
        tradeInInput.click();
        tradeInInput.checked = true;
    });
}

function addEventEvaluatedCarBtnReset() {
    let evaluatedCarBtnReset = document.querySelector(
        ".evaluated-car__btn-reset button"
    );
    let resultBlockOfTheVehicleEvaluation = document.querySelector(
        ".evaluated-car"
    );
    let evaluatedCarFooter = document.querySelector(".appraise-car-footer");
    evaluatedCarBtnReset.addEventListener("click", () => {
        resultBlockOfTheVehicleEvaluation.style.display = "none";
        evaluatedCarFooter.style.display = "none";
        localStorage.clear();
        addEventChangeGeneralFormAppraise();
        appraiseBlock.click();
    });
}

addEventEvaluatedCarBtnReset();

showTheResultBlockOfTheVehicleEvaluation();

let carsInStockContainer = document.querySelector(".cars-in-stock__container");
let appraisecroseimg = document.querySelector(
    ".appraise-car-header__closecross img"
);
let appraisecrose = document.querySelector(".appraise-car-header__closecross");
let appraiseFooterBtnAccept = document.querySelector(
    ".appraise-car-footer__btn-accept"
);
let appraiseFooterBtnAcceptText = document.querySelector(
    ".appraise-car-footer__btn-accept p"
);
let appraiseFooterBtnAcceptDiv = document.querySelector(
    ".appraise-car-footer__btn-accept div"
);

function closeOnClickAppraiseBlock() {
    carsInStockContainer.addEventListener("mouseup", (event) => {
        if (event.target != appraiseBlock) {
            appraiseBlock.style.zIndex = "120";
            appraiseBlock.style.opacity = "1";
            appraiseBlock.style.transform = "translateX(-1000px)";
        }
    });
    appraiseBlock.addEventListener("click", (event) => {
        appraiseBlock.style.zIndex = "120";
        appraiseBlock.style.opacity = "1";
        appraiseBlock.style.transform = "translateX(1000px)";

        if (
            event.target == appraisecroseimg ||
            event.target == appraisecrose ||
            event.target == appraiseFooterBtnAccept ||
            event.target == appraiseFooterBtnAcceptText ||
            event.target == appraiseFooterBtnAcceptDiv
        ) {
            appraiseBlock.style.zIndex = "120";
            appraiseBlock.style.opacity = "1";
            appraiseBlock.style.transform = "translateX(-1000px)";
        }
    });
}
closeOnClickAppraiseBlock();