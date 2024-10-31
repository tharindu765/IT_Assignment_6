class ItemModel {
    constructor(itemID, itemName, quantity, price) {
        this._itemID = itemID;
        this._itemName = itemName;
        this._quantity = quantity;
        this._price = price;
    }

    // Getters
    get itemID() {
        return this._itemID;
    }

    get itemName() {
        return this._itemName;
    }

    get quantity() {
        return this._quantity;
    }

    get price() {
        return this._price;
    }

    // Setters
    set itemID(value) {
        this._itemID = value;
    }

    set itemName(value) {
        this._itemName = value;
    }

    set quantity(value) {
        this._quantity = value;
    }

    set price(value) {
        this._price = value;
    }
}

export default ItemModel;
