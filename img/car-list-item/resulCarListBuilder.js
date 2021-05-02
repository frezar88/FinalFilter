

export class CarBuilder {
  carContainer;
  path;
  car;

  constructor(car, path) {
    
    this.path = path;
    this.car = car;

    this.carContainer = this.createCar(this.car, this.path);
    this.append(path, this.carContainer);
  }

  createElement(settings) {
    let dom = document.createElement(settings.elem);
    this.createElementSettings(dom, settings)

    return dom;
  }

  createElementSettings(dom, settings) {

    for (let key in settings.attributes) {
      dom.setAttribute(key, settings.attributes[key])
    }
    if (typeof settings.inner == "object") {
      settings.inner.forEach(inner => {
        dom.append(this.createElement(inner))
      })
    } else {
      dom.innerText = settings.inner ? settings.inner : '';
    }
  }

  createCar() {

    this.createItem(this.car.id,this.car.type);
    this.addImg(this.car.image);
    this.addTitle(this.car.name, this.car.year, this.car.win ? this.car.win : "");
    this.addFeatures(this.car.engine_capacity, this.car.power, this.car.transmission, this.car.drive, this.car.engine_name);
    this.addStatus('В наличии');
    this.addPrice(this.car.price, this.car.advantage);
    console.log(this.car.advantage)
    this.addAdvantage(this.car.advantage)
    this.addAdvansedPrice();
    this.addLocation(this.car.location ? this.car.location : 'Минск');
    this.addBtnreserve(this.car.id)
    // this.createItem1(this.car.id);
    // this.addImg1(this.car.image);
    // this.addNameAndYear(this.car.name, this.car.year)
    // this.addPrice1(this.car.price)
    return this.carContainer;
  }
  createItem(id,type) {
    return this.carContainer = this.createElement({
      'elem': 'div',
      'attributes': {
        'class': 'car-list__item',
        'data-car-id': id,
        'data-type': type
      },
    });
  }
  addImg(image) {
    return this.carContainer.append(this.createElement({
      'elem': 'div',
      'attributes': {
        'class': 'car-list__img'
      },
      'inner': [{
        'elem': 'img',
        'attributes': {
          'src': image
        },
      }]
    }))
  }
  addTitle(CarName, year, win) {
    return this.carContainer.appendChild(this.createElement({
      'elem': 'div',
      'attributes': {
        'class': 'car-list__title'
      },
      'inner': [{
        'elem': 'h3',
        'inner': CarName,
      }, {
        'elem': 'div',
        'inner': [{ 'elem': 'span', 'inner': year },
        { 'elem': 'span', 'inner': win }]
      }],
    }))
  }
  addFeatures(engine_capacity, power, transmission, drive, engine_name) {
    return this.carContainer.appendChild(this.createElement({
      'elem': 'div',
      'attributes': {
        'class': 'car-list__features'
      }, 'inner': [{
        'elem': 'div',
        'inner': [{
          'elem': 'img',
          'attributes': {
            'src': '../../../images/new-filter/img/car-list-item/malfunction-indicador.svg',
            'alt': '#'
          }
        }, {
          'elem': 'p',
          'inner': engine_capacity + ' л., ' + power + ' л.с, ' + engine_name
        }]
      }, {
        'elem': 'div',
        'inner': [{
          'elem': 'img',
          'attributes': {
            'src': '../../../images/new-filter/img/car-list-item/manual-transmission.svg',
            'alt': '#'
          }
        }, {
          'elem': 'p',
          'inner': transmission
        }]
      }, {
        'elem': 'div',
        'inner': [{
          'elem': 'img',
          'attributes': {
            'src': '../../../images/new-filter/img/car-list-item/axle.svg',
            'alt': '#'
          }
        }, {
          'elem': 'p',
          'inner': drive
        }]
      }]
    }))
  }

  addStatus(status) {
    //if (status) this.carContainer.innerHTML += "<div class='car-list__in-stock car-list__status'><span></span><span>" + status + "</span></div>";
    //else this.carContainer.innerHTML += "<div class='car-list__in-stock car-list__status'><span style='background:red;'></span><span>" + 'Нет в наличии' + "</span></div>";
    let stat;
    if (status) {
      stat = { 'elem': 'div', 'attributes': { 'class': 'car-list__in-stock car-list__status' }, 'inner': [{ 'elem': 'span' }, { 'elem': 'span', 'inner': status }] }
    } else { stat = { 'elem': 'div', 'attributes': { 'class': 'car-list__in-stock car-list__status' }, 'inner': [{ 'elem': 'span', 'attributes': { 'style': `background:red` } }, { 'elem': 'span', 'inner': 'Нет в наличии' }] } }
    return this.carContainer.appendChild(this.createElement(stat))
  }

  addPrice(price, advantage) {
    if (advantage == '' || price== (price - advantage)) {
      return this.carContainer.appendChild(this.createElement({
        'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price' },
        'inner': [
          {
            'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price-from', }, 'inner': [{
              'elem': 'span',
                'inner': String(price - (advantage ? advantage : 0)).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")
            }, { 'elem': 'span', 'inner': ' BYN ' }]
          }, {
                'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price-to', 'style': 'display:none;' }, 'inner': [{ 'elem': 'span', 'inner': String(price).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") },
            { 'elem': 'span', 'inner': ' BYN ' }]
          }
        ]
      }))
    }
    return this.carContainer.appendChild(this.createElement({
      'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price' },
      'inner': [
        {
          'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price-from' }, 'inner': [{
            'elem': 'span',
              'inner': String(price).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") /* String(price - (advantage ? advantage : 0)).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") */
          }, { 'elem': 'span', 'inner': ' BYN ' }]
        }
        // {
        //       'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price-to' }, 'inner': [{ 'elem': 'span', 'inner': String(price).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") },
        //   { 'elem': 'span', 'inner': ' BYN ' }]
        // }
        
      ]
    }))
  }
  addAdvantage(advantage) {
    if (advantage && advantage!='0') {
      return this.carContainer.appendChild(this.createElement({
        'elem': 'div', 'attributes': { 'class': 'car-list__advantage' }, 'inner': [{ 'elem': 'span', 'inner': String(-advantage).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") + ' BYN выгода по trade-in' }]

      }))
    }
  }

  addAdvansedPrice() {
    //<p>Подробнее о цене</p></a></div>';
    return this.carContainer.appendChild(this.createElement({
      'elem': 'div',
      'attributes': {
        'class': 'car-list__more-price'
      },
      'inner': [{
        'elem': 'a',
        'attributes': {
          'href': '#'
        },
        'inner': [{
          'elem': 'img',
          'attributes': {
            'src': '../../../images/new-filter/img/round-info-button.svg',
            'alt': '#'
          }
        }, {
          'elem': 'p',
          'inner': 'Подробнее о цене'
        }],
      }],
    }))
  }

  addLocation(location) {
    return this.carContainer.appendChild(this.createElement({
      'elem': 'div',
      'attributes': {
        'class': 'car-list__location'
      }, 'inner': [{
        'elem': 'img',
        'attributes': {
          'src': '../../../images/new-filter/img/ArrowLocation.png',
          'alt': '#'
        }
      }, {
        'elem': 'span',
        'inner': location
      }]
    }))
  }
  addBtnreserve(carId) {
    return this.carContainer.appendChild(this.createElement({
      'elem': 'div',
      'attributes': {
        'class':'btn-reserve'
      }, 'inner': [{
        'elem': 'a', 'attributes': {
          'href': '#',
          'class': 'red_button viewer',
          'data-toggle': 'modal',
          'data-target': '#pop-up',
          'data-type': 'car-in-stock',
          'data-car': carId
        }, 'inner':'ЗАРЕЗЕРВИРОВАТЬ'
      }]
    }))
  }

  append(path, content) {
    document.querySelector(path).appendChild(content);
  }

  // createItem1(id) {
  //   return this.carContainer = this.createElement({
  //     'elem': 'div',
  //     'attributes': {
  //       'class': 'result-item',
  //       'data-car-id': id
  //     }, 'inner': [{
  //       'elem': 'div',
  //       'attributes': {
  //         'class': 'result-item__wrapper'
  //       }
  //     }]
  //   });
  // }
  // addImg1(image) {
  //   return this.carContainer.append(this.createElement({
  //     'elem': 'div',
  //     'attributes': {
  //       'class': 'result-item__img'
  //     },
  //     'inner': [{
  //       'elem': 'img',
  //       'attributes': {
  //         'src': 'http://dev.mitsubishi.by/' + image
  //       },
  //     }]
  //   }))
  // }
  // addNameAndYear(CarName, year) {
  //   return this.carContainer.append(this.createElement({
  //     'elem': 'div',
  //     'attributes': {
  //       'class': 'result-item__name-year'
  //     },
  //     'inner': [{
  //       'elem': 'span',
  //       'attributes': { 'class': 'item__name' }, 'inner': CarName
  //     },
  //       {
  //         'elem': 'span',
  //         'attributes': { 'class': 'item__year' }, 'inner': year
  //     }
  //     ]
  //   }))
  // }
  // addPrice1(price) {
  //   return this.carContainer.append(this.createElement({
  //     'elem': 'div',
  //     'attributes': {
  //       'class':'result-item__price'
  //     }, 'inner': [
  //       {
  //         'elem': 'div', 'inner': [
  //           { 'elem': 'span', 'attributes': { 'class': 'item__price' }, 'inner': price },
  //           { 'elem': 'span', 'inner': 'BYN' },
  //           { 'elem': 'img', 'attributes': { 'src':'../../../images/new-filter/img/iconI.png'}}
  //         ]
  //       },
  //       {
  //         'elem': 'div', 'inner': [
  //           { 'elem': 'span', 'attributes': { 'class': 'item__post-price' }, 'inner': +price + 2000 },
  //           { 'elem': 'span', 'inner': 'BYN' },
  //           { 'elem': 'span', 'attributes': { 'class': 'item__discount' }, 'inner': [{ 'elem': 'span', 'inner': '- ' + '2000' + 'BYN' }]}
  //         ]
  //       }
  //     ]

  //   }))
  // }
}