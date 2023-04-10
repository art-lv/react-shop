import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://test11.itepro.ru/gateway/frontend/',

    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
})

//&page=1
const initAPI = {

    // Получим категории
    getCategoty() {
        return instance.get(`category`)
    },


    // Получим все товары в каталог
    getCatalog(slug, sort, currentPage, filters) {
        return instance.get(`category/${slug}?${sort}&page=${currentPage}&${filters}`)
    },


    // Поиск по каталогу (Товар 2)
    getSearchCatalog(text) {
        return instance.get(`search?q=${text}`)
    },

    // Получим все варианты сортировки в каталоге
    getCatalogSort() {
        return instance.get(`category/sort`)
    },


    // Получим карточку товара
    getProductSlug(slug) {
        return instance.get(`product/${slug}`)
    },



    // Отправим выбранный пользователем id варианта товара
    sendRadioId(slug, data) {
        return instance.post(`product/${slug}`, data)
    },

    // POST 127.0.0.1/gateway/frontend/cart/add?variant_id={id}
    // Отправим выбранный пользователем товар в корзину
    sendProductVariant(id, data) {
        return instance.post(`cart/add?variant_id=${id}`, data)
    },

    // GET 127.0.0.1/gateway/frontend/cart
    // Получим все содержимое корзины
    getCart() {
        return instance.get(`cart`)
    },

    // Удалить все содержимое корзины
    deleteCart() {
        return instance.delete(`cart/clear`)
    },

    // Удалить один товар по id
    deleteProduct(id) {
        return instance.delete(`cart/remove/${id}`)
    },

    // Изменяем кол-во у корзине у товара
    changeQuantity(data) {
        return instance.put(`cart`, data)
    },



    // Оформить заказ - в checkout
    sendCheckoutData(data) {
        return instance.post(`checkout/index`, data)
    },


    // Получим все методы оплаты
    getCheckoutPayment() {
        return instance.get(`checkout/payment-method`)
    },

    // Получим все методы доставки
    getCheckoutDelivery() {
        return instance.get(`checkout/delivery-method`)
    }

    // Вернется список всех доступных способов оплаты
    // GET https: //test11.itepro.ru/gateway/frontend/checkout/payment-method

    // Вернется список всех доступных способов доставки
    // GET https://test11.itepro.ru/gateway/frontend/checkout/delivery-method
    

    // Получение стоимости
    // http://127.0.0.1/gateway/frontend/checkout/delivery-cost










}

export default initAPI