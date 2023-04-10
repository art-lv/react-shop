import initAPI from "../api/api"

const SET_PRODUCT_SLUG = 'SET_PRODUCT_SLUG'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_UNIC_VARIANT = 'SET_UNIC_VARIANT'
const SET_ID_VARIANTS = 'SET_ID_VARIANTS'
const SET_INPUT_ID = 'SET_INPUT_ID'
const SET_PRODUCT_FOUND = 'SET_PRODUCT_FOUND'
const RESET_PRODUCT_CARD = 'RESET_PRODUCT_CARD'
const SET_ARRAY_POSSIBLE_ID = 'SET_ARRAY_POSSIBLE_ID'


let initialState = {
    productDataSlug: {},
    // Есть ли прелоадер?
    isFetching: false,
    unicVariant: [],
    idVariants: [],
    checkedInputId: [],

    // Найден ли товар?
    productFound: false,

    // 2 вспомогательных переменных
    arrayPossibleInputId: [],
    arrayCheckedOptionId: [],
    arrayDengerInputId: []


}

const cardProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PRODUCT_SLUG: {
            return {
                ...state,
                productDataSlug: action.productDataSlug
            }
        }

        // Переключаем loader с false на true во время загрузки и наоборот
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case SET_UNIC_VARIANT: {
            return {
                ...state,
                unicVariant: action.unicVariant
            }
        }


        case SET_ID_VARIANTS: {
            return {
                ...state,
                idVariants: action.idVariants
            }
        }


        case SET_INPUT_ID: {
            return {
                ...state,
                checkedInputId: action.checkedInputId
            }
        }

        case SET_PRODUCT_FOUND: {
            return {
                ...state,
                productFound: action.boolean
            }
        }

        case RESET_PRODUCT_CARD: {
            return {
                ...state,
                checkedInputId: [],
                productFound: false
            }
        }

        case SET_ARRAY_POSSIBLE_ID: {
            return {
                ...state,
                arrayPossibleInputId: action.arrayPossibleInputId,
                arrayCheckedOptionId: action.arrayCheckedOptionId,
                arrayDengerInputId: action.arrayDengerInputId
            }
        }


        default: {
            return state
        }

    }
}



let setProductSlug = (productDataSlug) => ({
    type: SET_PRODUCT_SLUG,
    productDataSlug
})


// Включение и выключение лоадера
export let toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

// Получаем массивы для отрисовки радио кнопок
let setUnicVariant = (unicVariant) => ({
    type: SET_UNIC_VARIANT,
    unicVariant
})


// Получаем массивы нескольких id - вариантов товаров
let setIdVariants = (idVariants) => ({
    type: SET_ID_VARIANTS,
    idVariants
})


let setInputId = (checkedInputId) => ({
    type: SET_INPUT_ID,
    checkedInputId
})

let setProductFound = (boolean) => ({
    type: SET_PRODUCT_FOUND,
    boolean
})


export let resetProductCard = () => ({
    type: RESET_PRODUCT_CARD,
})




let arrayPossibleId = (arrayPossibleInputId, arrayCheckedOptionId, arrayDengerInputId) => ({
    type: SET_ARRAY_POSSIBLE_ID,
    arrayPossibleInputId,
    arrayCheckedOptionId,
    arrayDengerInputId
})





// Удаление дубликата строки
function removeStringDublicate(string) {
    let uniqueString = string.filter((element, index) => {
        return string.indexOf(element) === index
    })
    return uniqueString
}



// https://www.internet-technologies.ru/articles/udalenie-povtoryayuschihsya-obektov-iz-massiva-js.html
// Функция удаления дубликата массива
function removeDuplicates(arr) {

    const result = [];
    const duplicatesIndices = [];

    // Перебираем каждый элемент в исходном массиве
    arr.forEach((current, index) => {

        if (duplicatesIndices.includes(index)) return;

        result.push(current);

        // Сравниваем каждый элемент в массиве после текущего
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {

            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);

            // Проверяем длину массивов
            if (currentKeys.length !== comparisonKeys.length) continue;

            // Проверяем значение ключей
            const currentKeysString = currentKeys.sort().join("").toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;

            // Проверяем индексы ключей
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if (current[key] !== comparison[key]) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);

        } // Конец цикла
    });
    return result;
}


// Проверка нашего массива на уже нажатие id и запись новых
export const checkId = (inputId, optionId) => {
    return (dispatch, getState) => {

        // Создадим массив, с полями инпут id и option id
        let idInputObject = [inputId, optionId]

        // Нужно проверить - если переданный id уже есть, его нужно удалить из массива
        const checkedInputId = getState().cardProduct.checkedInputId


        // Положим в служебный массив все значения inputId
        let allInputId = []
        checkedInputId.forEach(i => {
            allInputId.push(i[0])
        })

        // Если такой inputId уже есть
        if (allInputId.includes(inputId)) {
            // Удалим его, приведя изначально к строке
            let newArray = checkedInputId.filter(item => JSON.stringify(item) !== JSON.stringify(idInputObject))
            // console.log (newArray)
            // console.log (checkedInputId)
            dispatch(setInputId(newArray))
            // Также удалим данные о том, что товар был найден
            dispatch(setProductFound(false))
        }

        // Если такого idInputObject - нет, добавляем его
        else {
            let newArray = [...checkedInputId, idInputObject]
            dispatch(setInputId(newArray))
        }

    }
}




// Проверка вариантов товаров - создаем массив id - которые нужно выключить
export const checkVariants = () => {




    return (dispatch, getState) => {

        // Массив уже нажатых id
        let checkedInputId = getState().cardProduct.checkedInputId
        // id существующих вариантов
        let idVariants = getState().cardProduct.idVariants

        //console.log (checkedInputId)
        //console.log (idVariants)


        // Уникальные варианты - по ним мы рисуем
        let unicVariant = getState().cardProduct.unicVariant

        // let oldArrayPossibleInputId = getState().cardProduct.arrayPossibleInputId


        // Если мы выключили все фильтры - значит они все должны быть включены
        if (checkedInputId.length === 0) {


            // Включим все доступные варианты
            unicVariant.forEach((item) => {
                // console.log (item)
                item.forEach((elem) => {
                    elem.disabled = false
                })
            })

            dispatch(setUnicVariant([]))
            dispatch(setUnicVariant(unicVariant))
        }


        // Если какие-то фильтры включены, то
        else {

            let array = []




            // Попробовать оттолкнуться от этого массива, по идее чем больше нажато инпутов - тем больше других я должен зачеркивать
            let newArrayPossibleInputId = []
            let arrayCheckedOptionId = []
            let allInputIdd = []




            idVariants.forEach(item => {

                // item - массив варианта
                // console.log(item)


                // Создадим новый объект без служебных объектов в конце
                let itemNotObject = []

                item.forEach(elem => {
                    if (elem.images === undefined) {
                        itemNotObject.push(elem)
                    }
                })


                // Массив нажатых id


                // Все существующие варианты
                // console.log(itemNotObject)
                // console.log (checkedInputId)



                itemNotObject.forEach(
                    elem => {
                        checkedInputId.forEach(unit => {

                            // Если valueId равно тому что мы передали
                            if (elem[0] === unit[0]) {
                                // console.log (itemNotObject)
                                array.push(itemNotObject)
                            }

                            // А в allInputIdd запушим все возможные варианты
                            allInputIdd.push(elem[0])

                        })
                    }
                )

                // Последнее id опции
                let lastClickOptionId = checkedInputId[checkedInputId.length - 1][1]


                // Старый массив разрешенных инпутов
                // console.log (oldArrayPossibleInputId)

                // Список возможных вариантов
                // console.log (array)


                // Получим список разрешенных инпут id
                array.forEach(item => {
                    item.forEach(elem => {
                        // console.log (elem)
                        newArrayPossibleInputId.push(elem[0])
                    })
                })
                newArrayPossibleInputId = removeStringDublicate(newArrayPossibleInputId)
                // Список разрешенных инпут id
                //console.log(newArrayPossibleInputId)




                // Список кликнутых id опций
                checkedInputId.forEach(
                    elem => {
                        arrayCheckedOptionId.push(elem[1])
                    }
                )
                arrayCheckedOptionId = removeStringDublicate(arrayCheckedOptionId)
                //console.log(arrayCheckedOptionId)




                let arrayInpitIdClickOptionId = []
                idVariants.forEach(i => {
                    i.forEach(e => {
                        // console.log (e)
                        if (e[1] === lastClickOptionId) {
                            arrayInpitIdClickOptionId.push(e[0])
                        }
                    })
                })
                arrayInpitIdClickOptionId = removeStringDublicate(arrayInpitIdClickOptionId)
                // Пока что мы получили только те инпуты, которые соответствуют тому input id - на который мы кликнули - соответственно их не нужно тоже блокировать
                //console.log(arrayInpitIdClickOptionId)




                // Соеденим 2 списка - и получим полный список разрешенных id
                newArrayPossibleInputId = [...newArrayPossibleInputId, ...arrayInpitIdClickOptionId]
                newArrayPossibleInputId = removeStringDublicate(newArrayPossibleInputId)
                //console.log (newArrayPossibleInputId)




                allInputIdd = removeStringDublicate(allInputIdd)
                // Список всех input id
                //console.log(allInputIdd)



                // Теперь попробуем подготовить список запрещенных input id
                let arrayDengerInputId = allInputIdd.filter((a) => newArrayPossibleInputId.indexOf(a) == -1)
                // Получим список - запрещенных input id - которые нужно выключить при нажатии на кнопку
                console.log(arrayDengerInputId)

                // let oldArrayDengerInputId = getState().cardProduct.arrayDengerInputId







                // Запишем возможные id и кликнутые варианты, и запрещенные варианты насовсем
                dispatch(arrayPossibleId(newArrayPossibleInputId, arrayCheckedOptionId, arrayDengerInputId))





                /* // Отсортируем массивы по возрастанию
                item = item.sort((a, b) => a - b)
                checkedInputId = checkedInputId.sort((a, b) => a - b)


                

                // Сравним их, предварительно переведя в строку
                // Если хоть где-то найдено четкое совпадение массивов - значит что все, вариант найден
                if (JSON.stringify(itemNotObject) === JSON.stringify(checkedInputId)) {
                    // Отключим все другие возможные варианты
                    // Покажем новую картинку, цену, кнопку купить, запишем сюда variant id товара

                    // Очистим idVariants - от служебных переменных
                    // dispatch(setIdVariants(idVariants))

                    //console.log(idVariants)

                    let idVariantsNotObject = []

                    idVariants.forEach(item => {
                        let itemNotObject = []
                        item.forEach(elem => {
                            if (typeof elem === 'number' || elem.images !== undefined) {
                                itemNotObject.push(elem)
                            }
                        })
                        idVariantsNotObject.push(itemNotObject)
                    })

                    dispatch(setIdVariants(idVariantsNotObject))

                    console.log('Вариант найден')
                    // console.log(item)

                    item.forEach(elem => {
                        if (elem.images !== undefined) {
                            // console.log (elem)
                            console.log(`Выбран товар - ${elem.name}, Цена - ${elem.price}`)
                        }
                    })


                    // console.log (checkedInputId)
                    // ЭТОТ КУСОК ПЕРЕДЕЛАТЬ
                    unicVariant.forEach((item) => {
                        // console.log (item)
                        item.forEach((elem) => {
                            // Если такой id у нас есть
                            if (checkedInputId.includes(elem.id)) {
                                elem.disabled = false
                            } else {
                                elem.disabled = true
                            }
                        })
                    })
                    // Запушем что товар - найден, чтобы условие далее не исполнялось
                    dispatch(setProductFound(true))
                    dispatch(setUnicVariant([]))
                    dispatch(setUnicVariant(unicVariant))


                } 
                
                else {

                    // Служебная переменная - если товар был найден - то далее его не ищем
                    const productFound = getState().cardProduct.productFound


                    if (productFound === false) {


                        // console.log('Вариант не найден')
                        // Массив нажатых id
                        //console.log(checkedInputId)

                        // массив существующих варинтов
                        //console.log(item)

                        let itemNotObject = []
                        item.forEach(elem => {
                            if (typeof elem === 'number') {
                                itemNotObject.push(elem)
                            }
                        })

                        // console.log(itemNotObject)



                        // Переберем массив нажатых id
                        checkedInputId.forEach(elem => {
                            // Если в существующем варианте - присутствует id - и в нашем массиве - весь вариант - он должен быть включен
                            if (item.includes(elem) && item[item.length - 1].status === true) {
                                unicVariantTrue.push(item)
                            }
                            // Если следующий вариант не соответствует, то удалим его (И также, так как в прошлом разе он не присутстовал - пометим его)
                            else {
                                item[item.length - 1].status = false
                                unicVariantTrue = unicVariantTrue.filter(e => e !== item)
                            }
                        })


                        // Удалим дубликаты
                        unicVariantTrue = removeDuplicates(unicVariantTrue)


                        // Удалим служебные объекты в конце
                        // Новый массив, только без служебных объектов
                        let unicVariantTrueNotObject = []
                        unicVariantTrue.forEach(elem => {
                            unicVariantTrueNotObject.push(elem.filter(unit => typeof unit === 'number'))
                        })


                        // Новый массив, только уже не с массивами, а просто со всеми значениями массивов
                        let unicVariantTrueAllId = []

                        unicVariantTrueNotObject.forEach(item => {
                            item.forEach(elem => {
                                unicVariantTrueAllId.push(elem)
                            })
                        })


                        unicVariantTrueAllId = removeStringDublicate(unicVariantTrueAllId)

                        // console.log (unicVariantTrueAllId)



                        // И наконец пометим, какие выключать, а какие включать инпуты
                        unicVariant.forEach((item) => {
                            // console.log (item)
                            item.forEach((elem) => {
                                //console.log (elem)
                                // Если такой элемент присутствует, то поле disabled пометим как true
                                if (unicVariantTrueAllId.includes(elem.id)) {
                                    elem.disabled = false
                                } else {
                                    elem.disabled = true
                                }
                            })
                        })


                        dispatch(setUnicVariant([]))
                        dispatch(setUnicVariant(unicVariant))




                    }


                } */


            })





        }


    }
}


// Рисуем новые инпуты
export const paintInput = () => {
    return (dispatch, getState) => {

        
        let arrayPossibleInputId2 = getState().cardProduct.arrayPossibleInputId
        let arrayCheckedOptionId2 = getState().cardProduct.arrayCheckedOptionId

        // Массив уже нажатых id
        let checkedInputId = getState().cardProduct.checkedInputId
        // Уникальные варианты - по ним мы рисуем
        let unicVariant = getState().cardProduct.unicVariant
        let arrayDengerInputId = getState().cardProduct.arrayDengerInputId


        
        if (checkedInputId.length !== 0) {

            let arrayDisabled = []

            unicVariant.forEach((item) => {
                item.forEach((elem) => {
                    if (arrayPossibleInputId2.includes(elem.id) || arrayCheckedOptionId2.includes(elem.optionId)) {

                    }
                    // Выключаем
                    else {
                        arrayDisabled.push(elem)
                    }
                })
            })


            // Массив выключенных вариантов
            arrayDisabled = removeDuplicates(arrayDisabled)
            // console.log (arrayDisabled)


            unicVariant.forEach((item) => {
                // console.log (item)
                item.forEach((elem) => {

                    // console.log (elem)
                    // arrayCheckedOptionId2 !!!!!!!!!!!!!
                    // Это условие важное, но не важнее чем первое

                    if (arrayPossibleInputId2.includes(elem.id) || arrayCheckedOptionId2.includes(elem.optionId)) {
                        // Включаем
                        arrayDisabled.forEach(i => {
                            // Только если он не был выключен
                            if (elem.id != i.id) {
                                elem.disabled = false
                            }
                        })



                    } else {
                        // Выключаем
                        elem.disabled = true
                    }
                })
            })



            unicVariant.forEach((item) => {
                // console.log (item)
                item.forEach((elem) => {
                    if (arrayDengerInputId.includes(elem.id)) {
                        // Выключаем
                        elem.disabled = true
                    }
                })
            })


            dispatch(setUnicVariant([]))
            dispatch(setUnicVariant(unicVariant))


        }

    }
}




// Получим карточку товара, возможные комбинации по id, и все возможные варианты для отрисовки наших инпутов
export const getProductSlug = (slug) => {
    return (dispatch) => {

        // Покажем лоадер
        dispatch(toggleIsFetching(true))

        initAPI.getProductSlug(slug)
            .then(response => {

                // Вариантов всего 9 (2 выключенных)
                //console.log (response.data.variants)

                let allOptions = []
                response.data.variants.forEach(item => {
                    // Если такой вариант товара у нас существует, то выведем его
                    if (item.status.code === 1) {

                        // Соберем данные об этом варианте в объект, который добавим в конец
                        let dataVariant = {}

                        dataVariant.images = item.images
                        dataVariant.name = item.name
                        dataVariant.price = item.price
                        dataVariant.quantity = item.quantity

                        dataVariant = [...item.options, dataVariant]

                        allOptions.push(dataVariant)
                    }
                })

                // Это у нас все существующие варианты товаров
                // console.log (allOptions)

                // Все id существующих вариантов [[1,2], [1,2,3]]
                let idVariants = []

                allOptions.forEach(item => {
                    // console.log (item)
                    idVariants.push([])
                })

                for (let i = 0; i < allOptions.length; i++) {
                    allOptions[i].forEach(elem => {
                        // console.log (elem)
                        // Если есть id - сделаем массив, где первое значение inputId, а второе - optionId
                        if (elem.id !== undefined) {
                            idVariants[i].push([elem.value.id, elem.id])
                        }
                        // Иначе зальем данные об этом варианте
                        else {
                            idVariants[i].push(elem)
                        }
                    })
                }

                // console.log (idVariants)
                dispatch(setIdVariants(idVariants))

                // Все варианты
                let allVariants = []
                // Массив в который запишем все возможные id вариантов товаров (1 - цвет, 2 - размер) и так далее
                let allId = []

                // console.log (allOptions)

                allOptions.forEach(item => {
                    //console.log (item)
                    item.forEach(elem => {
                        if (elem.id !== undefined) {
                            // console.log (elem)
                            allVariants.push(elem)
                            allId.push(elem.id)
                        }
                    })
                })

                let uniqueId = removeStringDublicate(allId)
                // Все уникальные id
                // console.log(uniqueId)

                // Объект с ключами, где каждый ключ, это 1 - цвет, 2 размер, 3 страна произоводитель и так далее, а значение - массив
                let bigData = {}
                // Создадим у него ключи с пустыми объектами
                uniqueId.forEach(elem => {
                    bigData[elem] = []
                })

                // console.log (allVariants)

                // Переберем все варианты, и запушим в наш главный объект все значения
                allVariants.forEach(item => {

                    uniqueId.forEach(elem => {

                        if (item.id === elem) {
                            // Пометим вариант с цветом, чтобы отрисовать сам цвет
                            if (item.type_name === 'Цвет') {
                                bigData[elem].push(item.value)
                                item.value.color = true
                                item.value.optionId = item.id
                                item.value.disabled = false
                                // Удалим дубликаты
                                bigData[elem] = removeDuplicates(bigData[elem])
                            } else {
                                bigData[elem].push(item.value)
                                item.value.color = false
                                item.value.optionId = item.id
                                item.value.disabled = false

                                // Удалим дубликаты
                                bigData[elem] = removeDuplicates(bigData[elem])
                            }

                        }

                    })


                })

                // console.log (bigData)

                // Преобразуем массив в объект
                bigData = Object.values(bigData)

                // Выведем данный объект в консоль
                // console.log (bigData)
                dispatch(setUnicVariant(bigData))
                dispatch(setProductSlug(response.data))
                // Выключим лоадер
                dispatch(toggleIsFetching(false))

            })
    }
}




export default cardProductReducer