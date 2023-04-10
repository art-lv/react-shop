import { connect } from "react-redux"
import Checkout from "./Checkout"
import { sendCheckoutData, getCheckoutPayment, getCheckoutDelivery, newOrder } from '../../redux/checkout-reduser'
import { useEffect } from "react"


const CheckoutContainer = (props) => {

    useEffect(() => {
        // Первое получение способов оплаты и сортировки
        props.getCheckoutPayment()
        props.getCheckoutDelivery()
    }, [])

    return (
        <Checkout
        sendCheckoutData={props.sendCheckoutData}
        errors={props.errors}
        order={props.order}
        payment={props.payment}
        delivery={props.delivery}
        newOrder={props.newOrder}
        disabledButton={props.disabledButton} />
    )
}

const mapStateToProps = (state) => ({
    errors: state.checkout.errors,
    order: state.checkout.order,
    payment: state.checkout.payment,
    delivery: state.checkout.delivery,
    disabledButton: state.checkout.disabledButton
})

export default connect(mapStateToProps, { sendCheckoutData, getCheckoutPayment, getCheckoutDelivery, newOrder })(CheckoutContainer)