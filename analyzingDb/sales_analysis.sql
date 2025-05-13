-- Create and populate the orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- Task 1: Calculate total sales volume for March 2024
SELECT 
    SUM(amount) as "Total Sales Volume for March 2024"
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- Task 2: Find the customer who spent the most overall
SELECT 
    customer as "Customer Name",
    SUM(amount) as "Total Amount Spent"
FROM orders
GROUP BY customer
ORDER BY SUM(amount) DESC
LIMIT 1;

-- Task 3: Calculate average order value for the last three months
SELECT 
    AVG(amount) as "Average Order Value (Last 3 Months)"
FROM orders
WHERE order_date >= date('2024-01-01')
AND order_date <= date('2024-03-31');


