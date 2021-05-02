export class Filter {
   filterContaner;
   generalBlockFilter;
   constructor(data) {
      this.generalBlockCreate(data);
      this.modelBlockMove();
      this.ChangeForm();
      this.stateBlockMove();
   }

   createElement(settings) {
      let dom = document.createElement(settings.elem);
      this.createElementSettings(dom, settings);

      return dom;
   }

   createElementSettings(dom, settings) {
      for (let key in settings.attributes) {
         dom.setAttribute(key, settings.attributes[key]);
      }
      if (typeof settings.inner == "object") {
         settings.inner.forEach((inner) => {
            dom.append(this.createElement(inner));
         });
      } else {
         dom.innerText = settings.inner ? settings.inner : "";
      }
   }

   generalBlockCreate(data) {
      data.forEach((element) => {
         this.createGeneralBlock(element.name, element.id);
         this.append(".filter-list__wrapper form", this.filterContaner);

         if (element.name == "Модель") {
            element.options.forEach((options) => {
               this.createCheckBox(options.category, options.disabled, element.id);
               this.append(".filter-list__model .filter-list__content", this.filterContaner);
               let modelMod = document.createElement("h4");
               modelMod.setAttribute("name", options.category);
               modelMod.classList.add("false");
               modelMod.innerText = options.category;
               modelMod.style.display = "none";

               this.append(".filter-list__complete-set .filter-list__content", modelMod);

               options.options.forEach((element2) => {
                  if (element2.name != null && element2.name != "") {
                     if (element2.name != modelMod.innerText) {
                        modelMod.style.display = "block";
                     }
                     this.createCheckBox(element2.name, element2.disabled, options.category);
                     this.append(".filter-list__complete-set .filter-list__content", this.filterContaner);
                  }
               });
            });
         }

         if (element.name == "Год") {
            element.options.forEach((options) => {
               this.createCheckBox(options.name, options.disabled, element.id);

               this.append(".filter-list__year .filter-list__content", this.filterContaner);
            });
         }
         if (element.name == "Цена") {
            for (const key in element.options) {
               if (key == "min") {
                  this.createRange(element.id);
                  this.append(".filter-list__price .filter-list__content", this.filterContaner);
               }
            }
         }
         if (element.name == "Выгода по trade-in") {
            for (const key in element.options) {
               if (key == "min") {
                  this.createRange(element.id);
                  this.append(".filter-list__trade-in .filter-list__content", this.filterContaner);
               }
            }
         }

         if (element.id == "engine") {
            element.options.forEach((options) => {
               this.createCheckBox(options.category, options.disabled);
               let fuel = document.createElement("h4");
               fuel.setAttribute("name", options.category);
               fuel.classList.add("false");
               fuel.innerText = options.category;
               this.append(".filter-list__engine .filter-list__content", fuel);
               options.options.forEach((ele) => {
                  this.createCheckBox(ele.name, ele.disabled, options.category);
                  this.append(".filter-list__engine .filter-list__content", this.filterContaner);
               });
            });
         }

         if (element.id == "transmission") {
            element.options.forEach((options) => {
               this.createCheckBox(options.name, options.disabled, element.id);
               this.append(".filter-list__transmission .filter-list__content", this.filterContaner);
            });
         }

         if (element.id == "drive") {
            element.options.forEach((options) => {
               this.createCheckBox(options.name, options.disabled, element.id);
               this.append(".filter-list__drive .filter-list__content", this.filterContaner);
            });
         }

         if (element.id == "state") {
            element.options.forEach((options) => {
               this.createCheckBox(options.name, options.disabled, element.id);
               this.append(".filter-list__state .filter-list__content", this.filterContaner);
            });
         }
         if (element.id == "color") {
            let colorBlok = document.createElement("div");
            colorBlok.classList.add("flex-block");
            let mar = document.createElement("div");
            mar.classList.add("margin-box");
            this.append(".filter-list__color .filter-list__content", colorBlok);
            this.append(".filter-list__color .filter-list__content", mar);
            element.options.forEach((options) => {
               this.createColorblock(element.id, options.name, options.color, options.disabled);
               this.append(".flex-block", this.filterContaner);
            });
         }
      });
   }

   createGeneralBlock(id, key) {
      return (this.filterContaner = this.createElement({
         elem: "div",
         attributes: { class: "filter-list__" + key + " filter-list-block" },
         inner: [
            { elem: "span", attributes: { class: "accordion" }, inner: id },
            {
               elem: "div",
               attributes: { class: "filter-list__content" },
               inner: [{ elem: "div", attributes: { class: "additionally-close" } }],
            },
         ],
      }));
   }
   createCheckBox(value, status, name) {
      return (this.filterContaner = this.createElement({
         elem: "div",
         attributes: { class: "filter-list__item" },
         inner: [
            {
               elem: "label",
               attributes: { class: status },
               inner: [
                  { elem: "input", attributes: { type: "checkbox", name: name, value: value, class: "inp" } },
                  { elem: "span", inner: value },
               ],
            },
         ],
      }));
   }
   createRange(name) {
      return (this.filterContaner = this.createElement({
         elem: "div",
         attributes: { class: "filter-list__item" },
         inner: [
            {
               elem: "div",
               attributes: { class: "price-input" },
               inner: [
                  { elem: "input", attributes: { class: "minPrice", type: "text", name: name } },
                  { elem: "input", attributes: { class: "maxPrice", name: name, type: "text" } },
               ],
            },
            {
               elem: "div",
               attributes: { class: "slider-wrapper" },
               inner: [{ elem: "div", attributes: { class: "slider-range" } }],
            },
         ],
      }));
   }

   createColorblock(name, value, color, status) {
      return (this.filterContaner = this.createElement({
         elem: "div",
         attributes: { class: "filter-list__item" },
         inner: [
            {
               elem: "label",
               attributes: { style: "background-color:" + color + ";", class: status },
               inner: [
                  { elem: "input", attributes: { name: name, value: value, type: "checkbox", class: "inp" } },
                  { elem: "div", inner: value },
                  { elem: "span", inner: [{ elem: "img", attributes: { src: "/img/arrow.svg" } }] },
               ],
            },
         ],
      }));
   }

   append(path, content) {
      document.querySelector(path).append(content);
   }

   modelBlockMove() {
      let modelBlock = document.querySelector(".filter-list__model.filter-list-block");
      modelBlock.setAttribute("style", "order:-1;");
   }
   stateBlockMove() {
      let modelBlock = document.querySelector(".filter-list__state.filter-list-block");
      modelBlock.setAttribute("style", "order:-2;");
   }

   ChangeForm() {
      let carPrice = document.querySelector(".filter-list__price .filter-list__content");
      let carTradeIn = document.querySelector(".filter-list__trade-in .filter-list__content");
      let inputsChange = document.querySelectorAll(".inp");

      carPrice.addEventListener("mouseup", () => {
         let chang = document.querySelector(".car-price");
         setTimeout(() => {
            chang.click();
         }, 500);
      });
      carTradeIn.addEventListener("mouseup", () => {
         let chang = document.querySelector(".car-trade-in");
         setTimeout(() => {
            chang.click();
         }, 500);
      });
   }
}
