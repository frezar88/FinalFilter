export function blockedFiltersByOrNew(params) {
   let inputModel = document.querySelectorAll(".filter-list__model input");
   let inputYears = document.querySelectorAll(".filter-list__year input");
   let inputTransmission = document.querySelectorAll(".filter-list__transmission input");
   let inputDrive = document.querySelectorAll(".filter-list__drive  input");
   let inputCompleteSet = document.querySelectorAll(".filter-list__complete-set input");
   let titleCompleteSet = document.querySelectorAll(".filter-list__complete-set h4");
   let inputEngin = document.querySelectorAll(".filter-list__engine input");
   let titleEngine = document.querySelectorAll(".filter-list__engine h4");
   let inputColor = document.querySelectorAll(".filter-list__color input");

   params.forEach((element) => {
      for (const key in element) {
         switch (element.id) {
            case "model":
               buildModelNode(element, inputModel, titleCompleteSet, inputCompleteSet);
               break;

            case "year":
               blockedBlock(element, inputYears);
               break;

            case "engine":
               blockEngine(element, titleEngine, inputEngin);
               break;

            case "transmission":
               blockedBlock(element, inputTransmission);
               break;

            case "drive":
               blockedBlock(element, inputDrive);
               break;

            case "color":
               blockedBlock(element, inputColor);
               break;
         }
      }
   });

   function checkFilterModelInTheResponseModes(responseModels, domFilterModel) {
      let serverModelNames = [];
      responseModels.forEach((model) => {
         serverModelNames.push(model.category);
      });

      if (serverModelNames.indexOf(domFilterModel) == "-1") {
         return false;
      }
      return true;
   }

   function buildModelNode(params, inp, h4, complect) {
      inp.forEach((element) => {
         element.parentElement.parentElement.style.display = "none";
      });
      inp.forEach((input) => {
         params.options.forEach((option) => {
            if (input.defaultValue == option.category) {
               input.parentElement.parentElement.style.display = "block";
            }
         });

         if (!checkFilterModelInTheResponseModes(params.options, input.defaultValue)) {
            input.setAttribute("checked", true);
            input.checked = false;
         }
      });
      h4.forEach((element) => {
         element.style.display = "none";
      });

      /* Переписать так же все методы */
      params.options.forEach((option) => {
         let h4 = document.querySelector('h4[name="' + option.category + '"]');
         if (h4) {
            let correctSibling = h4.nextElementSibling;
            if (correctSibling && correctSibling.classList.value == "filter-list__item") {
               h4.style.display = "block";
            }
         }
      });

      complect.forEach((element) => {
         element.parentElement.parentElement.style.display = "none";
      });
      complect.forEach((input) => {
         params.options.forEach((option) => {
            if (input.attributes.name.nodeValue == option.category) {
               input.parentElement.parentElement.style.display = "block";
            }
         });
         if (!checkFilterComplectationInTheResponseComplectation(params, input.defaultValue)) {
            input.setAttribute("checked", true);
            input.checked = false;
         }
      });
   }

   function checkFilterComplectationInTheResponseComplectation(params, domFilterComplect) {
      let complectationArray = [];
      params.options.forEach((element) => {
         for (const key in element.options) {
            complectationArray.push(element.options[key].name);
         }
      });
      if (complectationArray.indexOf(domFilterComplect) == "-1") {
         return false;
      }
      return true;
   }

   function blockedBlock(params, inp) {
      inp.forEach((element) => {
         element.parentElement.parentElement.style.display = "none";
      });
      inp.forEach((input) => {
         params.options.forEach((option) => {
            if (input.attributes.value.nodeValue == option.name) {
               input.parentElement.parentElement.style.display = "block";
            }
            if (!checkFilterYearInTheResponseYear(params.options, input.defaultValue)) {
               input.setAttribute("checked", true);
               input.checked = false;
            }
         });
      });
   }

   function checkFilterYearInTheResponseYear(responseModels, domFilterModel) {
      let serverModelNames = [];
      responseModels.forEach((model) => {
         serverModelNames.push(model.name);
      });
      if (serverModelNames.indexOf(domFilterModel) == "-1") {
         return false;
      }
      return true;
   }
   function checkFilterEngineInTheResponseEngine(params, domFilterComplect) {
      let complectationArray = [];
      params.options.forEach((element) => {
         for (const key in element.options) {
            complectationArray.push(element.options[key].name);
         }
      });

      if (complectationArray.indexOf(domFilterComplect) == "-1") {
         return false, console.log("false");
      }
      return true;
   }

   function blockEngine(params, h4, input) {
      input.forEach((input) => {
         // input.parentElement.parentElement.style.display = 'none'
      });
      h4.forEach((h4) => {
         h4.style.display = "none";
      });
      h4.forEach((h4) => {
         params.options.forEach((option) => {
            if (h4.innerHTML == option.category) {
               h4.style.display = "block";
            }
            if (h4.nextElementSibling.classList.value != "filter-list__item") {
               h4.style.display = "none";
            }
         });
      });
      input.forEach((input) => {
         params.options.forEach((option) => {
            if (input.attributes.name.nodeValue == option.category) {
               input.parentElement.parentElement.style.display = "block";
            }
            if (!checkFilterEngineInTheResponseEngine(params, input.defaultValue)) {
               input.setAttribute("checked", true);
               input.checked = false;
            }
         });
      });
   }
}
