import OrderModel from "../models/orderModel.js"; // Adjust the import according to your structure
import { CustomerArr, ItemArr, OrderArr } from "../db/database.js";

let currentOrderIndex = -1; // For selecting an order
let orderIDCounter = 1; // To generate unique order IDs
let isCartMode = false; // Flag to indicate if we are in cart mode
let temporaryOrders = []; // Temporary storage for cart items
let currentOrderID = null; // To keep track of the current order ID being used in the cart

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
    event.preventDefault(); // Prevent default form submission

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

    // If it's the first item being added for this order, assign a new order ID
    if (temporaryOrders.length === 0 || temporaryOrders[0].customer !== customer) {
        currentOrderID = orderIDCounter++; // Assign a new order ID for the first item
    }

    let totalPrice = calculateTotalPrice(itemPrice, quantity);
    let newOrder = new OrderModel(currentOrderID, customer, item, quantity, totalPrice);
    temporaryOrders.push(newOrder); // Add to temporary orders

    // Load the temporary orders into the table
    isCartMode = true; // Set the mode to cart mode
    loadOrders(); // Update the order table to show temporary orders
    clearOrderForm(); // Clear form fields
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

    // Transfer temporary orders to the main orders array
    temporaryOrders.forEach(order => {
        OrderArr.push(order);
    });

    temporaryOrders = []; // Clear temporary orders after placing
    isCartMode = false; // Switch back to normal order display
    currentOrderID = null; // Reset the current order ID
    loadOrders(); // Update the real orders table
    clearOrderForm(); // Clear form fields
});

// Initialize Dropdowns and Orders on Page Load
$(document).ready(() => {
    loadCustomerOptions();
    loadItemOptions();
    loadOrders(); // Load orders initially
    console.log("Page loaded and dropdowns initialized.");
});
