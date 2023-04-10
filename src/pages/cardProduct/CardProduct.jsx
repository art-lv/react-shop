import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import style from './CardProduct.module.css'
import Preloader from '../../components/preloader/preloader'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"



const CardProduct = (props) => {


    // Удалим ошибки, если они были
    useEffect(() => {
        clearErrors('quantity')
    }, [props])



    const navigate = useNavigate()

    let { slug } = useParams()

    const checkVariants = (optionId, inputId) => {
        props.sendRadioId(slug, optionId, inputId)
    }


    // Реакт хук форма
    const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm()

    const sendForm = (data) => {
        // console.log (data)
        props.addCartProductVariant(data)
    }

    useEffect(() => {
        // Засетаем новое значение вариант id товара, когда оно придет
        setValue('inputId', props.productSlugVariant.id)
    }, [props.productSlugVariant])


    // Каждый раз, когда приходят новые ошибки - выведем их
    useEffect(() => {
        setError('quantity', { message: props.errorCardProduct.message })
    }, [props.errorCardProduct])





    return (


        <div className={style.cardProduct}>


            {/* Пока грузим данные о карточке - покажем загрузку */}
            {props.isFetching ? <Preloader /> : null}


            <div onClick={() => navigate(-1)} className="button-back">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <div className='card-product-image'>
                {/* Если есть какой-либо выбранный вариант - покажем его, иначе покажем дефолтную картинку */}
                {
                    props.productSlugVariant.id === undefined ?
                        <img height="200px" src={props.productDataSlug.images !== undefined && props.productDataSlug.images[0] !== undefined ?
                            props.productDataSlug.images[0]['130x140'] :
                            "https://test11.itepro.ru/static/origin/variant/61/6401d845c3a597.jpg"} alt="" /> :
                        <img height="200px" src={props.productSlugVariant.images !== undefined && props.productSlugVariant.images[0] !== undefined ?
                            props.productSlugVariant.images[0]['130x140'] :
                            "https://test11.itepro.ru/static/origin/variant/61/6401d845c3a597.jpg"} alt="" />
                }
            </div>

            <div className='card-product-information'>

                {
                    props.unicVariant.map((item) => {

                        if (item[1].type_id === 2) {
                            return (
                                <div className='radio-button-container' key={item[1].label}>
                                    {Object.values(item[1].values).map(elem => {

                                        //console.log (elem)

                                        return (
                                            <label key={elem.id} className="product_color-checkbox">
                                                <input
                                                    disabled={elem.disabled}
                                                    checked={elem.checked}
                                                    id={elem.id}
                                                    onChange={() => (checkVariants(elem.optionId, elem.id))}
                                                    name={elem.optionId}
                                                    type="checkbox" />
                                                <span style={{ backgroundColor: elem.value }}></span>
                                            </label>
                                        )
                                    })}
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className='radio-button-container' key={item[1].label}>
                                    {Object.values(item[1].values).map(elem => {
                                        return (
                                            <label key={elem.id} className="product_size-checkbox">
                                                <input
                                                    disabled={elem.disabled}
                                                    checked={elem.checked}
                                                    id={elem.id}
                                                    onChange={() => (checkVariants(elem.optionId, elem.id))}
                                                    name={elem.optionId}
                                                    type="checkbox" />
                                                <span>{elem.value}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                            )
                        }


                    })
                }




                {/* Если есть какой-либо выбранный вариант - покажем его, иначе покажем дефолтную информацию о товаре */}
                {
                    props.productSlugVariant.id === undefined ?
                        <div>
                            <h1 className='mt-4'>{props.productDataSlug.name}</h1>
                            <div className='mt-3'>{props.productDataSlug.short_description}</div>
                        </div>
                        :
                        <form onSubmit={handleSubmit(sendForm)}>
                            <h1 className='mt-4'>{props.productSlugVariant.name}</h1>
                            <div className='mt-3'>{props.productSlugVariant.short_description}</div>
                            <div className='mt-2'>Товаров осталось: {props.productSlugVariant.quantity}</div>
                            <div className='card-product-price mt-3'>{props.productSlugVariant.price} руб. / шт.</div>
                            <input type="number" defaultValue={props.productSlugVariant.min_quantity} {...register('quantity')} /* min={props.productSlugVariant.min_quantity} max={props.productSlugVariant.quantity} */ className='card-product-quantity form-control mt-3' placeholder='Кол-во' />
                            {errors.quantity && <div className='error-message'>{errors.quantity.message}</div>}
                            {/* Скрытый инпут с вариантом id */}
                            <input type="text" className='d-none' {...register('inputId')} />

                            <button type="submit" className="button-card-product mt-3">Купить</button>
                        </form>
                }


            </div>



        </div>
    )
}

export default CardProduct