
export function CreateElementResultCarAndBtnShowMore(data, builder,page) {
    
    let btnMore = document.querySelector('.result-footer button')
    btnMore.addEventListener('click', () => {
        
    })
    for (let i=0; i < data.length; i++) {
        
       
        let carList = new builder(data[i], ".car-list__wrapper");
    }
    
    
    let carItem = document.querySelectorAll('.car-list__item')
    
    if (carItem.length == 0 || data.length!=15 ) {
        btnMore.style.display = 'none'
        btnMore.classList.add('noneDisp')
    }
    else {
        btnMore.style.display = 'block'
        btnMore.classList.remove('noneDisp')
        
    }

    return page
}


