import { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { NavLink, useNavigate } from "react-router-dom"
import style from './Catalog.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import Preloader from "../../components/preloader/preloader"
import { useForm } from "react-hook-form"


const Catalog = (props) => {





    // Функция сортировки каталога, запрашиваем всегда первую страницу
    // Сортировку необходимо записать в store
    const sortCatalog = (e) => {
        props.setSort(e.target.value)
        props.getCatalogSorting(props.slug, e.target.value, 1, props.filter)
    }


    const navigate = useNavigate()






    const [request, setRequest] = useState(true)


    // Скролл вниз
    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <= 0.7) {
            nextPage()
            //alert(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight))
        }

        /* // Общая высота страницы всей страницы
        console.log (e.target.documentElement.scrollHeight)
        // Текущее положение скролла от верха страницы (Сколько проскролили)
        console.log (e.target.documentElement.scrollTop)
        // Высота видимой области (Браузера)
        console.log (window.innerHeight) */
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [props])

    // Функция - которая отдаст нам следующую страницу
    const nextPage = () => {


        // Это условие нужно - чтобы при скролле вниз, запрос срабатывал 1 раз, а не сразу несколько
        if (request) {
            setRequest(false)
            // Изменим состояние на + 1
            props.setCurrentPage()
            // Получим пользователей со следующей страницы
            props.getCatalog(props.slug, props.sort, props.currentPage + 1, props.filter)
        }
        // props.setComeback(true)
    }

    // Когда приходят новые пропсы - значит можно загружать новые страницы
    useEffect(() => {
        setRequest(true)
    }, [props])







    /* // Скролл вверх
    const scrollHandlerTop = (e) => {
        if (e.target.documentElement.scrollTop <= 3000) {
            comebackCatalog()
            props.setComeback(false)
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandlerTop)
        return () => {
            document.removeEventListener('scroll', scrollHandlerTop)
        }
    }, [props.isComeback])


    // Функция - которая вернем нам удаленные ранее товары
    const comebackCatalog = () => {
        if (props.isComeback) {
            
            setTimeout(
                () => {
                    console.log('Вернули')
                    props.comebackCatalog()
                }, 1000
            )
        }
    } */


    const [text, setText] = useState('')


    // Функция поиска по каталогу
    const search = (text) => {
        props.getSearchCatalog(text)
    }




    // Реакт хук форма
    const { register, handleSubmit } = useForm()





    const sendForm = (data) => {
        // Теперь нам нужно собрать все данные со всех фильтров - преобразовать в строку - и сделать запрос на сервак с этими данными


        // console.log(data)
        props.sendPrice(data.price_from, data.price_to)

        let dataFilters = []



        if (data.filter !== undefined) {

            if (data.filter.category !== false && data.filter.category !== undefined) {
                // Если фильтр у нас - один, он будет строкой - запушим его значение сразу
                if (typeof data.filter.category === 'string') {
                    dataFilters.push(`filter[category][]=${data.filter.category}`)
                }
                else {
                    data.filter.category.forEach((item) => {
                        dataFilters.push(`filter[category][]=${item}`)
                    })
                }
            }


            if (data.filter.cvet !== false && data.filter.cvet !== undefined) {
                // Если фильтр у нас - один, он будет строкой - запушим его значение сразу
                if (typeof data.filter.cvet === 'string') {
                    dataFilters.push(`filter[cvet][]=${data.filter.cvet}`)
                }
                // Если же это массив, то просто переберем его
                else {
                    data.filter.cvet.forEach((item) => {
                        dataFilters.push(`filter[cvet][]=${item}`)
                    })
                }
            }



            if (data.filter.razmer !== false && data.filter.razmer !== undefined) {
                // Если фильтр у нас - один, он будет строкой - запушим его значение сразу
                if (typeof data.filter.razmer === 'string') {
                    dataFilters.push(`filter[razmer][]=${data.filter.razmer}`)
                }
                // Если же значений несколько - переберем
                else {
                    data.filter.razmer.forEach((item) => {
                        dataFilters.push(`filter[razmer][]=${item}`)
                    })
                }
            }

        }







        dataFilters.push(`filter[price][from]=${data.price_from}`)
        dataFilters.push(`filter[price][to]=${data.price_to}`)




        // Преобразуем массив в строку
        let dataFiltersString = dataFilters.join('&')

        // Запишем наши фильтры
        props.setCatalogFilter(dataFiltersString)

        // Сделаем запрос на сервак с необходимыми фильтрами
        props.getFiltersCatalog(dataFiltersString)

    }


    // Функция, которая будет запоминать при каждом клике на чекбокс - нажат он или отжат
    const sendCheckInput = (e) => {
        // console.log (e.target)
        props.sendCheckInput(e)
    }


    const [visibleFilter, setVisibleFilter] = useState(false)

    const openFilter = () => {
        setVisibleFilter(!visibleFilter)
    }



    return (
        <div className={style.catalogContainer}>




            {/* Кнопка назад */}
            <div onClick={() => navigate(-1)} className="button-back">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <div className={style.catalogFilters}>


                <h1>{props.catalogInfo.name}</h1>





                <div>


                    <div className={style.searchOpenFilters}>
                        <div className={style.search}>
                            <div className={style.searchIcon}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <input value={text} onChange={(e) => { setText(e.target.value) }} type="text" className='form-control' placeholder="search" />
                        </div>
                        <button className={style.btnSearch} onClick={() => { search(text) }}>Поиск</button>
                        <div className={style.openFilters} onClick={() => { openFilter() }}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>



                    <div className={style.sorting}>
                        <div>Сортировать по:</div>
                        <select className="form-control" onChange={(e) => sortCatalog(e)} value={props.sort}>
                            {/* Рисуем сортировку */}
                            {
                                props.allSorting.map((item) => {
                                    return (
                                        <option key={item[0]} value={`sort=${item[0]}`}>{item[1]}</option>
                                    )
                                })
                            }
                        </select>
                    </div>



                    {
                        visibleFilter &&
                        <form onSubmit={handleSubmit(sendForm)}>
                            <div className={style.allFilters}>
                                {
                                    props.filters.category !== undefined ?
                                        <div className={style.filterBlock}>
                                            <h4>{props.filters.category.name}</h4>
                                            <div>

                                                {/* {console.log (props.filters.category.values[0])} */}
                                                {
                                                    Object.entries(props.filters.category.values).map(filter => {
                                                        return (
                                                            <label key={filter[1].name} className={style.filter}>
                                                                <div className="custom-checkbox">
                                                                    <input checked={filter[1].checked} onClick={(e) => { sendCheckInput(e) }} type="checkbox" {...register(filter[1].input_name)} value={filter[1].slug} />
                                                                    <span></span>
                                                                </div>
                                                                <div>{filter[1].name}</div>
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        : null
                                }
                                {
                                    props.filters.cvet !== undefined ?
                                        <div className={style.filterBlock}>
                                            <h4>{props.filters.cvet.name}</h4>
                                            <div>
                                                {/* {console.log (Object.entries(props.filters.cvet.values))} */}
                                                {
                                                    Object.entries(props.filters.cvet.values).map(filter => {
                                                        return (
                                                            <label key={filter[1].name} className={style.filter}>

                                                                <div className="custom-checkbox">
                                                                    <input checked={filter[1].checked} onClick={(e) => { sendCheckInput(e) }} type="checkbox" {...register(filter[1].input_name)} value={filter[1].slug} />
                                                                    <span></span>
                                                                </div>



                                                                <div>{filter[1].name}</div>
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        : null
                                }
                                {
                                    props.filters.razmer !== undefined ?
                                        <div className={style.filterBlock}>
                                            <h4>{props.filters.razmer.name}</h4>
                                            <div>
                                                {
                                                    Object.entries(props.filters.razmer.values).map(filter => {
                                                        return (
                                                            <label key={filter[1].name} className={style.filter}>


                                                                <div className="custom-checkbox">
                                                                    <input checked={filter[1].checked} onClick={(e) => { sendCheckInput(e) }} type="checkbox" {...register(filter[1].input_name)} value={filter[1].slug} />
                                                                    <span></span>
                                                                </div>



                                                                <div>{filter[1].name}</div>
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        : null
                                }
                                {
                                    props.filters.price !== undefined ?
                                        <div className={style.filterBlock}>
                                            <h4>Цена</h4>
                                            <div className="d-flex">
                                                <input type="number" defaultValue={props.filters.price.min} {...register('price_from')} className="form-control w-50" placeholder={`от ${props.filters.price.min}`} />
                                                <input type="number" defaultValue={props.filters.price.max} {...register('price_to')} className="form-control w-50" placeholder={`до ${props.filters.price.max}`} />
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <button className={style.btnSearch + ' ' + 'w-100 mt-4'}>Применить фильтры</button>
                        </form>
                    }







                </div>














                {/* <div className={style.allCategory}>
                    <Swiper
                        spaceBetween={40}
                        slidesPerView={5}
                        breakpoints={{
                            0: {
                                slidesPerView: 3,
                                spaceBetween: 15
                            },
                            400: {
                                slidesPerView: 4,
                                spaceBetween: 25
                            },
                            500: {
                                slidesPerView: 5,
                                spaceBetween: 40
                            },
                        }}>
                        <SwiperSlide>
                            <span className={style.active}>Все</span>
                        </SwiperSlide>
                        <SwiperSlide>
                            <span>Ручки</span>
                        </SwiperSlide>
                        <SwiperSlide>
                            <span>Диваны</span>
                        </SwiperSlide>
                        <SwiperSlide>
                            <span>Одежда</span>
                        </SwiperSlide>
                        <SwiperSlide>
                            <span>Техника</span>
                        </SwiperSlide>
                        <SwiperSlide>
                            <span>Игрушки</span>
                        </SwiperSlide>
                        <SwiperSlide>
                            <span>Детям</span>
                        </SwiperSlide>
                    </Swiper>
                </div> */}

            </div>


            {/* Рисуем товары */}
            <div className={style.catalog}>


                {/* Если товаров нет - покажем заглушку */}
                {props.catalogData.length === 0 && <div className="not-found">Товары не найдены</div>}


                {/* Пока грузим данные о карточке - покажем загрузку */}
                {props.isFetching ? <Preloader /> : null}



                {
                    props.catalogData.map(
                        product => {

                            return (
                                <div id={product.id} key={product.id} className={style.productCard}>


                                    <NavLink to={`/product/${product.seo.slug}`} className={style.image}>
                                        <LazyLoadImage width={130} height={140} src={
                                            product.images[0] !== undefined ?
                                                product.images[0]['130x140'] :
                                                "https://test11.itepro.ru/static/origin/variant/61/6401d845c3a597.jpg"} />
                                    </NavLink>



                                    <div className={style.productCardInformation}>
                                        <NavLink className={style.productCardName} to={`/product/${product.seo.slug}`}>{product.name}</NavLink>
                                        <div className={style.productCardDescription}>{product.short_description}</div>
                                        <div className={style.productCardBottom}>
                                            <div className={style.productCardPrice}>{product.price} руб.</div>
                                            <NavLink className={style.productCardButton} to={`/product/${product.seo.slug}`}>Подробнее</NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>

        </div >
    )
}

export default Catalog