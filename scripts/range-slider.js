export let priceSlider;
export function priceRangeSlider(min, max, patch, index) {
   priceSlider = document.querySelectorAll(patch);
   const minPrice = document.querySelectorAll(".minPrice");
   const maxPrice = document.querySelectorAll(".maxPrice");
   const inputs = [minPrice[index], maxPrice[index]];
   if (priceSlider[index]) {
      noUiSlider.create(priceSlider[index], {
         start: [min, max],
         tooltips: true,
         connect: true,
         padding: 0,
         range: {
            min: min,
            max: max,
         },
      });

      priceSlider[index].noUiSlider.on("update", function (values, handle) {
        let roundedМalue = Math.round(values[handle]);
        
         let formattedValue = roundedМalue.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
         inputs[handle].value = formattedValue;
      });
      const setPriceSlider = (indexActivInput, value) => {
         let arr = [null, null];
         let inputValue = value;
         inputValue = inputValue.replace(/\s+/g, "");
         arr[indexActivInput] = inputValue;
         priceSlider[index].noUiSlider.set(arr);
      };
      inputs.forEach((element, index) => {
         element.addEventListener("change", (event) => {
            setPriceSlider(index, event.currentTarget.value);
         });
      });
   }
}

export function updateRangeInput(indexItem, dataMin, dataMax) {
   let min = dataMin;
   let max = dataMax;
   if (min != max) {
      priceSlider[indexItem].noUiSlider.updateOptions({
         range: {
            min: +min,
            max: +max,
         },
      });
   }
}
