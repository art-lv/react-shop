import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'



const Checkout = (props) => {

    /* //получаем объект webapp телеграма 
    let tg = window.Telegram.WebApp
    // Кнопка назад
    var BackButton = tg.BackButton
    BackButton.show()
    // метод при нажатии на кнопку
    // tg.BackButton.onClick(back)
    tg.onEvent('backButtonClicked', () => {
        navigate('/checkout')
    })
    const back = () => {
        navigate('/checkout')
    } */

    // Удалим ошибки, если они были (Например при повтором открытии чекаута)
    useEffect(() => {
        props.errors.forEach((item) => {
            setError(item.field)
        })
    }, [props])

    const navigate = useNavigate()


    // Реакт хук форма
    const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm()



    const sendForm = (data) => {
        props.sendCheckoutData(data)
    }


    const [deliveryVisibilitye, setDeliveryVisibilitye] = useState(false)
    // Функция проверяющая, выбран ли пункт доставка, если он выбран, то нужно показать пользователю поля - адрес доставки
    const checkChecked = (e) => {
        if (e.target.value === "1") {
            setDeliveryVisibilitye(true)
        }
        else {
            setDeliveryVisibilitye(false)
        }
    }



    // Значение города
    const [city, setCity] = useState({ value: '' })
    // Засетаем новое значение города, когда выберем его
    useEffect(() => {
        setValue('customer_city', city.value)
    }, [city])


    // Каждый раз, когда приходят новые ошибки - выведем их
    useEffect(() => {
        // Переберем массив ошибок из пропсов - и выведем их на экран
        props.errors.forEach((item) => {
            setError(item.field, { message: item.message })
        })
    }, [props.errors])


    


    // Если пользователь хочет сделать еще один заказ
    const newOrder = () => {
        props.newOrder()
        navigate('/category')
    }


    return (
        <div className="inner-page">



            <div onClick={() => navigate(-1)} className="button-back">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>



            {
                props.order === '' ?

                    <form className='page-order mt-3' onSubmit={handleSubmit(sendForm)}>

                        <h3 className="page-title">Кто получит заказ?</h3>
                        <div className="mb-3">
                            <label className="form-label">ФИО*</label>
                            <input className="form-control" {...register('customer_first_name')} />
                            {errors.customer_first_name && <span className='error-message'>{errors.customer_first_name.message}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Телефон*</label>
                            <input className="form-control" {...register('customer_phone')} />
                            {errors.customer_phone && <span className='error-message'>{errors.customer_phone.message}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">E-mail*</label>
                            <input className="form-control" {...register('customer_email')} />
                            {errors.customer_email && <span className='error-message'>{errors.customer_email.message}</span>}
                        </div>



                        <h3 className="page-title">Как вам удобно получить заказ?</h3>


                        {/* Способы доставки */}
                        <div className='custom-radio-container'>
                            {
                                props.delivery.map(item => {
                                    return (
                                        <label className='custom-radio' key={item.id}>
                                            <input className="custom-radio-input" type="radio" {...register('delivery_method_id')} value={item.id} onClick={(e) => { checkChecked(e) }} />
                                            <div className="custom-radio-name">
                                                {item.label}
                                            </div>
                                        </label>
                                    )
                                })
                            }
                        </div>



                        {errors.delivery_method_id && <span className='error-message'>{errors.delivery_method_id.message}</span>}



                        {/* Если выбран вариант доставка по адресу, нужно чтобы пользователь написал еще и свой адрес */}
                        {
                            deliveryVisibilitye &&
                            <div>
                                <div className="mb-3 mt-3">
                                    <label className="form-label">Город*</label>
                                    {/* <AddressSuggestions token="2ea5c8734f9c03caabd6f934e642c706b29be35e" value={city} onChange={setCity} /> */}
                                    {/* <input type="text" className='d-none' {...register('customer_city')} /> */}

                                    <input className="form-control" {...register('customer_city')} />
                                    {errors.customer_city && <span className='error-message'>{errors.customer_city.message}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Адрес*</label>
                                    <input className="form-control" {...register('customer_street')} />
                                    {errors.customer_street && <span className='error-message'>{errors.customer_street.message}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Дом*</label>
                                    <input className="form-control" {...register('customer_house')} />
                                    {errors.customer_house && <span className='error-message'>{errors.customer_house.message}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Этаж</label>
                                    <input className="form-control" {...register('customer_floor')} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Кв. / оф.</label>
                                    <input className="form-control" {...register('customer_apartment')} />
                                </div>
                            </div>
                        }


                        <h3 className="page-title">Как вам удобно оплатить заказ?</h3>




                        <div className='custom-radio-container'>
                            {/* Способы оплаты */}
                            {
                                props.payment.map(item => {
                                    return (
                                        <label className="custom-radio" key={item.id}>
                                            <input className="custom-radio-input" type="radio" {...register('payment_method_id')} value={item.id} />
                                            <div className="custom-radio-name">
                                                {item.label}
                                            </div>
                                        </label>
                                    )
                                })
                            }
                        </div>




                        {errors.payment_method_id && <span className='error-message'>{errors.payment_method_id.message}</span>}


                        <div className="mb-3">
                            <h3 className="page-title">Комментарий к заказу</h3>
                            <textarea className="form-control" {...register('comment')}></textarea>
                        </div>

                        <button type="submit" disabled={props.disabledButton} className="order-button">Оформить</button>

                    </form> :

                    <div>
                        <div className='order-success mt-3'>
                            Заказ успешно оформлен <br />
                            Ваш номер заказа {props.order.id}<br />
                            Ваша стоимость доставки {props.order.delivery_cost} ₽
                        </div>
                        <div className='new-order' onClick={() => newOrder()}>Хотите сделать еще один заказ?</div>
                    </div>

            }







        </div>
    )
}

export default Checkout