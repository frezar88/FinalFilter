function showOtherCarFoto(params) {
   let fotoBlock = document.querySelector(".foto-block");
   let mainFotoBlock = document.querySelector(".main-foto");
   let mainFoto = document.querySelector(".main-foto img");
   let secondaryFoto = document.querySelectorAll(".secondary-foto-block img");
   let blockBtnCrossClosePopUp = document.querySelector(".block-btn-cross-close img");
   let descriptionCarBlockPopUp = document.querySelector(".description-car");
   let descriptionCarBlockContainer = document.querySelector(".description-car-container");

   fotoBlock.addEventListener("click", (e) => {
      if (e.target.parentNode.className == "secondary-foto-block") {
         mainFoto = document.querySelector(".main-foto img");
         /*  mainFotoBlock.innerHTML = '' */

         mainFoto.setAttribute("src", e.target.attributes.src.nodeValue);
         mainFotoBlock.appendChild(mainFoto);
      }
   });
   function closedPopUp() {
      descriptionCarBlockContainer.addEventListener("click", (e) => {
         if (e.target.className == "description-car-container") {
            descriptionCarBlockPopUp.style.display = "none";
            descriptionCarBlockContainer.style.display = "none";
         }
      });

      blockBtnCrossClosePopUp.addEventListener("click", (e) => {
         descriptionCarBlockPopUp.style.display = "none";
         descriptionCarBlockContainer.style.display = "none";
      });
   }

   closedPopUp();
}
showOtherCarFoto();

export function showPopUpDiscriptionBuCar(e, carDescription) {
   let descriptionCarBlockPopUp = document.querySelector(".description-car");
   let descriptionCarBlockContainer = document.querySelector(".description-car-container");
   descriptionCarBlockContainer.style.display = "block";
   descriptionCarBlockPopUp.style.display = "block";
   let eventCurentTargetDataCarId = e.currentTarget.attributes["data-car-id"].value;
   let pathDevMitsubishi = "http://dev.mitsubishi.by";
   addNewInfoForCarInPopUpWindow();

   function addNewInfoForCarInPopUpWindow(params) {
      let carDescript = document.querySelector(".car-descript");
      
      let currentObjectInfo = carDescription[eventCurentTargetDataCarId];
      let btnReserve1 = document.querySelector(".btn-reserve1 a");

      editAttributesImg(currentObjectInfo.image, currentObjectInfo.images[0]);
      methodAddInfoForBlockDescriptionBuCar(".car-name p", currentObjectInfo.name);
      methodAddInfoForBlockDescriptionBuCar(".car-name span", currentObjectInfo.year);
      methodAddInfoForBlockDescriptionBuCar(".car-price-popup p", currentObjectInfo.price);
      methodAddInfoForBlockDescriptionBuCar(".car-engine span", currentObjectInfo.engine_capacity + " л., " + currentObjectInfo.power + " л.с, " + currentObjectInfo.engine_name);
      methodAddInfoForBlockDescriptionBuCar(".car-transmission span", currentObjectInfo.transmission);
      methodAddInfoForBlockDescriptionBuCar(".car-drive span", currentObjectInfo.drive);
      methodAddInfoForBlockDescriptionBuCar(".car-mileage span", currentObjectInfo.milage);
      methodAddInfoForBlockDescriptionBuCar(".car-descript", currentObjectInfo.by_description);

      addSecondaryImg(currentObjectInfo);

      btnReserve1.setAttribute("data-car", e.currentTarget.attributes["data-car-id"].value);
   }

   function methodAddInfoForBlockDescriptionBuCar(pathBlock, data) {
      let div = document.querySelector(pathBlock);

      div.innerHTML = data;
   }

   function editAttributesImg(srcImg, imagesArr) {
      if (imagesArr) {
         if (imagesArr.length != 0) {
            srcImg = imagesArr.image_path + imagesArr.image_name;
         }
      }

      let img = new Image();
      img.src = pathDevMitsubishi+srcImg;
      let mainFotoBlock = document.querySelector(".main-foto");
      mainFotoBlock.innerHTML = "";
      mainFotoBlock.appendChild(img);
      /* img.onerror = function () {
            img.setAttribute("src", imagesArr.image_path + imagesArr.image_name );
            img.setAttribute("style", "width:260px; height: 250px;");
        } */
   }
   function addSecondaryImg(carInfo) {
      
      let secondaryFotoBlock = document.querySelector(".secondary-foto-block");

      if (carInfo.images && carInfo.images.length != 0) {
         secondaryFotoBlock.innerHTML = "";

         carInfo.images.forEach((element) => {
           
            let secondaryFoto = new Image();
            secondaryFoto.src = pathDevMitsubishi+element.image_path + element.image_name;
            secondaryFotoBlock.appendChild(secondaryFoto);
         });
      } else {
         secondaryFotoBlock.innerHTML = "";
      }
   }

   function addSpaseTittleDescriptionBuCar() {
      let li = document.querySelectorAll(".car-descript strong");
      li.forEach((element) => {
         element.parentElement.style.marginTop = "10px";
      });
   }
   addSpaseTittleDescriptionBuCar();
}
