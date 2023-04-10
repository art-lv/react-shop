import initAPI from "../api/api"

const SET_CATEGORY = 'SET_CATEGORY'
const SET_ID_OPEN_CATEGORY = 'SET_ID_OPEN_CATEGORY'
const DELETE_ID_OPEN_CATEGORY = 'DELETE_ID_OPEN_CATEGORY'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'


let initialState = {
    categoryData: [],
    idOpenCategory: ['1'],
    isFetching: false
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        // Записываем все категории
        case SET_CATEGORY: {
            return {
                ...state,
                categoryData: action.categoryData
            }
        }


        // Записываем открытую категорию
        case SET_ID_OPEN_CATEGORY: {
            return {
                ...state,
                idOpenCategory: [...state.idOpenCategory, action.id]
            }
        }

        // Удаляем открытую категорию
        case DELETE_ID_OPEN_CATEGORY: {
            return {
                ...state,
                idOpenCategory: [...state.idOpenCategory.filter(
                    item => {
                        return item !== action.id
                    }
                )]
            }
        }


        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }



        default: {
            return state
        }

    }
}

let setCategory = (categoryData) => ({
    type: SET_CATEGORY,
    categoryData
})


// Функция записи id открытой категории, чтобы по умолчанию ее открывать
export let sendIdOpenCategory = (id) => ({
    type: SET_ID_OPEN_CATEGORY,
    id
})


// Функция удаления id открытой категории, чтобы по умолчанию ее не открывать
export let deleteIdOpenCategory = (id) => ({
    type: DELETE_ID_OPEN_CATEGORY,
    id
})


// Включение и выключение лоадера
let toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})


// Получим все товары в каталоге
export const getCategory = (sort = initialState.sort) => {
    return (dispatch, getState) => {

        let categoryData = getState().category.categoryData


        // Только если категории мы еще не получали, запросим их
        if (categoryData.length === 0) {
            dispatch(toggleIsFetching(true))
            initAPI.getCategoty(sort)
                .then(response => {

                    function buildTree(array) {
                        // Складываем все элементы будущего дерева в мап под id-ключами
                        // Так легче делать поиск родительской ноды
                        const map = new Map(array.map(item => [item.id, item]))
                        // Обход в цикле по значениям, хранящимся в мапе
                        for (let item of map.values()) {
                            // Проверка, является ли нода дочерней (при parent_id === null вернет undefined)
                            if (!map.has(item.parent_id)) {
                                continue
                            }
                            // Сохраняем прямую ссылку на родительскую ноду, чтобы дважды не доставать из мапа
                            const test = map.get(item.parent_id)
                            // Добавляем поточную ноду в список дочерних нод родительчкого узла.
                            // Здесь сокращено записана проверка на то, есть ли у ноды свойство children.
                            test.children = [...test.children || [], item]
                        }
                        // Возвращаем верхний уровень дерева. Все дочерние узлы уже есть в нужных родительских нодах
                        return [...map.values()].filter(item => !item.parent_id)
                    }
                    dispatch(setCategory(buildTree(response.data.categories)))

                    dispatch(toggleIsFetching(false))
                })
        }






    }
}


export default categoryReducer