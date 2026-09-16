const API_URL = "http://127.0.0.1:8000/api/expenses/";

const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalElement = document.getElementById("total");
const searchInput = document.getElementById("search");

let expenses = [];


// READ - Get all expenses
async function loadExpenses() {
    try {
        const response = await fetch(API_URL);
        expenses = await response.json();

        displayExpenses(expenses);
        calculateTotal();

    } catch (error) {
        console.error("Error loading expenses:", error);
        expenseList.innerHTML = "<p>Unable to connect to the server.</p>";
    }
}


// CREATE - Add expense
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const expense = {
        title: document.getElementById("title").value,
        amount: document.getElementById("amount").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            const error = await response.json();
            alert(JSON.stringify(error));
            return;
        }

        form.reset();
        loadExpenses();

    } catch (error) {
        alert("Unable to add expense.");
    }
});


// DISPLAY expenses
function displayExpenses(data) {

    expenseList.innerHTML = "";

    if (data.length === 0) {
        expenseList.innerHTML = "<p>No expenses found.</p>";
        return;
    }

    data.forEach(expense => {

        const div = document.createElement("div");

        div.className = "expense-item";

        div.innerHTML = `
            <h3>${expense.title}</h3>
            <p><strong>Amount:</strong> ₹${expense.amount}</p>
            <p><strong>Category:</strong> ${expense.category}</p>
            <p><strong>Date:</strong> ${expense.date}</p>

            <button onclick="editExpense(${expense.id})">
                Edit
            </button>

            <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        expenseList.appendChild(div);
    });
}


// DELETE expense
async function deleteExpense(id) {
    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}${id}/`, {
            method: "DELETE"
        });

        if (response.ok) {
            loadExpenses();
        } else {
            alert("Unable to delete expense.");
        }

    } catch (error) {
        alert("Error deleting expense.");
    }
}


// UPDATE expense
async function editExpense(id) {
    const expense = expenses.find(item => String(item.id) === String(id));

    if (!expense) {
        alert("Expense not found.");
        return;
    }

    const newTitle = prompt("Enter new title:", expense.title);
    const newAmount = prompt("Enter new amount:", expense.amount);
    const newCategory = prompt("Enter new category:", expense.category);
    const newDate = prompt("Enter new date:", expense.date);

    if (!newTitle || !newAmount || !newCategory || !newDate) {
        return;
    }

    const updatedExpense = {
        title: newTitle,
        amount: newAmount,
        category: newCategory,
        date: newDate
    };

    try {
        const response = await fetch(`${API_URL}${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedExpense)
        });

        if (response.ok) {
            loadExpenses();
        } else {
            alert("Unable to update expense.");
        }
    } catch (error) {
        alert("Error updating expense.");
    }
}


// TOTAL expense
function calculateTotal() {

    let total = 0;

    expenses.forEach(expense => {
        total += parseFloat(expense.amount);
    });

    totalElement.textContent = `₹${total.toFixed(2)}`;
}


// SEARCH expenses
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredExpenses = expenses.filter(expense =>
        expense.title.toLowerCase().includes(searchText) ||
        expense.category.toLowerCase().includes(searchText)
    );

    displayExpenses(filteredExpenses);
});


// Load expenses when page starts
loadExpenses();
