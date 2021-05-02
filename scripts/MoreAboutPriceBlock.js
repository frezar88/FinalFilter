let currentPriceBlock = document.querySelector(".current-price-block");
let currentPriceBlockBodyModelText = document.querySelector(
  ".current-price-block-body__model-text"
);
let currentPriceContent = document.querySelector(".current-price p");
let finalPrice = document.querySelector(
  ".current-price-block-footer p:last-child"
);
let month = document.querySelector(".benefits-month");
let monthAdvantage = document.querySelector(".benefits__per-month-value span");
let benefits = document.querySelector(".benefits");
let carsInStockContainer = document.querySelector(".cars-in-stock__container");
let aboutPriceCross = document.querySelector(".current-price-block-header img");
let appraiseYouCar = document.querySelector(".appraise-you-car");
let currentPraceYouCar = document.querySelector(".current-price-you-car");
let currentPraceYouCarValue = document.querySelector(
  ".current-price-you-car p"
);
let yourCarModelValue = document.querySelector(
  ".price-of-your-car__model-text"
);
let yourCarModel = document.querySelector(".price-of-your-car__model-text");

let arrayMonth = [
  "январе",
  "феврале",
  "марте",
  "апрелe",
  "мае",
  "июне",
  "июле",
  "августе",
  "сентябре",
  "ноябре",
  "декабре",
];
month.innerHTML = arrayMonth[new Date().getMonth()];

function setEventForAboutPrice(params) {
  carsInStockContainer.addEventListener("mouseup", (event) => {
    if (event.target != currentPriceBlock) {
      currentPriceBlock.style.display = "none";
    }
  });
  currentPriceBlock.addEventListener("click", (event) => {
    currentPriceBlock.style.display = "block";
    if (event.target == aboutPriceCross) {
      currentPriceBlock.style.display = "none";
    }
  });
}
setEventForAboutPrice();

export function showAboutPriceBlock() {
  let blockMoreprice = document.querySelectorAll(".car-list__more-price");
  if (blockMoreprice) {
    blockMoreprice.forEach((element) => {
      element.addEventListener("click", (event) => {
        if (element.attributes["data-advantage"].value == 0) {
          benefits.style.display = "none";
        } else benefits.style.display = "block";
        currentPriceBlock.style.display = "block";
        currentPriceBlockBodyModelText.innerHTML =
          element.attributes["data-name-car"].value;
        currentPriceContent.innerHTML = element.attributes[
          "data-price-car"
        ].value.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
        monthAdvantage.innerHTML =
          "- " +
          element.attributes["data-advantage"].value.replace(
            /(\d{1,3})(?=((\d{3})*)$)/g,
            " $1"
          ) +
          " BYN";
        let finalPriceResult = String(
          element.attributes["data-price-car"].value -
            element.attributes["data-advantage"].value
        );
        finalPrice.innerHTML =
          finalPriceResult.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") + " BYN";

        if (localStorage.finalPriceYouCar) {
          appraiseYouCar.style.display = "none";
          currentPraceYouCar.style.display = "flex";
          yourCarModel.style.display = "block";
          currentPraceYouCarValue.innerHTML = localStorage.finalPriceYouCar.replace(
            /(\d{1,3})(?=((\d{3})*)$)/g,
            " $1"
          );
          let finalOperacionPrice =
            element.attributes["data-price-car"].value -
            element.attributes["data-advantage"].value -
            localStorage.finalPriceYouCar;
          if (finalOperacionPrice <= 0) {
            finalOperacionPrice = 0;
            benefits.style.display = "none";
          }
          let stringFinalOpecacionPrice = String(finalOperacionPrice).replace(
            /(\d{1,3})(?=((\d{3})*)$)/g,
            " $1"
          );
          finalPrice.innerHTML = stringFinalOpecacionPrice + " BYN";

          let arrYouBrandAndModel = JSON.parse(localStorage.BrandAndModel);
          let linkArrayBrandAndModel = [];

          for (const key in arrYouBrandAndModel) {
            linkArrayBrandAndModel[0] = arrYouBrandAndModel[key].brand[0];
            linkArrayBrandAndModel[1] = arrYouBrandAndModel[key].model[0];
          }

          yourCarModelValue.innerHTML =
            linkArrayBrandAndModel[0] + "  " + linkArrayBrandAndModel[1];
        }
      });
    });
  }
}
