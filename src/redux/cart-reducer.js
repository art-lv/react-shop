import initAPI from "../api/api"
import {
    toast
} from "react-toastify"
const SET_PRODUCT_CART = 'SET_PRODUCT_CART'
const SET_CART_ALL_PRICE = 'SET_CART_ALL_PRICE'
const SET_CART_ERRORS = 'SET_CART_ERRORS'


let initialState = {
    cartProductData: [],
    allPrice: 0,
    errors: []
}




let data = {
    "cost": {
        "origin": 1472
    },
    "items": [{
            "id": 2,
            "quantity": 7,
            "price": 162,
            "cost": 1134,
            "errors": {},
            "product": {
                "id": 1,
                "code": "",
                "name": "Товар из json файла 1",
                "slug": "tovar-1",
                "images": [{
                    "130x140": "https://test11.itepro.ru/static/origin/variant/1/6401d7afe7c733.jpg"
                }]
            },
            "variant": {
                "id": 2,
                "code": "",
                "name": "Шапка Красная шапка",
                "slug": "tovar-1-0",
                "quantity": 10,
                "min_quantity": 1,
                "images": [{
                    "130x140": "https://test11.itepro.ru/static/origin/variant/2/3.jpg"
                }]
            }
        },
        {
            "id": 9,
            "quantity": 1,
            "price": 162,
            "cost": 162,
            "errors": [],
            "product": {
                "id": 1,
                "code": "",
                "name": "Товар из json файла 2",
                "slug": "tovar-1",
                "images": [{
                    "130x140": "https://test11.itepro.ru/static/origin/variant/1/6401d7afe7c733.jpg"
                }]
            },
            "variant": {
                "id": 9,
                "code": "",
                "name": "Шапка Товар 1 7",
                "slug": "tovar-1-7",
                "quantity": 10,
                "min_quantity": 1,
                "images": []
            }
        },
    ],
    "errors": []
}



const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PRODUCT_CART: {
            return {
                ...state,
                cartProductData: action.cartProductData
            }
        }

        case SET_CART_ALL_PRICE: {
            return {
                ...state,
                allPrice: action.price
            }
        }

        case SET_CART_ERRORS: {
            return {
                ...state,
                errors: action.errors
            }
        }

        default: {
            return state
        }
    }
}

// Засетаем все товары в корзину
export let setProductCart = (cartProductData) => ({
    type: SET_PRODUCT_CART,
    cartProductData
})


let setCartAllPrice = (price) => ({
    type: SET_CART_ALL_PRICE,
    price
})

let setCartErrors = (errors) => ({
    type: SET_CART_ERRORS,
    errors
})




// Получить все товары в корзине
export const getProductCart = () => {
    return (dispatch) => {
        initAPI.getCart()
            .then(response => {

                /* if (response.data.items.length === 0) {
                    // Запишем общую цену корзины
                    dispatch(setCartAllPrice(data.cost.origin))
                    dispatch(setCartErrors(Object.values(data.errors)))
                    dispatch(setProductCart(data.items))
                    console.log('Подставили свои')
                }
                else {
                    // console.log (response.data)
                    // Запишем общую цену корзины
                    dispatch(setCartAllPrice(response.data.cost.origin))
                    dispatch(setCartErrors(Object.values(response.data.errors)))
                    dispatch(setProductCart(Object.values(response.data.items)))
                    console.log('Взяли из кук')
                } */

                // Если товары есть - запишем их
                if (response.data.items.length !== 0) {
                    dispatch(setCartAllPrice(response.data.cost.origin))
                    dispatch(setCartErrors(Object.values(response.data.errors)))
                    dispatch(setProductCart(Object.values(response.data.items)))
                }
                // Иначе - корзину нужно очистить
                else {
                    dispatch(setCartAllPrice(0))
                    dispatch(setCartErrors([]))
                    dispatch(setProductCart([]))
                }
                
            })
    }
}

// Удалить всю корзину
export const deleteAllCart = () => {
    return (dispatch) => {
        initAPI.deleteCart()
            .then(response => {

                // Получим новую корзину
                dispatch(getProductCart())

                const notify = () => toast.success('Корзина очищена')
                notify()
            })
    }
}

// Удалить 1 товар из корзины
export const deleteProduct = (id) => {
    return (dispatch) => {
        // console.log('удалили ' + id)
        initAPI.deleteProduct(id)
            .then(response => {
                // console.log(response)
                // Получим новую корзину
                dispatch(getProductCart())

                const notify = () => toast.success('Товар удален')
                notify()
            })
    }
}

// Изменить кол-во товара
export const changeQuantity = (id, quantity) => {
    return (dispatch) => {
        // console.log('Изменяем количество у ' + id)
        let data = {
            items: {
                [id]: {
                    quantity: quantity
                }
            }
        }
        //console.log (data)
        initAPI.changeQuantity(data)
            .then(response => {
                // console.log(response)
                // Получим новую корзину
                dispatch(getProductCart())
            })

    }
}



export default cartReducer