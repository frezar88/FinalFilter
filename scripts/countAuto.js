export function countAuto(data) {
   let countSpan = document.querySelectorAll(".count");
   let carListIteam = document.querySelectorAll(".car-list__item");
   let foundCountCarMainScreenValue = countSpan[0].innerHTML;
   let foundCountCarMainScreenParent = countSpan[0].parentElement;
   let blockFoundCarMainScreenValue = countSpan[0].previousSibling.previousSibling.innerHTML;
   let blockCarsMainScreenValue = countSpan[0].nextSibling.nextSibling.innerHTML;

   let foundCountCarMobileScreen = countSpan[2];
   let foundCountCarMobileScreenValue = countSpan[2].innerHTML;
   let blockCarsMobileScreen = countSpan[2].nextSibling.nextSibling;
   let blockCarsMobileScreenValue = countSpan[2].nextSibling.nextSibling.innerHTML;

   for (let i = 0; i < countSpan.length; i++) {
      countSpan[i].innerHTML = data;

      switch (true) {
         case foundCountCarMainScreenValue == 0:
            addValueBlockCountCarMainOrMobileScreen("MainScreen", 0);
            break;

         case foundCountCarMainScreenValue == 1:
            addValueBlockCountCarMainOrMobileScreen("MainScreen", 1, "автомобиль", "Найдено");

            break;
         case foundCountCarMainScreenValue > 1:
            addValueBlockCountCarMainOrMobileScreen("MainScreen", 1, "авто", "Найдено");

            break;
         case foundCountCarMobileScreenValue < 1:
            addValueBlockCountCarMainOrMobileScreen("Hide");

            break;
         case foundCountCarMobileScreen == 1:
            addValueBlockCountCarMainOrMobileScreen("MobileScreen", 1, "&nbsp &nbspавтомобиль");
            break;
         case countSpan[2].innerHTML > 1:
            addValueBlockCountCarMainOrMobileScreen("MobileScreen", 1, "&nbsp &nbsp авто");
            break;
      }
   }

   function addValueBlockCountCarMainOrMobileScreen(MainScreen, opacity, cars, found) {
      if (MainScreen === "MainScreen") {
         if (opacity) {
            foundCountCarMainScreenParent.style.opacity = opacity;
         }
         if (cars) {
            blockCarsMainScreenValue = cars;
         }
         if (found) {
            blockFoundCarMainScreenValue = found;
         }
      }

      if (MainScreen === "MobileScreen") {
         if (opacity) {
            blockCarsMobileScreen.style.opacity = opacity;
         }
         if (cars) {
            blockCarsMobileScreenValue = carListIteam.length + cars;
         }
      }
      if (MainScreen === "Hide") {
         foundCountCarMobileScreen.style.opacity = "0";
         blockCarsMobileScreen.style.opacity = "0";
      }
   }
}
