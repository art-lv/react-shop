import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, NavLink } from 'react-router-dom'


const Cart = (props) => {


    /* //получаем объект webapp телеграма 
    let telegram = window.Telegram.WebApp
    telegram.MainButton.text = "Оплатить"
    telegram.MainButton.show()
    telegram.MainButton.color = "#ccc"
    telegram.MainButton.textColor = "#F55353"


    telegram.MainButton.onClick(testClicked)

    const testClicked = () => {
        alert('hello world')
    } */












    const navigate = useNavigate()

    const deleteBasket = () => {
        props.deleteAllCart()
    }

    const deleteProduct = (id) => {
        props.deleteProduct(id)
    }

    const changeQuantity = (id, e) => {
        // console.log (Number(e.target.value))
        // console.log (id)
        props.changeQuantity(id, Number(e.target.value))
    }

    const goToCheckout = () => {
        navigate('/checkout')
    }



    return (
        <div className="inner-page">




            <div onClick={() => navigate(-1)} className="button-back">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>



            {props.cartProductData.length !== 0 && <button onClick={() => { deleteBasket() }} className="delete-all-basket">Очистить корзину</button>}



            {props.cartProductData.length === 0 &&
                <div>
                    {/* <div className='not-found'>Корзина пустая</div> */}
                    <NavLink className='not-found-cart' to="/category">
                        Корзина сейчас пустая, хотите что-нибудь выбрать?
                    </NavLink>
                </div>
            }

            <div className='cart-container'>
                {
                    props.cartProductData.map(item => {
                        // console.log (item)
                        return (
                            <div key={item.id} className="cart-block">


                                <div className="cart-block-img">
                                    <img height="200px" src={
                                        item.variant.images !== undefined && item.variant.images[0] !== undefined ?
                                            item.variant.images[0]['130x140'] :
                                            "https://test11.itepro.ru/static/origin/variant/61/6401d845c3a597.jpg"
                                    } alt="" />
                                </div>


                                <div className='card-block-information'>
                                    {/* <div>{item.product.name}</div> */}
                                    <div className='cart-block-name'>{item.variant.name}</div>
                                    <div className='cart-block-quantity'>Количество {item.quantity}</div>
                                    <button className='cart-block-delete' onClick={() => { deleteProduct(item.id) }}>Удалить из корзины</button>
                                </div>


                                <div className='card-block-price-quantity'>
                                    <div className='cart-block-price'>{item.price} руб / шт.</div>
                                    <input className='cart-block-choose-quantity' min={item.variant.min_quantity} max={item.variant.quantity} defaultValue={item.quantity} type="number" onChange={(e) => { changeQuantity(item.id, e) }} />
                                    <div className='error-message'>
                                        {item.errors.quantity}
                                    </div>
                                    {/* <button className='btn btn-success'>Изменить кол-во</button> */}
                                </div>








                            </div>
                        )
                    })
                }
            </div>




            <div className='cart-all-price'>
                <div>Общая стоимость:</div>
                <div>{props.allPrice} ₽</div>
            </div>


            <button onClick={() => { goToCheckout() }} className='cart-button' disabled={
                props.errors.length === 0 && props.cartProductData.length !== 0 ? false : true
            }>Перейти к оформлению</button>



        </div>
    )

}

export default Cart