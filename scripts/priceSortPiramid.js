export class pyramidSortPrice {
   resultPyramid = document.getElementById("pyramid");
   state = [];
   carListWrapper = document.querySelector(".car-list__wrapper");
   carListItem;
   carListItemPriceBlock;
   noSortCarListItemPriceBlockValue = [];

   constructor() {
      this.addEventClickForPyramidAndSortCar(this.resultPyramid);
      this.observerMuta();
   }

   addEventClickForPyramidAndSortCar(Block) {
      Block.addEventListener("click", (e) => {
         this.addActiveClassForPyramidBlock(Block, e);
      });
   }
   addActiveClassForPyramidBlock(Block, e) {
      if (e) {
         if (this.state.length < 3) this.state.push("1");
         else this.state = [""];
      }

      switch (this.state.length) {
         case 1:
            Block.classList.add("pyramid-active");
            this.getAllPriceValue("sortASC");
            break;
         case 2:
            Block.classList.add("pyramid-revers");
            this.getAllPriceValue("sortDESC");
            break;
         case 3:
            Block.classList.remove("pyramid-active");
            Block.classList.remove("pyramid-revers");
            this.getAllPriceValue("sortOff");
            this.getAllPriceValue();
            break;
         default:
            break;
      }
   }

   getAllPriceValue(typeSort) {
      this.carListItemPriceBlock = document.querySelectorAll(".car-list__price.car-list__price-from span:first-child");
      this.carListItem = document.querySelectorAll(".car-list__item");
      this.noSortCarListItemPriceBlockValue = [];

      if (typeSort) {
         this.editValuePriceBlockValueRemoveSpace(this.noSortCarListItemPriceBlockValue);

         if (typeSort == "sortASC") {
            this.sortASC(this.noSortCarListItemPriceBlockValue);
         }
         if (typeSort == "sortDESC") {
            this.sortDESC(this.noSortCarListItemPriceBlockValue);
         }
         if (typeSort == "sortOff") {
            this.sortOff(this.noSortCarListItemPriceBlockValue);
         }
      }
   }

   editValuePriceBlockValueRemoveSpace(noSortArray) {
      this.carListItemPriceBlock.forEach((element) => {
         noSortArray.push(element);
      });

      noSortArray.forEach((element) => {
         element.innerHTML = element.innerHTML.replace(/\s+/g, "");
      });
   }

   sortASC(Array) {
      Array.sort((a, b) => (+a.innerHTML > +b.innerHTML ? 1 : -1));
      for (let i = 0; i < Array.length; i++) {
         const element = Array[i];
         let parentUnit = element.parentNode.parentNode.parentNode;
         parentUnit.style.order = i;
      }
      Array.forEach((element) => {
         element.innerHTML = element.innerHTML.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
      });

      return Array;
   }

   sortDESC(Array) {
      Array.sort((a, b) => (+a.innerHTML < +b.innerHTML ? 1 : -1));
      for (let i = 0; i < Array.length; i++) {
         const element = Array[i];
         let parentUnit = element.parentNode.parentNode.parentNode;
         parentUnit.style.order = i;
      }

      Array.forEach((element) => {
         element.innerHTML = element.innerHTML.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
      });

      return Array;
   }

   sortOff(Array) {
      for (let i = 0; i < Array.length; i++) {
         const element = Array[i];
         let parentUnit = element.parentNode.parentNode.parentNode;
         parentUnit.style.order = 1;
      }

      Array.forEach((element) => {
         element.innerHTML = element.innerHTML.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
      });

      return Array;
   }

   observerMuta() {
      let observer = new MutationObserver((mutationRecords) => {
         this.addActiveClassForPyramidBlock(this.resultPyramid);
      });

      observer.observe(this.carListWrapper, {
         childList: true,
      });
   }
}
