export function btnShowMore(data, countElem, builder) {
   let btnMore = document.querySelector(".result-footer button");

   let i = 0;
   let countIt = 0;
   for (i; i < data.length; i++) {
      let list = document.querySelectorAll(".car-list__item");
      if (list.length >= countElem) {
         i++;
         countIt = i;
         break;
      }
      let carList = new builder(data[i], ".car-list__wrapper");
   }
   btnMore.addEventListener("click", () => {
      for (i; i < data.length; i++) {
         let list = document.querySelectorAll(".car-list__item");
         if (i > countIt + countElem) {
            i++;
            countIt = i;
            break;
         }
         let carList = new builder(data[i], ".car-list__wrapper");
      }
      if (i == data.length) {
         btnMore.style.display = "none";
      }
   });
   let carItem = document.querySelectorAll(".car-list__item");
   if (carItem.length == 0 || carItem.length < 15) {
      btnMore.style.display = "none";
   } else {
      btnMore.style.display = "block";
   }
}
