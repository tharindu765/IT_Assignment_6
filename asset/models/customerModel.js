class CustomerModel {
    constructor(name, nic, address, contact) {
        this._name = name;
        this._nic = nic;
        this._address = address;
        this._contact = contact;
    }

    // Getters
    get name() {
        return this._name;
    }

    get nic() {
        return this._nic;
    }

    get address() {
        return this._address;
    }

    get contact() {
        return this._contact;
    }

    // Setters
    set name(value) {
        this._name = value;
    }

    set nic(value) {
        this._nic = value;
    }

    set address(value) {
        this._address = value;
    }

    set contact(value) {
        this._contact = value;
    }
}

export default CustomerModel;
