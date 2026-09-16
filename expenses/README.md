# Expense Tracker – CRUD Based Web Application

## 1. Project Overview

Expense Tracker is a web application used to record and manage daily expenses.

The application allows users to create, view, update, and delete expenses.

## 2. Problem Statement

Managing daily expenses manually can make it difficult to track spending and calculate the total amount.

This application provides a simple digital solution for managing expenses.

## 3. Objectives

- Add new expenses
- View existing expenses
- Update expenses
- Delete expenses
- Search expenses
- Calculate total expenses
- Validate expense amount
- Store data in a database
- Provide REST API support

## 4. Technologies Used

- HTML
- CSS
- JavaScript
- Python
- Django
- Django REST Framework
- SQLite
- Git/GitHub
- Postman

## 5. CRUD Operations

### Create
Add a new expense.

### Read
Display stored expenses.

### Update
Edit an existing expense.

### Delete
Remove an expense.

## 6. Database

The project uses SQLite.

### Expense Fields

- ID
- Title
- Amount
- Category
- Date

## 7. API Endpoints

GET:
`/api/expenses/`

POST:
`/api/expenses/`

GET single expense:
`/api/expenses/<id>/`

PUT:
`/api/expenses/<id>/`

DELETE:
`/api/expenses/<id>/`

## 8. Validation

The application checks that the expense amount is greater than zero.

Invalid values are rejected with an error message.

## 9. Project Structure

ExpenseTracker/
- config/
- expenses/
- frontend/
- venv/
- manage.py
- db.sqlite3
- README.md

## 10. How to Run

Activate the virtual environment:

`venv\Scripts\activate`

Start the Django server:

`python manage.py runserver`

Open:

`http://127.0.0.1:8000/api/expenses/`

The frontend can be opened using Live Server.

## 11. Future Enhancements

- User login and authentication
- Expense charts and graphs
- Monthly reports
- Export expenses to CSV/PDF
- Budget management
- Cloud database
- Mobile application