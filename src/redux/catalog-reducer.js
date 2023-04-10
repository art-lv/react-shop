import initAPI from "../api/api"

const SET_CATALOG = 'SET_CATALOG'
const SET_ALL_SORTING = 'SET_ALL_SORTING'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_RECEIVED_PAGES = 'SET_RECEIVED_PAGES'
const SET_RESET_CATALOG = 'SET_RESET_CATALOG'
const SET_SORT = 'SET_SORT'
/* const DELETED = 'DELETED' */
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
/* const SET_COMEBACK = 'SET_COMEBACK' */
const SET_CATALOG_SLUG = 'SET_CATALOG_SLUG'
const SET_CATALOG_FILTER = 'SET_CATALOG_FILTER'
const SET_CATALOG_INFO = 'SET_CATALOG_INFO'
const SET_PAGE_COUNT = 'SET_PAGE_COUNT'
const SET_ALL_FILTERS = 'SET_ALL_FILTERS'
const SET_RESET_FILTER = 'SET_RESET_FILTER'


let initialState = {
    catalogData: [],
    catalogInfo: {},
    allSorting: [],
    sort: '',
    // Какой именно каталог открываем
    slug: '',

    // Фильтр в заголовке
    filter: '',
    // Текущая страница
    currentPage: 1,


    // Уже запрошенные страницы
    receivedPages: [],
    // Служебная переменная - хранящая полностью весь удаленный каталог
    //deleted: [],

    // Есть ли прелоадер?
    isFetching: false,

    // Общее кол-во страниц
    pageCount: '',

    filters: {}
    // Можно ли возвращать удаленные товары?
    //isComeback: false
}

const catalogReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CATALOG: {
            return {
                ...state,
                // catalogData: [...state.catalogData, ...action.catalogData]
                catalogData: action.catalogData
            }
        }

        case SET_ALL_SORTING: {
            return {
                ...state,
                allSorting: action.sortingData
            }
        }

        case SET_SORT: {
            return {
                ...state,
                sort: action.sort
            }
        }



        // Сетаем текущую страницу
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: state.currentPage + 1
            }
        }

        // Запишем в массив все полученные страницы, чтобы не получать их дубли
        case SET_RECEIVED_PAGES: {
            return {
                ...state,
                receivedPages: [...state.receivedPages, action.page]
            }
        }

        // Когда применяем сортировку - обнуляем все что было до этого
        case SET_RESET_CATALOG: {
            return {
                ...state,
                catalogData: [],
                receivedPages: [1],
                currentPage: 1,
            }
        }


        case SET_RESET_FILTER: {
            return {
                ...state,
                filter: '',
            }
        }

        /* case DELETED: {
            return {
                ...state,
                // Старые удаленные товароы, а следом новые
                // deleted: [...state.deleted, ...action.catalog]
                deleted: action.catalog
            }
        } */


        // Переключаем loader с false на true во время загрузки и наоборот
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }


        // 
        /* case SET_COMEBACK: {
            return {
                ...state,
                isComeback: action.isComeback
            }
        } */


        case SET_CATALOG_SLUG: {
            return {
                ...state,
                slug: action.slug
            }
        }


        case SET_CATALOG_FILTER: {
            return {
                ...state,
                filter: action.filter
            }
        }


        

        case SET_CATALOG_INFO: {
            return {
                ...state,
                catalogInfo: action.catalogInfo
            }
        }


        case SET_PAGE_COUNT: {
            return {
                ...state,
                pageCount: action.pageCount
            }
        }


        case SET_ALL_FILTERS: {
            return {
                ...state,
                filters: action.filters
            }
        }



        default: {
            return state
        }

    }
}

let setCatalog = (catalogData) => ({
    type: SET_CATALOG,
    catalogData
})


let setAllSorting = (sortingData) => ({
    type: SET_ALL_SORTING,
    sortingData
})


export let setSort = (sort) => ({
    type: SET_SORT,
    sort
})



// Изменение текущей страницы
export let setCurrentPage = () => ({
    type: SET_CURRENT_PAGE,
})

// Страницы - которые мы запрашивали
let setReceivedPages = (page) => ({
    type: SET_RECEIVED_PAGES,
    page
})

// Функция, которая сбросит все запрошенные страницы, и текущую сделает 1 (Это нужно при фильтрах и сортировке)
let setResetCatalog = () => ({
    type: SET_RESET_CATALOG
})


let setResetFilter = () => ({
    type: SET_RESET_FILTER
})



// Запишем весь удаленный каталог
/* let setDeleteCalalog = (catalog) => ({
    type: DELETED,
    catalog
}) */


// Включение и выключение лоадера
let toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})


// Можно ли возвращать удаленные товары
/* export let setComeback = (isComeback) => ({
    type: SET_COMEBACK,
    isComeback
}) */


export let setCatalogSlug = (slug) => ({
    type: SET_CATALOG_SLUG,
    slug
})

export let setCatalogFilter = (filter) => ({
    type: SET_CATALOG_FILTER,
    filter
})



let setCatalogInfo = (catalogInfo) => ({
    type: SET_CATALOG_INFO,
    catalogInfo
})

// Общее кол-во страниц
let setPageCount = (pageCount) => ({
    type: SET_PAGE_COUNT,
    pageCount
})

// Все фильтры
let setAllFilters = (filters) => ({
    type: SET_ALL_FILTERS,
    filters
})


// Функция, которая будет запоминать при каждом клике на чекбокс в фильтрах - нажат он или отжат
export const sendCheckInput = (e) => {
    return (dispatch, getState) => {

        const filters = getState().catalog.filters

        // console.log(filters)



        if (filters.category !== undefined) {
            Object.values(filters.category.values).forEach(item => {
                if (item.slug === e.target.value) {
                    item.checked = e.target.checked
                }
            })
        }
        


        if (filters.cvet !== undefined) {
            Object.values(filters.cvet.values).forEach(item => {
                if (item.slug === e.target.value) {
                    item.checked = e.target.checked
                }
            })
        }
        



        if (filters.razmer !== undefined) {
            Object.values(filters.razmer.values).forEach(item => {
                if (item.slug === e.target.value) {
                    item.checked = e.target.checked
                }
            })
        }
        

        dispatch(setAllFilters({}))
        dispatch(setAllFilters(filters))

    }
}


// Функция, которая запомнит цену, когда мы отправим форму
export const sendPrice = (price_from, price_to) => {
    return (dispatch, getState) => {

        const filters = getState().catalog.filters

        //console.log (filters.price)
        filters.price.min = price_from
        filters.price.max = price_to

        dispatch(setAllFilters({}))
        dispatch(setAllFilters(filters))
    }
}





// Функция - которая получит отсортированный каталог
export const getCatalogSorting = (slug = initialState.slug, sort = initialState.sort, currentPage = initialState.currentPage, filter = initialState.filter) => {
    return (dispatch) => {
        // Покажем лоадер
        dispatch(toggleIsFetching(true))
        initAPI.getCatalog(slug, sort, currentPage, filter)
            .then(response => {
                // Очистим каталог
                dispatch(setResetCatalog())
                // Запишем в store - полученные данные
                dispatch(setCatalog(response.data.products))
                // Запишем в store данные о самом каталоге (Имя, фильтры и т.д)
                dispatch(setCatalogInfo(response.data.category))
                // Выключим лоадер
                dispatch(toggleIsFetching(false))
            })
    }
}






// Функция - которая вернет удаленные ранее товары
/* export const comebackCatalog = () => {
    return (dispatch, getState) => {

        const catalogData = getState().catalog.catalogData
        const deleted = getState().catalog.deleted

        let catalog = [...deleted, ...catalogData]


        // Запишем в store - полученные данные
        dispatch(setCatalog(catalog))

        // Теперь удаленных товаров нет - почистим список
        dispatch(setDeleteCalalog([]))

    }
} */





// Получим все товары в каталоге при первом заходе на него или при скролле вниз 
export const getCatalog = (slug = initialState.slug, sort = initialState.sort, currentPage = initialState.currentPage, filter = initialState.filter) => {
    return (dispatch, getState) => {

        // Слуг - который был запрошен ранее
        const oldSlug = getState().catalog.slug
        // Если Слуг изменился - мне необходимо перезаписать все товары (На первую страницу)
        if (oldSlug !== slug) {
            // Покажем лоадер
            dispatch(toggleIsFetching(true))
            initAPI.getCatalog(slug, sort, currentPage, '')
                .then(response => {



                    // Когда мы заходим в новый каталог - сбрасываем значение всех фильтров
                    dispatch(setResetFilter())


                    // console.log(response.data.filters)
                    // Получим фильтры
                    dispatch(setAllFilters(response.data.filters))



                    // Очистим каталог
                    dispatch(setResetCatalog())
                    // Запишем в store - полученные данные
                    dispatch(setCatalog(response.data.products))
                    // Запишем в store данные о самом каталоге (Имя, фильтры и т.д)
                    dispatch(setCatalogInfo(response.data.category))
                    // Выключим лоадер
                    dispatch(toggleIsFetching(false))
                    // Запишем общее кол-во страниц
                    dispatch(setPageCount(Number(response.headers['x-pagination-page-count'])))
                })
        }

        // Иначе (Когда мы скролим вниз подгружаем товары)
        else {
            // Страницы - которые мы уже получали
            const receivedPages = getState().catalog.receivedPages
            // Общее кол-во страниц
            const pageCount = getState().catalog.pageCount
            // Только если мы еще не делали запрос - на эту страницу - делаем его (Исправляет ошибку, когда мы повторно заходим в один и тот же раздел)
            // И если мы делаем запрос на существующую страницу (pageCount- общее число страниц)
            if (receivedPages.includes(currentPage) !== true && currentPage <= pageCount) {
                // Покажем лоадер
                dispatch(toggleIsFetching(true))
                initAPI.getCatalog(slug, sort, currentPage, filter)
                    .then(response => {
                        // Допишем страницу, которую мы запросили
                        dispatch(setReceivedPages(currentPage))
                        // Получим текущий массив товаров
                        let oldСatalogData = getState().catalog.catalogData
                        // Получим старый массив
                        let newCatalogData = response.data.products
                        // Соеденим 2 каталога вместе
                        let catalog = [...oldСatalogData, ...newCatalogData]
                        /* 
                        // Чистка старых товаров
                        if (catalog.length > 72) {
                            // Удаленные товары ранее
                            let deletedOld = getState().catalog.deleted

                            // Удаленные сейчас
                            // Сохраним первые 36 элементов массива, которые затем будем удалять
                            let deletedNow = []
                            for (let i = 0; i < 36; i++) {
                                deletedNow.push(catalog[i])
                            }

                            // Все удаленные товары
                            let deletedAll = [...deletedOld, ...deletedNow]

                            // Но перед тем как удалить данные товары из state - я запомню их, чтобы потом когда будем скролить вверх иметь возможность отрисовать их
                            dispatch(setDeleteCalalog(deletedAll))

                            // Первым параметром метод принимает номер элемента массива, который нужно удалить. Вторым параметром - сколько элементов массива следует удалить
                            catalog.splice(0, 36)
                            console.log('Удалили')
                        } */
                        // Запишем в store данные о самом карточках товара каталога
                        dispatch(setCatalog(catalog))
                        // Запишем в store данные о самом каталоге (Имя, фильтры и т.д)
                        dispatch(setCatalogInfo(response.data.category))
                        // Выключим лоадер
                        dispatch(toggleIsFetching(false))
                    })
            }
        }
    }
}



// Поиск по каталогу
export const getSearchCatalog = (text) => {
    return (dispatch, getState) => {
        // Если введенный текст равен не пустой строке, то
        if (text !== '') {
            // Покажем лоадер
            dispatch(toggleIsFetching(true))
            initAPI.getSearchCatalog(text)
                .then(response => {
                    dispatch(setCatalog(response.data))
                    // console.log(response.data)
                    // Запишем общее кол-во страниц
                    dispatch(setPageCount(Number(response.headers['x-pagination-page-count'])))
                    // Выключим лоадер
                    dispatch(toggleIsFetching(false))
                })
        }
        // Иначе сделаем обычный запрос со слугом, сортировкой на первую страницу
        else {
            let sort = getState().catalog.sort
            let slug = getState().catalog.slug
            let filter = getState().catalog.filter

            // Покажем лоадер
            dispatch(toggleIsFetching(true))
            initAPI.getCatalog(slug, sort, 1, filter)
                .then(response => {
                    // Очистим каталог
                    dispatch(setResetCatalog())
                    // Запишем полученные данные
                    dispatch(setCatalog(response.data.products))
                    // Запишем общее кол-во страниц
                    dispatch(setPageCount(Number(response.headers['x-pagination-page-count'])))
                    // Выключим лоадер
                    dispatch(toggleIsFetching(false))
                })
        }
    }
}

// filter[category][]
// ?name=value

// ?filter[category][]=gadgets&filter[category][]=dress

// ?filter[cvet][]=krasnyj&filter[cvet][]=rozovyj




// Запрос на сервак с примененными фильтрами
export const getFiltersCatalog = (filters) => {
    return (dispatch, getState) => {



        let sort = getState().catalog.sort
        let slug = getState().catalog.slug
        dispatch(toggleIsFetching(true))


        initAPI.getCatalog(slug, sort, 1, filters)
            .then(response => {




                // Очистим каталог
                dispatch(setResetCatalog())
                // Запишем полученные данные
                dispatch(setCatalog(response.data.products))
                // Запишем общее кол-во страниц
                dispatch(setPageCount(Number(response.headers['x-pagination-page-count'])))
                // Выключим лоадер
                dispatch(toggleIsFetching(false))

            })

    }
}






// Получим все методы сортировки каталога
export const getAllSorting = () => {
    return (dispatch) => {
        initAPI.getCatalogSort()
            .then(response => {
                // dispatch(setAllSorting(response.data))
                dispatch(setAllSorting(Object.entries(response.data)))
            })
    }
}

export default catalogReducer