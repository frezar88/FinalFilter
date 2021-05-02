export function CreateFormData(request_price) {
   let newFormData = {
      model: getModels(),
      engine: getEngine(),
      year: getYears(),
      drive: getDrive(),
      color: getColor(),
      state: getState(),
      transmission: getTransmission(),
   };

   if (request_price == "car-price") {
      newFormData.price = getPrice();
   }
   if (request_price == "car-trade-in") {
      newFormData["trade-in"] = getTradeIn();
   }

   function getModels() {
      let data = {
         model: {},
      };
      let complectInput = document.querySelectorAll(".filter-list__complete-set input:checked");
      let models = document.querySelectorAll('input[name="model"]:checked');
      models.forEach((model) => {
         data.model[model.defaultValue] = [];
      });
      complectInput.forEach((compl) => {
         data.model[compl.name] = [];
         for (let i = 0; i < complectInput.length; i++) {
            if (compl.name == complectInput[i].name) {
               data.model[compl.name].push(complectInput[i].defaultValue);
            }
         }
      });
      return data.model;
   }

   function getEngine() {
      let data = {
         engine: {},
      };
      let engineValue = document.querySelectorAll(".filter-list__engine input:checked");

      engineValue.forEach((engine) => {
         data.engine[engine.name] = [];
         for (let i = 0; i < engineValue.length; i++) {
            if (engine.name == engineValue[i].name) {
               data.engine[engine.name].push(engineValue[i].defaultValue);
            }
         }
      });
      return data.engine;
   }

   function getYears() {
      let data = [];
      let domData = document.querySelectorAll('input[name="year"]:checked');
      domData.forEach((datum) => {
         data.push(datum.defaultValue);
      });
      return data;
   }
   function getState() {
      let data = [];
      let domData = document.querySelectorAll('input[name="state"]:checked');
      domData.forEach((datum) => {
         data.push(datum.defaultValue);
      });
      return data;
   }
   function getDrive() {
      let data = [];
      let domData = document.querySelectorAll('input[name="drive"]:checked');
      domData.forEach((datum) => {
         data.push(datum.defaultValue);
      });
      return data;
   }
   function getColor() {
      let data = [];
      let domData = document.querySelectorAll('input[name="color"]:checked');
      domData.forEach((datum) => {
         data.push(datum.defaultValue);
      });
      return data;
   }

   function getPrice() {
      let data = [];
      let domData = document.querySelectorAll('input[name="price"]');

      for (let i = 0; i < domData.length; i++) {
         let dd = domData[i].value;
         data.push(dd.replace(/\s+/g, ""));
      }
      return data;
   }

   function getTradeIn() {
      let data = [];
      let domData = document.querySelectorAll('input[name="trade-in"]');

      for (let i = 0; i < domData.length; i++) {
         let dd = domData[i].value;
         data.push(dd.replace(/\s+/g, ""));
      }
      return data;
   }

   function getTransmission() {
      let data = [];
      let domData = document.querySelectorAll('input[name="transmission"]:checked');

      domData.forEach((datum) => {
         data.push(datum.value);
      });
      return data;
   }
   return newFormData;
}
