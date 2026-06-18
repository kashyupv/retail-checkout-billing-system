# Retail Checkout Billing System

## Overview

Retail Checkout Billing System is a lightweight web application that simulates a retail checkout process. Users can add multiple products, calculate subtotal, apply promotional discounts, compute GST, and generate a final receipt along with purchase metrics.
Retail Checkout Billing System is a simple web application developed using HTML, CSS, and JavaScript.

The application simulates a retail checkout process where users can:

- Add multiple products
- Enter product price and quantity
- Calculate subtotal
- Apply promotional discounts
- Calculate GST
- Generate a final receipt

---

## Features

### Product Management
- Add multiple products dynamically
- Remove products from the cart

### Billing Features
- Automatic subtotal calculation
- 10% discount on purchases above ₹5000
- GST calculation at 18%
- Final bill generation

### Validation
- Product name cannot be empty
- Price must be greater than zero
- Quantity must be greater than zero

### Purchase Metrics
- Number of products purchased
- Total quantity purchased
- Discount status
- Receipt generation timestamp

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

---

## Project Structure

checkout-billing-system/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── AI_NOTE.txt

---

## Assumptions

1. GST rate is fixed at 18%.
2. A discount of 10% is applied when the subtotal exceeds ₹5000.
3. Product price and quantity must be positive values.
4. All calculations are performed on the client side.

---

## How to Run the Application

### Option 1: Directly Open

Open the project folder and double-click:

index.html

The application will launch in the browser.

### Option 2: Using VS Code Live Server

1. Install the Live Server extension.
2. Right-click index.html.
3. Select "Open with Live Server".

---

## Sample Input

| Product | Price | Quantity |
|----------|---------|----------|
| Milk | 65 | 2 |
| Bread | 45 | 3 |
| Rice | 1200 | 5 |

---

## Sample Output

- Subtotal
- Discount
- GST
- Final Amount
- Purchase Metrics
- Retail Receipt

---

## Future Enhancements

- Product categories
- PDF receipt generation
- Database integration
- Inventory management
- User authentication

---

## Author

Engineering Graduate Assessment Submission