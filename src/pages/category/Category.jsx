import { useEffect } from "react"
import { Accordion } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import Preloader from "../../components/preloader/preloader"
/* import style from './Category.module.css' */



const Category = (props) => {

    // Первое получение товаров
    useEffect(() => {
        props.getCategory()
    }, [])


    /* Проверка id - и добавление или удаление его в store */
    const sendIdOpenCategory = (id) => {
        // Если еще не был открыт - записываем
        if (props.idOpenCategory.indexOf(String(id)) === -1) {
            props.sendIdOpenCategory(String(id))
        }
        // Если уже был открыт - удаляем
        else {
            props.deleteIdOpenCategory(String(id))
        }
    }


    function renderTree(category) {
        return category.map(item => {
            return (
                <div key={item.id}>
                    {
                        // Если дочерних категорий нет
                        item.children === undefined ?

                            <div className='itemNoAccordion'>
                                <div className='flexBlock'>
                                    <div className='categoryInfo'>
                                        <div>{item.id}</div>
                                        <NavLink to={'/category/' + item.seo.slug} className='title'>
                                            {item.name}
                                        </NavLink>
                                    </div>
                                </div>
                            </div> :

                            // Если есть дочерние категории
                            <Accordion.Item className='itemAccordion' eventKey={String(item.id)}>
                                <div className='categoryHeader'>
                                    <div className='flexBlock'>
                                        <div className='categoryInfo'>
                                            <div>{item.id}</div>
                                            <NavLink to={'/category/' + item.seo.slug} className='title'>
                                                {item.name}
                                            </NavLink>
                                        </div>
                                    </div>
                                    <Accordion.Header onClick={() => { sendIdOpenCategory(item.id) }}></Accordion.Header>
                                </div>
                                <Accordion.Body>{renderTree(item.children)}</Accordion.Body>
                            </Accordion.Item>
                    }
                </div>
            )
        })
    }





    return (
        <div className="category">
            {/* Пока грузим данные о карточке - покажем загрузку */}
            {props.isFetching ? <Preloader /> : null}
            <Accordion defaultActiveKey={props.idOpenCategory} alwaysOpen={true} >
                {renderTree(props.categoryData)}
            </Accordion>
        </div>
    )
}

export default Category