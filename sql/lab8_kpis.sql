/*lab 8 database query*/
/*1.KPI-total_revenue------------------*/
SELECT
    SUM(total) AS total_revenue,
    COUNT(*) AS number_of_orders,
    ROUND(AVG(total), 2) AS avg_order_value
FROM "orderr"
WHERE status != 'Cancelled';

/*2.KPI-Number of customers------------------*/
SELECT COUNT(DISTINCT customer_id) AS number_of_customers
FROM "orderr"
WHERE status != 'Cancelled';

/*3.KPI-Top Selling products------------------*/
SELECT
    p.name,
    SUM(oi.quantity) AS units_sold
FROM order_item oi
JOIN product p
    ON oi.product_id = p.product_id
GROUP BY p.name
ORDER BY units_sold DESC
LIMIT 10;

/*4.KPI-Revenue by Category------------------*/
SELECT
    c.category_name,
    SUM(oi.quantity * oi.price) AS category_revenue
FROM order_item oi
JOIN product p
    ON oi.product_id = p.product_id
JOIN category c
    ON p.category_id = c.category_id
GROUP BY c.category_name
ORDER BY category_revenue DESC;

/*5.KPI-Monthly Sales Trend------------------*/
SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS monthly_revenue
FROM "orderr"
WHERE status != 'Cancelled'
GROUP BY month
ORDER BY month;

/*6.KPI-Order Status Distribution------------------*/
SELECT
    status,
    COUNT(*) AS orders
FROM "orderr"
GROUP BY status;
