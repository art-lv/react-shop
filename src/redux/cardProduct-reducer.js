import {
    useParams
} from "react-router-dom"
import initAPI from "../api/api"
import {
    toast
} from "react-toastify"
import {
    getProductCart
} from "./cart-reducer"

const SET_PRODUCT_SLUG = 'SET_PRODUCT_SLUG'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_UNIC_VARIANT = 'SET_UNIC_VARIANT'
const SET_SELECTION_OPTION = 'SET_SELECTION_OPTION'
const SET_PRODUCT_SLUG_VARIANT = 'SET_PRODUCT_SLUG_VARIANT'
const SET_ERROR_CARD_PRODUCT = 'SET_ERROR_CARD_PRODUCT'


let initialState = {
    productDataSlug: {},
    productSlugVariant: {},
    unicVariant: [],
    isFetching: false,
    selectionOption: [],
    errorCardProduct: []
}

const cardProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PRODUCT_SLUG: {
            return {
                ...state,
                productDataSlug: action.productDataSlug
            }
        }

        case SET_PRODUCT_SLUG_VARIANT: {
            return {
                ...state,
                productSlugVariant: action.productSlugVariant
            }
        }

        case SET_UNIC_VARIANT: {
            return {
                ...state,
                unicVariant: action.unicVariant
            }
        }

        // Переключаем loader с false на true во время загрузки и наоборот
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case SET_SELECTION_OPTION: {
            return {
                ...state,
                selectionOption: action.selectionOption
            }
        }

        case SET_ERROR_CARD_PRODUCT: {
            return {
                ...state,
                errorCardProduct: action.error
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

export let setProductSlugVariant = (productSlugVariant) => ({
    type: SET_PRODUCT_SLUG_VARIANT,
    productSlugVariant
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

// Запись или удаление выбранных инпутов
export let setSelectedOption = (selectionOption) => ({
    type: SET_SELECTION_OPTION,
    selectionOption
})


let setErrorCardProduct = (error) => ({
    type: SET_ERROR_CARD_PRODUCT,
    error
})






// Получим карточку товара, возможные комбинации по id, и все возможные варианты для отрисовки наших инпутов
export const getProductSlug = (slug) => {
    return (dispatch) => {
        // Покажем лоадер
        dispatch(toggleIsFetching(true))
        initAPI.getProductSlug(slug)
            .then(response => {
                let data = Object.entries(response.data.options)
                data.forEach(item => {
                    // console.log (item[0])
                    Object.values(item[1].values).forEach(elem => {
                        elem.optionId = item[0]
                    })
                })
                // console.log (data)
                dispatch(setUnicVariant(data))
                dispatch(setProductSlug(response.data))
                dispatch(toggleIsFetching(false))
            })
    }
}

// Удалить объект в массиве
const deleteObjectToArray = (array, object) => {
    array = Object.values(array)
    object = Object.values([object])
    array = array.filter(elem => JSON.stringify(elem) !== JSON.stringify(object[0]))
    return array
}

// Отправить id radio кнопок
export const sendRadioId = (slug, optionId, inputId) => {
    return (dispatch, getState) => {


        let oldSelectionOption = getState().cardProduct.selectionOption
        //console.log (oldSelectionOption)

        let notDublicate = true

        oldSelectionOption.forEach(item => {
            Object.values(item).forEach(elem => {


                // Если такой id уже был - нужно убрать его из списка
                if (elem === inputId) {

                    notDublicate = false

                    oldSelectionOption = deleteObjectToArray(oldSelectionOption, item)
                    // console.log(oldSelectionOption)

                    // Запишем в store
                    dispatch(setSelectedOption(oldSelectionOption))

                    let data = {
                        values: {}
                    }


                    // Создаем нужный нам объект для отправки на сервер
                    oldSelectionOption.forEach(item => {
                        data.values[Object.entries(item)[0][0]] = Object.entries(item)[0][1]
                    })

                    // console.log (data)

                    //dispatch(toggleIsFetching(true))

                    initAPI.sendRadioId(slug, data)
                        .then(response => {
                            let data = Object.entries(response.data.options)
                            data.forEach(item => {
                                Object.values(item[1].values).forEach(elem => {
                                    elem.optionId = item[0]
                                })
                            })
                            //dispatch(toggleIsFetching(false))
                            dispatch(setUnicVariant(data))

                            // Если нет такого варианта товара - удалим его (Отрисуется дефолтный вариант)
                            if (response.data.variant === null) {
                                dispatch(setProductSlugVariant({}))
                            }

                        })



                }
            })
        })



        // Если такой чекбокс не нажимали - добавим его
        if (notDublicate) {



            // Если это не первый выбранный инпут
            if (oldSelectionOption.length !== 0) {
                // Если мы нажимали уже на этот input id удалим его
                oldSelectionOption.forEach(item => {
                    Object.keys(item).forEach(elem => {
                        // Если такой id уже был - нужно убрать его из списка
                        if (elem === optionId) {
                            oldSelectionOption = deleteObjectToArray(oldSelectionOption, item)
                        }
                    })
                })
            }


            let selectionOption = [{
                [optionId]: inputId
            }]


            // Совместим старые и новые
            let allSelectionOption = [...oldSelectionOption, ...selectionOption]
            // console.log(allSelectionOption)


            dispatch(setSelectedOption(allSelectionOption))


            let data = {
                values: {}
            }

            // Создаем нужный нам объект для отправки на сервер
            allSelectionOption.forEach(item => {
                data.values[Object.entries(item)[0][0]] = Object.entries(item)[0][1]
            })


            // dispatch(toggleIsFetching(true))

            initAPI.sendRadioId(slug, data)
                .then(response => {
                    let data = Object.entries(response.data.options)
                    data.forEach(item => {
                        Object.values(item[1].values).forEach(elem => {
                            elem.optionId = item[0]
                        })
                    })


                    // console.log (response.data.variant)


                    // Если при выбранных инпутах есть какой-либо вариант запишем его в store
                    if (response.data.variant !== null) {
                        // Если вариант нашелся - подгрузим данные о нем
                        dispatch(setProductSlugVariant(response.data.variant))
                    }



                    // dispatch(toggleIsFetching(false))
                    dispatch(setUnicVariant(data))
                })
        }




    }
}

// Отправим в корзину выбранный вариант товара
export const addCartProductVariant = (data) => {
    return (dispatch) => {

        // console.log (data)






        let id = data.inputId

        let dataQuantity = {
            quantity: data.quantity
        }

        // console.log (id, typeof id)
        // console.log (dataQuantity, typeof dataQuantity)

        initAPI.sendProductVariant(id, dataQuantity)
            .then(response => {
                // console.log(response)
                const notify = () => toast.success('Товар добавлен в корзину')
                notify()

                // Через секунду запросим товары
                setTimeout(
                    () => { 
                        // Запросим товары - чтобы изменилось кол-во в футере корзины
                        dispatch(getProductCart())
                    }, 500
                )


            })
            .catch((error) => {
                // Запишем в store - массив данных с ошибками
                // console.log (error.response.data)
                dispatch(setErrorCardProduct(error.response.data))
            })





    }
}







export default cardProductReducer