import initAPI from "../api/api"
import {
    toast
} from "react-toastify"
import {
    getProductCart
} from "./cart-reducer"


const SET_ERROR = 'SET_ERROR'
const SET_ORDER = 'SET_ORDER'
const SET_ALL_PAYMENT = 'SET_ALL_PAYMENT'
const SET_ALL_DELIVERY = 'SET_ALL_DELIVERY'
const SET_DISABLED_BUTTON = 'SET_DISABLED_BUTTON'


let initialState = {
    errors: [],
    order: '',
    payment: [],
    delivery: [],
    disabledButton: false
}


const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ORDER: {
            return {
                ...state,
                order: action.order
            }
        }

        case SET_ERROR: {
            return {
                ...state,
                errors: action.error
            }
        }

        case SET_ALL_PAYMENT: {
            return {
                ...state,
                payment: action.payment
            }
        }

        case SET_ALL_DELIVERY: {
            return {
                ...state,
                delivery: action.delivery
            }
        }

        case SET_DISABLED_BUTTON: {
            return {
                ...state,
                disabledButton: action.disable
            }
        }

        default: {
            return state
        }
    }
}

// Засетаем данные об успешном заказе в корзину
export let setOrder = (order) => ({
    type: SET_ORDER,
    order
})

// Засетаем все товары в корзину
export let setError = (error) => ({
    type: SET_ERROR,
    error
})

let setAllPayment = (payment) => ({
    type: SET_ALL_PAYMENT,
    payment
})

let setAllDelivery = (delivery) => ({
    type: SET_ALL_DELIVERY,
    delivery
})

let setDisabledButton = (disable) => ({
    type: SET_DISABLED_BUTTON,
    disable
})

// Получить все товары в корзине
export const sendCheckoutData = (data) => {
    return (dispatch) => {

        // заблокируем кнопку, чтобы нельзя было сделать 2 заказа
        dispatch(setDisabledButton(true))


        initAPI.sendCheckoutData(data)
            .then(response => {
                //console.log(response.data)
                dispatch(setOrder(response.data.order))
                // Через секунду запросим товары
                setTimeout(
                    () => {
                        // Запросим товары - чтобы изменилось кол-во в футере корзины
                        dispatch(getProductCart())
                    }, 500
                )
                dispatch(setDisabledButton(false))
            })
            .catch((error) => {
                // Если у нас непридвиденная ошибка - нужно сообщить об этом пользователю
                if (error.response.statusText === 'Bad Request') {
                    alert(error.response.data.message)
                }
                // Если ошибки в полях - запишем их
                if (error.response.status === 422) {
                    dispatch(setError(error.response.data))
                }
                dispatch(setDisabledButton(false))
            })
    }
}

// Пользователь хочет сделать еще один заказ
export const newOrder = () => {
    return (dispatch) => {
        // Сбросим текущий заказ
        dispatch(setOrder(''))
    }
}



// Получим все методы оплаты
export const getCheckoutPayment = () => {
    return (dispatch) => {
        initAPI.getCheckoutPayment()
            .then(response => {
                // console.log (response.data)
                dispatch(setAllPayment(response.data))
            })
    }
}

// Получим все методы доставки
export const getCheckoutDelivery = () => {
    return (dispatch) => {
        initAPI.getCheckoutDelivery()
            .then(response => {
                // console.log (response.data)
                dispatch(setAllDelivery(response.data))
            })
    }
}


export default checkoutReducer