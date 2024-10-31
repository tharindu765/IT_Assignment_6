import ItemModel from "../models/itemModel.js";
import { CustomerArr, ItemArr, OrderArr } from "../db/database.js";
import { loadCustomerOptions, loadItemOptions } from '../js/order.js';

let currentIndex = -1; // Keep track of the selected item index

// Function to load items into the table
const loadItems = () => {
    $("#itemTable tbody").empty();
    ItemArr.map((item, index) => {
        let data = `
            <tr>
                <th scope="row">${item.itemID}</th>
                <td>${item.itemName}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
            </tr>`;
        $("#itemTable tbody").append(data);
    });
};

// Function to clear form fields
const clearItemForm = () => {
    $("#itemID").val('');
    $("#itemName").val('');
    $("#quantity").val('');
    $("#price").val('');
    currentIndex = -1;
};

// Function to validate form fields
const isItemFormValid = () => {
    let itemID = $("#itemID").val();
    let itemName = $("#itemName").val();
    let quantity = $("#quantity").val();
    let price = $("#price").val();

    if (itemID.length === 0 || itemName.length === 0 || quantity.length === 0 || price.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Missing field!",
        });
        return false;
    }
    return true;
};

// Save Item
$("#itemSave").on("click", () => {
    if (!isItemFormValid()) return;

    let itemID = $("#itemID").val();
    let itemName = $("#itemName").val();
    let quantity = $("#quantity").val();
    let price = $("#price").val();

    let newItem = new ItemModel(itemID, itemName, quantity, price);

    ItemArr.push(newItem);
    loadItemOptions();
    clearItemForm();
    loadItems();
});

// Update Item
$("#itemUpdate").on("click", () => {
    if (currentIndex === -1) {
        alert("Please select an item to update.");
        return;
    }
    if (!isItemFormValid()) return;

    let updatedItem = new ItemModel(
        $("#itemID").val(),
        $("#itemName").val(),
        $("#quantity").val(),
        $("#price").val()
    );

    ItemArr[currentIndex] = updatedItem;
    loadItemOptions();
    clearItemForm();
    loadItems();
});

// Delete Item
$("#itemDelete").on("click", function () {
    if (currentIndex === -1) {
        alert("Please select an item to delete.");
        return;
    }

    ItemArr.splice(currentIndex, 1);
    loadItemOptions();
    clearItemForm();
    loadItems();
});

// Select Item on Table Row Click
$("#itemTable tbody").on("click", "tr", function () {
    currentIndex = $(this).index();
    let selectedItem = ItemArr[currentIndex];

    $("#itemID").val(selectedItem.itemID);
    $("#itemName").val(selectedItem.itemName);
    $("#quantity").val(selectedItem.quantity);
    $("#price").val(selectedItem.price);
});
