import OrderInfo from "../entities/orderInfo";

let SuccessfulPayment = {
    currency:  String,
    total_amount:  Number,
    invoice_payload:  String,
    shipping_option_id: String,
    order_info: OrderInfo,
    telegram_payment_charge_id: String,
    provider_payment_charge_id: String
};

export default SuccessfulPayment;