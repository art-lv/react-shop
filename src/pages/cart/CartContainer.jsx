import Cart from "./MyCart"
import { getProductCart, deleteAllCart, deleteProduct, changeQuantity } from '../../redux/cart-reducer'
import { useEffect } from "react"
import { connect } from "react-redux"




const CartContainer = (props) => {

    useEffect(() => {
        props.getProductCart()
    }, [])

    return (
        <div>
            <Cart 
            cartProductData={props.cartProductData}
            deleteAllCart={props.deleteAllCart}
            deleteProduct={props.deleteProduct}
            changeQuantity={props.changeQuantity}
            allPrice={props.allPrice}
            errors={props.errors} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartProductData: state.cart.cartProductData,
    allPrice: state.cart.allPrice,
    errors: state.cart.errors
})

export default connect(mapStateToProps, { getProductCart, deleteAllCart, deleteProduct, changeQuantity })(CartContainer)