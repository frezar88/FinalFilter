export function hideNoActiveFilters(params) {
   params.forEach((element) => {
      for (const key in element) {
         switch (true) {
            case element.id == "model":
               element.options.forEach((option) => {
                  hideTitle(element, option, "model");
                  hideInputIfAnyTitle(option, "model");
               });
               break;
            case element.id == "year":
               hideOnlyInput(element);
               break;
            case element.id == "engine":
               element.options.forEach((option) => {
                  hideTitle(element, option, "engine");
                  hideInputIfAnyTitle(option, "engine");
               });
               break;
            case element.id == "transmission":
               hideOnlyInput(element);
               break;
            case element.id == "drive":
               hideOnlyInput(element);
               break;

            case element.id == "color":
               hideInputColor(element);
               break;
            default:
               break;
         }
      }
   });

   function hideTitle(element, option, nameBlock) {
      if (nameBlock == "model") {
         let h4 = document.querySelector('.filter-list__complete-set .filter-list__content h4[name="' + option.category + '"');
         let input = document.querySelector('input[name="' + element.id + '"][value="' + option.category + '"]');
         if (option.disabled) {
            input.parentElement.classList.add("disabledblock");
            if (h4 != null) {
               h4.classList.add("disabledblock");
            }
         } else {
            input.parentElement.classList.remove("disabledblock");
            if (h4 != null) {
               h4.classList.remove("disabledblock");
            }
         }
      }
      if (nameBlock == "engine") {
         let h4 = document.querySelector('.filter-list__engine .filter-list__content h4[name="' + option.category + '"');
         let input = document.querySelector('input[name="' + option.category + '"]');
         if (option.disabled) {
            input.parentElement.classList.add("disabledblock");
            if (h4 != null) {
               h4.classList.add("disabledblock");
            }
         } else {
            input.parentElement.classList.remove("disabledblock");
            if (h4 != null) {
               h4.classList.remove("disabledblock");
            }
         }
      }
   }

   function hideInputIfAnyTitle(option, nameBlock) {
      if (nameBlock == "model") {
         option.options.forEach((comlect) => {
            let input = document.querySelector('input[name="' + option.category + '"][value="' + comlect.name + '"]');

            if (!input) {
               return;
            } else {
               if (comlect.disabled) {
                  input.parentElement.classList.add("disabledblock");
               } else {
                  input.parentElement.classList.remove("disabledblock");
               }
            }
         });
      }
      if (nameBlock == "engine") {
         option.options.forEach((comlect) => {
            let input = document.querySelector('input[name="' + option.category + '"][value="' + comlect.name + '"]');

            if (option.disabled || comlect.disabled) {
               input.parentElement.classList.add("disabledblock");
            } else {
               input.parentElement.classList.remove("disabledblock");
            }
         });
      }
   }

   function hideOnlyInput(element) {
      element.options.forEach((option) => {
         let input = document.querySelector('input[name="' + element.id + '"][value="' + option.name + '"]');

         if (option.disabled) {
            input.parentElement.classList.add("disabledblock");
         } else {
            input.parentElement.classList.remove("disabledblock");
         }
      });
   }

   function hideInputColor(element) {
      element.options.forEach((option) => {
         let input = document.querySelector('input[name="' + element.id + '"][value="' + option.name + '"]');

         if (option.disabled) {
            input.parentElement.style.display = "none";
         } else {
            input.parentElement.style.display = "flex";
         }
      });
   }
}
