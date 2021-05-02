export function CreateAppraiseBlock(blockName, AccardeonName, data) {
    let block;
    let form;
    let blockFromInputs;
    let appraiselist = document.querySelector(".appraise-car-body__list");
    let host = "";
    if (window.location.hostname == "127.0.0.1") {
        host = "http://dev.mitsubishi.by/";
    }

    if (data) {
        let callBackBlock = document.querySelector(".callback-form");
        if (!callBackBlock) {

            if (data.status || data.status == false || data == '') {

                appraiselist.appendChild(createCallBackForm());
                let BtnSendYouPhoneNumber = document.querySelector(".callback-form__body form div");
                BtnSendYouPhoneNumber.addEventListener("click", (event) => {
                    console.log("Messange Send");
                    AddEventToTheSendButtonFromTheBlock(event);
                });
                addMaskFromInputCallBackForm(".callback-form__body input", "+375 (__) ___ __ __");
                return;
            }
        }
        if (callBackBlock) {
            return;
        }
    }

    function AddEventToTheSendButtonFromTheBlock(event) {
        let btnSend = document.querySelector(".callback-form__body form input");

        if (btnSend.value.length == 19) {
            event.target.classList.add("disable");
            btnSend.setAttribute("disabled", "");
            btnSend.setAttribute("style", "background-color:#ebebeb;");
            setTimeout(() => {
                btnSend.removeAttribute("disabled");
                btnSend.removeAttribute("style");
                event.target.classList.remove("disable");
                btnSend.value = "";
            }, 1000);
        }
    }

    switch (blockName) {
        case "brand":
            createFinalBlock(blockName, AccardeonName, data);

            break;
        case "model":
            createFinalBlock(blockName, AccardeonName, data);

            break;
        case "generation":
            createFinalBlock(blockName, AccardeonName, data);
            break;
        case "modification":
            createFinalBlock(blockName, AccardeonName, data);
            break;
        case "equipment":
            createFinalBlock(blockName, AccardeonName, data);
            break;
        case "year":
            createFinalBlock(blockName, AccardeonName, data);
            break;
        case "mileage":
            createFinalBlock(blockName, AccardeonName, data);
            divideNumbersIntoDigits();
            break;
        case "callback":
            if (document.querySelector('.callback-form')) {
                document.querySelector('.callback-form').remove()
            }
            appraiselist.appendChild(createCallBackForm());
            let BtnSendYouPhoneNumber = document.querySelector(".callback-form__body form div");
            BtnSendYouPhoneNumber.addEventListener("click", (event) => {
                console.log("Messange Send");
                AddEventToTheSendButtonFromTheBlock(event);
            });
            addMaskFromInputCallBackForm(".callback-form__body input", "+375 (__) ___ __ __");


            break;
        default:
            break;
    }

    function clickAccordAppraise(blockName) {
        document.querySelector('.acord[data-name="' + blockName + '"]').click();
    }

    function divideNumbersIntoDigits() {
        let mileageInput = document.querySelector('input[list="mileage"]');
        mileageInput.addEventListener("keyup", (key) => {
            let val = mileageInput.value.replace(/\s+/g, "");
            mileageInput.value = val
                .replace(/[^\d]/g, "")
                .replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
        });
    }

    function createFinalBlock(blockName, AccardeonName, data) {
        createFormBlockAppraise(blockName);
        createAppraiseAccardeon(AccardeonName, blockName);
        createAppriseListContent(blockName, data);
        createAppraiseBlockForInputRadio(blockName);
        createGeneralBlockAppraise(blockName);
        appraiselist.appendChild(block);
        clickAccordAppraise(blockName);
    }

    function createGeneralBlockAppraise(params) {
        block = createElement("div", {
            class: ["appraise-car-body__" + params, "list-content"],
        });
        return block.append(form);
    }

    function createFormBlockAppraise(params) {
        return (form = createElement("div", { class: "from-" + params }));
    }

    function createAppraiseAccardeon(params, blockName) {
        return form.append(
            createElement("div", { class: "acord", "data-name": blockName }, params)
        );
    }

    function createAppriseListContent(name, data) {
        switch (true) {
            case name == "brand" || name == "model":
                form.append(
                    createElement(
                        "div", {
                            class: ["appraise-car-body__list-content", "app-list-item", name],
                            "data-name": name,
                        }, [
                            createAppraiseInputText(name),
                            createAppraiseBlockForInputRadio(name, data),
                            createAppraiseBtnShowMore(name),
                        ]
                    )
                );

                break;
            case name == "generation" || name == "equipment":
                form.append(
                    createElement(
                        "div", {
                            class: ["appraise-car-body__list-content", "app-list-item"],
                            "data-name": name,
                        }, [
                            createAppraiseBlockForInputRadio(name, data),
                            createAppraiseBtnShowMore(name),
                        ]
                    )
                );
                break;
            case name == "mileage":
                form.append(
                    createElement(
                        "div", {
                            class: ["appraise-car-body__list-content", "app-list-item"],
                            "data-name": name,
                        }, [createAppraiseInputText(name), createApparaiseBtnRate(name)]
                    )
                );
                break;
            case name == "modification":
                form.append(
                    createElement(
                        "div", {
                            class: ["appraise-car-body__list-content", "app-list-item"],
                            "data-name": name,
                        }, [
                            createAppraiseBlockForInputRadioForModif(name, data),
                            createAppraiseBtnShowMore(name),
                        ]
                    )
                );
                break;
            case name == "year":
                form.append(
                    createElement(
                        "div", {
                            class: ["appraise-car-body__list-content", "app-list-item"],
                            "data-name": name,
                        }, [
                            createAppraiseBlockForInputRadio(name, data),
                            createAppraiseBtnShowMore(name),
                        ]
                    )
                );
                break;
            default:
                break;
        }

        return form;
    }



    function createAppraiseInputText(nameBlock) {
        if (nameBlock == "mileage") {
            return createElement(
                "div", { class: "appraise-car-body__" + nameBlock + "-input-text" }, [
                    createElement("input", {
                        type: "text",
                        placeholder: "Начните ввод",
                        list: nameBlock,
                        required: "",
                    }),
                    createElement("div", { class: "block-of-found-cars-" + nameBlock }),
                ]
            );
        }
        return createElement(
            "div", { class: "appraise-car-body__" + nameBlock + "-input-text" }, [
                createElement("input", {
                    type: "text",
                    placeholder: "Начните ввод",
                    list: nameBlock,
                }),
                createElement("div", { class: "block-of-found-cars-" + nameBlock }),
            ]
        );
    }

    function createAppraiseBlockForInputRadio(nameBlock, data) {
        blockFromInputs = createElement("div", {
            class: "appraise-car-body__" + nameBlock + "-input-radio",
        });
        for (const key in data) {
            blockFromInputs.appendChild(
                createAppraiseInputRadio(nameBlock, data[key].id, data[key].name)
            );
        }
        return blockFromInputs;
    }

    function createAppraiseBlockForInputRadioForModif(nameBlock, data) {
        if (data.status != false) {
            blockFromInputs = createElement("div", {
                class: "appraise-car-body__" + nameBlock + "-input-radio",
            });
            data.versions.forEach((element) => {
                blockFromInputs.appendChild(
                    createAppraiseInputRadio(nameBlock, element.id, element.name)
                );
            });
            return blockFromInputs;
        }
    }

    function createAppraiseInputRadio(params, dataId, dataName) {
        return createElement("label", { name: dataName, value: params }, [
            createElement("input", {
                type: "radio",
                name: params,
                value: dataName,
                "data-id": dataId,
            }),
            createElement("span", {}, "" + dataName),
        ]);
    }

    function createAppraiseBtnShowMore(params) {
        return createElement(
            "div", { class: "appraise-car-body__" + params + "-btn-more" }, [
                createElement(
                    "span", { class: ["btn-show-more-" + params, "btn-show-more"] },
                    "Показать все"
                ),
            ]
        );
    }

    function createApparaiseBtnRate(params) {
        return createElement(
            "div", { class: ["appraise-car-body__" + params + "-btn"], type: "submit" }, [createElement("div", {}, "Оценить")]
        );
    }

    function createCallBackForm() {
        return createElement("div", { class: "callback-form" }, [
            createElement(
                "p", {},
                "К сожалению у нас нет информации по марке вашего автомобиля, свяжтесь с нами для получения более точной информации"
            ),
            createElement("div", { class: "callback-form__body" }, [
                createElement("form", {}, [
                    createElement("h4", {}, "Закажите обратный звонок"),
                    createElement("input", {
                        placeholder: "Введите номер телефона",
                        required: "",
                    }),
                    createElement(
                        "div", { class: "viewer", "data-type": "rejected-trade-in" },
                        "ОТПРАВИТЬ"
                    ),
                ]),
            ]),
            createElement("p", {}, [
                createElement("span", {}, "687-90-90"),
                "Единая линия Mitsubishi",
            ]),
        ]);
    }

    function createElement(typeElem, divAttributs, divInnerText) {
        let div = document.createElement(typeElem);

        if (divAttributs) {
            for (const key in divAttributs) {
                if (key == "class" && typeof divAttributs[key] == "string") {
                    div.classList.add(divAttributs[key]);
                }
                if (key == "class" && typeof divAttributs[key] == "object") {
                    divAttributs[key].forEach((element) => {
                        div.classList.add(element);
                    });
                }
                if (key != "class") {
                    div.setAttribute(key, divAttributs[key]);
                }
            }
        }
        if (divInnerText && typeof divInnerText == "string") {
            div.innerHTML = divInnerText;
        }
        if (typeof divInnerText == "object" && divInnerText) {
            divInnerText.forEach((element) => {
                div.append(element);
            });
        }

        return div;
    }

    /* -------------------------------------------------------------------------------- */

    function addMaskFromInputCallBackForm(path, maskValue) {
        function setCursorPosition(pos, elem) {
            elem.focus();
            if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
            else if (elem.createTextRange) {
                let range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
            }
        }

        function mask(event) {
            let matrix = maskValue,
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");

            if (def.length >= val.length) val = def;

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ?
                    val.charAt(i++) :
                    i >= val.length ?
                    "" :
                    a;
            });

            if (event.type == "blur") {
                if (this.value.length == 2) this.value = "";
            } else setCursorPosition(this.value.length, this);
        }

        let input = document.querySelector(path);

        input.addEventListener("input", mask, false);

        input.addEventListener("focus", mask, false);

        input.addEventListener("blur", mask, false);
    }

    return block;
}