import OrderModel from "../models/orderModel.js";
import { CustomerArr, ItemArr, OrderArr } from "../db/database.js";

let currentOrderIndex = -1;
let orderIDCounter = 1;
let isCartMode = false;
let temporaryOrders = [];
let currentOrderID = null;

// Load Customer Dropdown
export const loadCustomerOptions = () => {
    const customerSelect = $("#customerSelect");
    customerSelect.empty();
    customerSelect.append('<option selected disabled>Choose a customer...</option>');
    CustomerArr.forEach((customer) => {
        customerSelect.append(`<option value="${customer.itemID}">${customer.name}</option>`);
    });
};

// Load Item Dropdown
export const loadItemOptions = () => {
    const itemSelect = $("#itemSelect");
    itemSelect.empty();
    itemSelect.append('<option selected disabled>Choose an item...</option>');
    ItemArr.forEach((item) => {
        itemSelect.append(`<option value="${item.itemID}">${item.itemName} - $${item.price} (Max Quantity: 10)</option>`);
    });
};

// Load Orders into the Table
const loadOrders = () => {
    $("#orderTable tbody").empty();
    const ordersToDisplay = isCartMode ? temporaryOrders : OrderArr;

    ordersToDisplay.forEach((order, index) => {
        let orderRow = `
            <tr>
                <th scope="row">${isCartMode ? currentOrderID : order.orderID}</th>
                <td>${order.customer}</td>
                <td>${order.item}</td>
                <td>${order.quantity}</td>
                <td>$${order.totalPrice}</td>
            </tr>`;
        $("#orderTable tbody").append(orderRow);
    });

    console.log(isCartMode ? "Temporary orders loaded:" : "Real orders loaded:", ordersToDisplay);
};

// Clear Form Fields
const clearOrderForm = () => {
    $("#customerSelect").val('');
    $("#itemSelect").val('');
    $("#quantityInput").val('');
    currentOrderIndex = -1;
};

// Calculate Total Price
const calculateTotalPrice = (itemPrice, quantity) => itemPrice * quantity;

// Add Item to Temporary Order (Cart)
$("#AddToCart").on("click", (event) => {
    event.preventDefault();

    let customer = $("#customerSelect option:selected").text();
    let item = $("#itemSelect option:selected").text().split(" - ")[0];
    let itemPrice = parseFloat($("#itemSelect option:selected").text().split(" - $")[1]);
    let quantity = parseInt($("#quantityInput").val());

    if (!customer || !item || !quantity) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All fields are required!",
        });
        return;
    }

    // Limit the quantity to a maximum of 10
    if (quantity > 10) {
        Swal.fire({
            icon: "error",
            title: "Invalid Quantity",
            text: "Maximum quantity allowed is 10!",
        });
        return;
    }


    if (temporaryOrders.length === 0 || temporaryOrders[0].customer !== customer) {
        currentOrderID = orderIDCounter++;
    }

    let totalPrice = calculateTotalPrice(itemPrice, quantity);
    let newOrder = new OrderModel(currentOrderID, customer, item, quantity, totalPrice);
    temporaryOrders.push(newOrder);


    isCartMode = true;
    loadOrders();
    clearOrderForm();
});

// Place Order
$("#palaceOrder").on("click", () => {
    if (temporaryOrders.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No orders in the cart to place!",
        });
        return;
    }


    temporaryOrders.forEach(order => {
        OrderArr.push(order);
    });

    temporaryOrders = [];
    isCartMode = false;
    currentOrderID = null;
    loadOrders();
    clearOrderForm();
});


$(document).ready(() => {
    loadCustomerOptions();
    loadItemOptions();
    loadOrders();
    console.log("Page loaded and dropdowns initialized.");
});
