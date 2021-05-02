import { theNumberOfDisplayedCarCards } from "./main.js";

export function CreateElementResultCarAndBtnShowMore(data, builder, page) {
   let btnMore = document.querySelector(".result-footer button");

   for (let i = 0; i < data.length; i++) {
      let carList = new builder(data[i], ".car-list__wrapper");
   }

   let carItem = document.querySelectorAll(".car-list__item");

   if (carItem.length == 0 || data.length != theNumberOfDisplayedCarCards) {
      btnMore.style.display = "none";
   } else {
      btnMore.style.display = "block";
   }

   return page;
}
