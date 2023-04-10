import { useParams } from "react-router-dom"
import CardProduct from "./CardProduct"
import { getProductSlug, sendRadioId, setSelectedOption, addCartProductVariant, setProductSlugVariant } from "../../redux/cardProduct-reducer"
import { connect } from "react-redux"
import { useEffect } from "react"


const CardProductContainer = (props) => {

    let { slug } = useParams()

    useEffect(() => {
        props.getProductSlug(slug)
        // Сбросим выбранные опции(id инпутов), при новом заходе на страницу
        props.setSelectedOption([])
        // Уберем выбранный нами вариант (Отрисуется дефолтный)
        props.setProductSlugVariant({})
    }, [])


    return (
        <div>
            <CardProduct 
            productDataSlug={props.productDataSlug}
            productSlugVariant={props.productSlugVariant}
            unicVariant={props.unicVariant}
            sendRadioId={props.sendRadioId}
            isFetching={props.isFetching}
            addCartProductVariant={props.addCartProductVariant}
            errorCardProduct={props.errorCardProduct} />    
        </div>
    )
}


const mapStateToProps = (state) => ({
    productDataSlug: state.cardProduct.productDataSlug,
    productSlugVariant: state.cardProduct.productSlugVariant,
    unicVariant: state.cardProduct.unicVariant,
    isFetching: state.cardProduct.isFetching,
    errorCardProduct: state.cardProduct.errorCardProduct
})

export default connect(mapStateToProps, { getProductSlug, sendRadioId, setSelectedOption, addCartProductVariant, setProductSlugVariant })(CardProductContainer)

