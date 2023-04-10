import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import catalogReducer from './catalog-reducer'
import cardProductReducer from './cardProduct-reducer'
import categoryReducer from './category-reduser'
import cartReducer from './cart-reducer'
import checkoutReducer from './checkout-reduser'

let reducers = combineReducers({
    catalog: catalogReducer,
    cardProduct: cardProductReducer,
    category: categoryReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store
export default store