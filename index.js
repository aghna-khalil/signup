document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    registerUser();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    loginUser();
});

function hashPassword(password) {
    return btoa(password); 
}

function registerUser() {
    const username = document.getElementById('username').value;
    const password = hashPassword(document.getElementById('password').value); 
    const email = document.getElementById('email').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert('Username already exists. Please choose another one.');
        return;
    }

    users.push({ username, password, email });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    document.getElementById('loginuser').style.display = 'block';
    document.getElementById('registrationForm').reset();
}

function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = hashPassword(document.getElementById('loginPassword').value); // Hash comparison

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful!');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('logoutSection').style.display = 'block';
        document.getElementById('productManagementSection').style.display = 'block';
    } else {
        alert('Invalid username or password.');
    }
}

function logoutUser() {
    // Simple logout functionality
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('logoutSection').style.display = 'none';
    document.getElementById('loginForm').reset();
    alert('You have been logged out.');
}




// crud================================



var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["productCode"] = document.getElementById("productCode").value;
    formData["product"] = document.getElementById("product").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["perPrice"] = document.getElementById("perPrice").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.productCode;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.product;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.qty;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.perPrice;
    cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("product").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.product;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.perPrice;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}