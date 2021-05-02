function showOtherCarFoto(params) {
    let fotoBlock = document.querySelector('.foto-block')
    let mainFotoBlock = document.querySelector('.main-foto')
    let mainFoto = document.querySelector('.main-foto img')
    let secondaryFoto = document.querySelectorAll('.secondary-foto-block img')
    let blockBtnCrossClosePopUp = document.querySelector('.block-btn-cross-close img')
    let descriptionCarBlockPopUp = document.querySelector('.description-car')
    let descriptionCarBlockContainer = document.querySelector('.description-car-container')

    fotoBlock.addEventListener('click', (e) => {
        if (e.target.parentNode.className == 'secondary-foto-block') {
            console.log(e.target.attributes.src.nodeValue)
            console.log(mainFoto)
            mainFotoBlock.innerHTML = ''
            mainFoto.setAttribute('src', e.target.attributes.src.nodeValue)
            mainFotoBlock.appendChild(mainFoto)
        }
    })
    function closedPopUp() {
        descriptionCarBlockContainer.addEventListener('click', (e) => {
            if (e.target.className == 'description-car-container') {
                descriptionCarBlockPopUp.style.display = 'none'
                descriptionCarBlockContainer.style.display = 'none'
            }
        })

        blockBtnCrossClosePopUp.addEventListener('click', (e) => {
            descriptionCarBlockPopUp.style.display = 'none'
            descriptionCarBlockContainer.style.display = 'none'

        })
    }


    closedPopUp()
}
showOtherCarFoto()

export function showPopUpDiscriptionBuCar(e, carDescription) {
    let descriptionCarBlockPopUp = document.querySelector('.description-car')
    let descriptionCarBlockContainer = document.querySelector('.description-car-container')
    descriptionCarBlockContainer.style.display = 'block'
    descriptionCarBlockPopUp.style.display = 'block'
    let eventCurentTargetDataCarId = e.currentTarget.attributes['data-car-id'].value
    console.log(eventCurentTargetDataCarId)
    console.log(carDescription)
    addNewInfoForCarInPopUpWindow()

    function addNewInfoForCarInPopUpWindow(params) {
        let carDescript = document.querySelector('.car-descript')
        let pathDevMitsubishi = 'http://dev.mitsubishi.by'
        let currentObjectInfo = carDescription[eventCurentTargetDataCarId]

       
        editAttributesImg('.main-foto img', pathDevMitsubishi + currentObjectInfo.image)
        methodAddInfoForBlockDescriptionBuCar('.car-name p', currentObjectInfo.name)
        methodAddInfoForBlockDescriptionBuCar('.car-name span', currentObjectInfo.year)
        methodAddInfoForBlockDescriptionBuCar('.car-engine span', currentObjectInfo.engine_capacity + ' л., ' + currentObjectInfo.power + ' л.с, ' + currentObjectInfo.engine_name)
        methodAddInfoForBlockDescriptionBuCar('.car-transmission span', currentObjectInfo.transmission)
        methodAddInfoForBlockDescriptionBuCar('.car-drive span', currentObjectInfo.drive)
        methodAddInfoForBlockDescriptionBuCar('.car-mileage span', currentObjectInfo.milage)
        methodAddInfoForBlockDescriptionBuCar('.car-descript', currentObjectInfo.by_description)
        
       
        switch (typeof currentObjectInfo.image) {
            case 'string':
               
                break;
            case 'object':
                currentObjectInfo.image.forEach(element => {
                    addSecondaryImg(pathDevMitsubishi + element)
                });
                break;
            default:
                break;
        }
    }

    

    function methodAddInfoForBlockDescriptionBuCar(pathBlock,data) {
        let div = document.querySelector(pathBlock)
        div.innerHTML = data
    }
    function editAttributesImg(pathImg,srcImg) {
        let img = document.querySelector(pathImg)
        img.setAttribute('src', srcImg )
    }
    function addSecondaryImg(srcPath) {
        let secondaryFotoBlock = document.querySelector('.secondary-foto-block');
        secondaryFotoBlock.innerHTML = ''
        let secondaryFoto = new Image()
        secondaryFoto.src = srcPath
        secondaryFotoBlock.appendChild(secondaryFoto)
    }

    function addSpaseTittleDescriptionBuCar() {
        let li = document.querySelectorAll('.car-descript strong')
        li.forEach(element => {
            element.parentElement.style.marginTop='10px' 
        });
    }
    addSpaseTittleDescriptionBuCar()
}


