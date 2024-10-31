//import {customerModel} from ".models/customerModel.js";
import CustomerModel from "../models/customerModel.js";
import { CustomerArr, ItemArr, OrderArr } from "../db/database.js";
import { loadCustomerOptions, loadItemOptions } from '../js/order.js';

let currentIndex = -1; // Keep track of the selected customer index

// Function to load customers into the table
const loadCustomer = () => {
    $("#customerTable tbody").empty();
    CustomerArr.map((item, index) => {
        let data = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${item.nic}</td>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td>${item.contact}</td>
            </tr>`;
        $("#customerTable tbody").append(data);
    });
};

// Function to clear form fields
const cleanForm = () => {
    $("#inputName").val('');
    $("#inputNIC").val('');
    $("#inputAddress").val('');
    $("#inputContact").val('');
    currentIndex = -1;
};

/*
 const validEmail = (email) =>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    const validMobile = (mobile) =>{
        const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
        return sriLankanMobileRegex.test(mobile);
    }
*/

const isFormValid = () => {
    let name = $("#inputName").val();
    let nic = $("#inputNIC").val();
    let address = $("#inputAddress").val();
    let contact = $("#inputContact").val();

    if (name.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Missing filed!",
        });
        return false;
    }
    if (nic.length === 0) {
        Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Missing filed!",
                });
        return false;
    }
    if (address.length === 0) {
        Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Missing filed!",
                });
        return false;
    }
    if (contact.length === 0) {
        Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Missing filed!",
                });
        return false;
    }
    return true;
};

// Save Customer
$("#customerSave").on("click", () => {
    if (!isFormValid()) return;

        let name = $("#inputName").val();
        let nic = $("#inputNIC").val();
        let address = $("#inputAddress").val();
        let contact = $("#inputContact").val();


    let newCustomer = new CustomerModel(name,nic,address,contact);

    CustomerArr.push(newCustomer);
    loadCustomerOptions();
    cleanForm();
    loadCustomer();
});

// Update Customer
$("#customerUpdate").on("click", () => {
    if (currentIndex === -1) {
        alert("Please select a customer to update.");
        return;
    }
    if (!isFormValid()) return;

    let updatedCustomer = new CustomerModel(
        $("#inputName").val(),
        $("#inputNIC").val(),
        $("#inputAddress").val(),
        $("#inputContact").val()
    );

    CustomerArr[currentIndex] = updatedCustomer;
    loadCustomerOptions();
    cleanForm();
    loadCustomer();
});

// Delete Customer

$("#customerDelete").on("click", function () {
    if (currentIndex === -1) {
        alert("Please select a customer to delete.");
        return;
    }

    CustomerArr.splice(currentIndex, 1);
    loadCustomerOptions();
    cleanForm();
    loadCustomer();
});

// Select Customer on Table Row Click
$("#customerTable tbody").on("click", "tr", function () {
    currentIndex = $(this).index();
    let selectedCustomer = CustomerArr[currentIndex];

    $("#inputName").val(selectedCustomer.name);
    $("#inputNIC").val(selectedCustomer.nic);
    $("#inputAddress").val(selectedCustomer.address);
    $("#inputContact").val(selectedCustomer.contact);
});
