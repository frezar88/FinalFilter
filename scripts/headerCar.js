function addEventFromHeaderCarItem(params) {
   let headerCarsContentItem = document.querySelectorAll(".header-cars-content .header-cars-content__item");
   addClassAndFoundClickInputModel(headerCarsContentItem);
}
function addClassAndFoundClickInputModel(block) {
   block.forEach((element) => {
      element.addEventListener("click", (e) => {
         let curentBlockValue = e.currentTarget.attributes["data-name"].value;
         let inputModel = document.querySelector(".filter-list__model .filter-list__item input[value='" + curentBlockValue + "']");
         inputModel.click();
      });
   });
}

export function followOnActiveInputInModelFilterBlock(e) {
   if (e.target.attributes.name) {
      if (e.target.attributes.name.value === "model") {
         let headerCarItem = document.querySelector(".header-cars-content__item[data-name='" + e.target.attributes.value.value + "']");
         console.log(headerCarItem);
         headerCarItem.classList.toggle("active");
      }
   }
}

addEventFromHeaderCarItem();
