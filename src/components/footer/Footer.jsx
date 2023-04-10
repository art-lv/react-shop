import style from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { faHouse, faMapLocation, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const Footer = (props) => {


    // Количество товаров в корзине
    const quantityProduct = useSelector(state => state.cart.cartProductData.length)


    return (
        <div className='footer'>

            <NavLink to="/">
                <FontAwesomeIcon className='icon' icon={faHouse} />
            </NavLink>

            <NavLink to="/category">
                <FontAwesomeIcon className='icon' icon={faBasketShopping} />
            </NavLink>


            <NavLink to="/cart" className="position-relative">
                {
                    quantityProduct !== 0 ?
                        <div className='quantityProduct'>{quantityProduct}</div> :
                        null
                }
                
                <FontAwesomeIcon className='icon' icon={faCartShopping} />
            </NavLink>


        </div>
    )
}

export default Footer