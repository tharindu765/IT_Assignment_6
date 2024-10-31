class OrderModel {
    constructor(orderID, customer, item, quantity, totalPrice) {
        this._orderID = orderID;
        this._customer = customer;
        this._item = item;
        this._quantity = quantity;
        this._totalPrice = totalPrice;
    }

    // Getters
    get orderID() {
        return this._orderID;
    }

    get customer() {
        return this._customer;
    }

    get item() {
        return this._item;
    }

    get quantity() {
        return this._quantity;
    }

    get totalPrice() {
        return this._totalPrice;
    }
}

export default OrderModel;
