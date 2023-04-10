/* //получаем объект webapp телеграма 
let tg = window.Telegram.WebApp 

const test = () => {
    telegram.MainButton.text = "Оплатить"
    telegram.MainButton.show()
    telegram.MainButton.color = "#ccc"
}

<button onClick={() => test()}>Нажми на меня</button>
//изменяем цвет текста кнопки
tg.MainButton.textColor = "#F55353" 

// метод при нажатии на кнопку
tg.MainButton.onClick(callback) 

// Кнопка назад
var BackButton = WebApp.BackButton
BackButton.show() */


import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import CategoryContainer from "./pages/category/CategoryContainer"
import CatalogContainer from "./pages/catalog/CatalogContainer"
import Main from "./pages/main/Main"
import HeaderContainer from './components/header/HeaderContainer'
import FooterContainer from './components/footer/FooterContainer'
import CardProductContainer from './pages/cardProduct/CardProductContainer'
import CheckoutContainer from './pages/checkout/CheckoutContainer'
import { useEffect, useState } from "react"
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CartContainer from "./pages/cart/CartContainer"
import {
    getProductCart
} from "./redux/cart-reducer"
import { useDispatch } from 'react-redux'


const App = () => {


    const dispatch = useDispatch()


    useEffect(() => {
        // Запросим товары - чтобы изменилось кол-во в футере корзины
        dispatch(getProductCart())
    }, [])


    const telegram = window.Telegram.WebApp


    // Данная функция открываем приложение - сразу на все окно телеграма (Вместо половины по дефолту)
    telegram.expand()

    // Условие - нужно только телеграма, чтобы при первом заходе на главную - мы попали именно на главную
    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(true)
    useEffect(() => {
        if (redirect) {
            setRedirect(false)
            navigate('/')
        }
    }, [redirect])



    return (
        <div className="inner">
            <HeaderContainer />

            {/* <Routing /> */}

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/category" element={<CategoryContainer />} />
                <Route path="/category/:slug" element={<CatalogContainer />} />
                <Route path="/product/:slug" element={<CardProductContainer />} />
                <Route path="/cart" element={<CartContainer />} />
                <Route path="/checkout" element={<CheckoutContainer />} />
            </Routes>


            <FooterContainer />
        </div>
    )

}

// Роутинг с анимацией
/* function Routing() {
    const location = useLocation()

    const [displayLocation, setDisplayLocation] = useState(location)
    const [transitionStage, setTransistionStage] = useState("fadeIn")

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut")
    }, [location, displayLocation])

    return (
        <div
            className={`${transitionStage}`}
            onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                    setTransistionStage("fadeIn")
                    setDisplayLocation(location)
                }
            }}
        >
            <Routes location={displayLocation}>
                <Route path="/" element={<Main />} />
                <Route path="/category" element={<CategoryContainer />} />
                <Route path="/category/catalog/" element={<CatalogContainer />} />
                <Route path="/category/catalog/product/:slug" element={<CardProductContainer />} />
            </Routes>
        </div>
    )
} */

export default App
