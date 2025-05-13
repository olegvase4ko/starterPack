# Sales Data Analysis

This project contains SQL queries to analyze sales data for an online store using SQLite.

## Database Structure

The `orders` table contains the following fields:

- `id`: Unique order identifier
- `customer`: Customer name
- `amount`: Order amount
- `order_date`: Date of the order

## Analysis Tasks

The `sales_analysis.sql` file contains queries for the following tasks:

### 1. Total Sales Volume for March 2024

```sql
SELECT SUM(amount) as "Total Sales Volume for March 2024"
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';
```

Expected result: 27,000

### 2. Top-Spending Customer

```sql
SELECT
    customer as "Customer Name",
    SUM(amount) as "Total Amount Spent"
FROM orders
GROUP BY customer
ORDER BY SUM(amount) DESC
LIMIT 1;
```

Expected result: Alice (20,000)

### 3. Average Order Value

```sql
SELECT AVG(amount) as "Average Order Value (Last 3 Months)"
FROM orders
WHERE order_date >= date('2024-01-01')
AND order_date <= date('2024-03-31');
```

Expected result: 6,000

## How to Use

1. Open SQLite Online or your preferred SQLite environment
2. Copy and paste the contents of `sales_analysis.sql`
3. Execute the queries in sequence
