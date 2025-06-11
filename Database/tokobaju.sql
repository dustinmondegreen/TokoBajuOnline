-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2025 at 09:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tokobaju`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_age` int(11) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone_number` varchar(255) NOT NULL,
  `customer_address` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_name`, `customer_age`, `customer_email`, `customer_phone_number`, `customer_address`, `password`, `created_at`, `updated_at`) VALUES
('CU0001', 'Alice Johnson', 28, 'alice@example.com', '081234567891', '123 Elm Street', 'hashedpassword1', NULL, NULL),
('CU0002', 'Bob Smith', 35, 'bob@example.com', '081234567892', '456 Oak Avenue', 'hashedpassword2', NULL, NULL),
('CU0004', 'David Williams', 22, 'david@example.com', '081234567894', '321 Maple Lane', 'hashedpassword4', NULL, NULL),
('CU0005', 'Emma Davis', 31, 'emma@example.com', '081234567895', '654 Cedar Boulevard', 'hashedpassword5', NULL, NULL),
('CU0006', 'William CS', 25, 'willy@example.com', '089912345678', 'Jl. Mawar No. 5, Jakarta', '$2y$12$fuXmhHNNTUW2Oh/lrCxTBeZlrlmaBQOXppqOdkZECpg/NUIobP6fu', '2025-04-24 07:21:56', '2025-04-24 08:00:11'),
('CU0007', 'Bambang', 0, 'bambang@gmail.com', '08111119191', '', '$2y$12$px6E7Fcr9FzjK7H81EG0o.z3OyETm.6l53A2TZb1AJFB8XwUN.Sfa', '2025-04-27 00:22:36', '2025-04-27 00:22:36'),
('CU0009', 'nic', 0, 'nic@gmail.com', '01823873', '', '$2y$12$zOv.CSb3RRszzn2ujM09IOk6kow/tULDzIjg1OomjSJ/pXcp/FZ3i', '2025-04-27 12:00:02', '2025-04-27 12:00:02'),
('CU0010', 'akbar', 19, 'akbar@gmail.com', '0812345678', 'jalan tanah abang', '$2y$12$1eh7QgbmV6Csj56eL/qM6e3G1oflASZ8xLQe90R/6eCjmHOikR50W', '2025-04-28 00:11:47', '2025-04-28 00:13:45');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_03_11_153500_create_customers_table', 1),
(2, '2025_03_11_154353_create_orders_table', 1),
(3, '2025_03_11_154353_create_products_table', 1),
(4, '2025_03_11_154353_create_shopping_carts_table', 1),
(5, '2025_03_11_154354_create_payments_table', 1),
(6, '2025_03_14_084153_create_reviews_table', 1),
(7, '2025_03_16_111534_create_sessions_table', 1),
(8, '2025_03_16_162613_create_cache_table', 1),
(9, '2025_03_26_075700_add_quantity_to_shopping_carts', 1),
(10, '2025_03_26_080943_add_order_id_to_shopping_carts', 1),
(11, '2025_03_26_090138_create_order_items', 1),
(12, '2025_03_26_095048_drop_quantity_from_shopping_cart', 1),
(13, '2025_03_26_095240_drop_order_id_and_quantity_from_shopping_cart', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(255) NOT NULL,
  `customer_id` varchar(255) DEFAULT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `order_status` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_date` date NOT NULL,
  `delivery_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `shipping_address`, `order_status`, `total_amount`, `order_date`, `delivery_date`, `created_at`, `updated_at`) VALUES
('O0001', 'CU0001', '123 Elm Street', 'Processing', 150.00, '2025-03-28', '2025-03-31', '2025-03-28 16:40:13', '2025-03-28 16:40:13'),
('O0002', 'CU0002', '456 Oak Avenue', 'Shipped', 200.00, '2025-03-28', '2025-04-02', '2025-03-28 16:40:13', '2025-03-28 16:40:13'),
('ORD1745775459', 'CU0007', 'jalan sandang', 'Pending', 29000.00, '2025-04-27', '2025-05-04', '2025-04-27 10:37:39', '2025-04-27 10:37:39'),
('ORD1745776396', 'CU0007', 'jallan merpati', 'Pending', 29000.00, '2025-04-27', '2025-05-04', '2025-04-27 10:53:16', '2025-04-27 10:53:16'),
('ORD1745776970', 'CU0007', 'jalan gagak', 'Pending', 100000.00, '2025-04-27', '2025-05-04', '2025-04-27 11:02:50', '2025-04-27 11:02:50'),
('ORD1745779325', 'CU0007', 'jalan sandang', 'Pending', 100000.00, '2025-04-27', '2025-05-04', '2025-04-27 11:42:05', '2025-04-27 11:42:05'),
('ORD1745779393', 'CU0007', 'jalan sandang', 'Pending', 29000.00, '2025-04-27', '2025-05-04', '2025-04-27 11:43:13', '2025-04-27 11:43:13'),
('ORD1745780458', 'CU0009', 'jalan kemanggisan', 'Pending', 100000.00, '2025-04-27', '2025-05-04', '2025-04-27 12:00:58', '2025-04-27 12:00:58'),
('ORD1745824470', 'CU0010', 'jalan tanah abang', 'Pending', 200000.00, '2025-04-28', '2025-05-05', '2025-04-28 00:14:30', '2025-04-28 00:14:30'),
('ORD1745824484', 'CU0010', 'jalan tanah abang', 'Pending', 200000.00, '2025-04-28', '2025-05-05', '2025-04-28 00:14:44', '2025-04-28 00:14:44'),
('ORD1747556138', 'CU0010', 'jalan tanah abang 3', 'Pending', 100000.00, '2025-05-18', '2025-05-25', '2025-05-18 01:15:38', '2025-05-18 01:15:38'),
('ORD1747556145', 'CU0010', 'jalan tanah abang 3', 'Pending', 100000.00, '2025-05-18', '2025-05-25', '2025-05-18 01:15:45', '2025-05-18 01:15:45'),
('ORD1747597180', 'CU0010', 'jalan tanah abang 61', 'Pending', 200000.00, '2025-05-18', '2025-05-25', '2025-05-18 12:39:40', '2025-05-18 12:39:40'),
('ORD1748235350', 'CU0010', 'jalan tanah abang', 'Pending', 600000.00, '2025-05-26', '2025-06-02', '2025-05-25 21:55:50', '2025-05-25 21:55:50'),
('ORD1748243322', 'CU0010', 'jalan tanah abang', 'Pending', 400000.00, '2025-05-26', '2025-06-02', '2025-05-26 00:08:42', '2025-05-26 00:08:42'),
('ORD1748243324', 'CU0010', 'jalan tanah abang', 'Pending', 400000.00, '2025-05-26', '2025-06-02', '2025-05-26 00:08:44', '2025-05-26 00:08:44'),
('ORD1748243334', 'CU0010', 'jalan tanah abang', 'Pending', 400000.00, '2025-05-26', '2025-06-02', '2025-05-26 00:08:54', '2025-05-26 00:08:54');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(20, 'ORD1745776970', 'P0007', 1, 100000.00, '2025-04-27 11:02:50', '2025-04-27 11:02:50'),
(24, 'ORD1745824470', 'P0009', 1, 200000.00, '2025-04-28 00:14:30', '2025-04-28 00:14:30'),
(25, 'ORD1745824484', 'P0009', 1, 200000.00, '2025-04-28 00:14:44', '2025-04-28 00:14:44'),
(26, 'ORD1747556138', 'P0007', 1, 100000.00, '2025-05-18 01:15:38', '2025-05-18 01:15:38'),
(27, 'ORD1747556145', 'P0007', 1, 100000.00, '2025-05-18 01:15:45', '2025-05-18 01:15:45'),
(28, 'ORD1747597180', 'P0009', 1, 200000.00, '2025-05-18 12:39:40', '2025-05-18 12:39:40'),
(29, 'ORD1748235350', 'P0009', 1, 200000.00, '2025-05-25 21:55:50', '2025-05-25 21:55:50'),
(30, 'ORD1748235350', 'P0018', 1, 400000.00, '2025-05-25 21:55:50', '2025-05-25 21:55:50'),
(31, 'ORD1748243322', 'P0018', 1, 400000.00, '2025-05-26 00:08:42', '2025-05-26 00:08:42'),
(32, 'ORD1748243324', 'P0018', 1, 400000.00, '2025-05-26 00:08:44', '2025-05-26 00:08:44'),
(33, 'ORD1748243334', 'P0018', 1, 400000.00, '2025-05-26 00:08:54', '2025-05-26 00:08:54');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `order_id`, `payment_status`, `payment_method`, `payment_date`, `created_at`, `updated_at`) VALUES
('PAY0001', 'O0001', 'Completed', 'E-Wallet', '2025-03-30', '2025-03-30 14:57:37', '2025-03-30 14:57:37'),
('PAY0002', 'O0002', 'Pending', 'Virtual Account', '2025-03-30', '2025-03-30 14:57:37', '2025-03-30 14:57:37'),
('PAY0004', 'O0001', 'Pending', 'e_wallet', '2025-03-30', '2025-03-30 08:36:05', '2025-03-30 08:36:05'),
('PAY0006', 'ORD1745775459', 'Pending', 'virtual_account', '2025-04-27', '2025-04-27 10:37:40', '2025-04-27 10:37:40'),
('PAY0007', 'ORD1745776396', 'Pending', 'e_wallet', '2025-04-27', '2025-04-27 10:53:17', '2025-04-27 10:53:17'),
('PAY0008', 'ORD1745776970', 'Pending', 'bank', '2025-04-27', '2025-04-27 11:02:51', '2025-04-27 11:02:51'),
('PAY0009', 'ORD1745779325', 'Pending', 'e_wallet', '2025-04-27', '2025-04-27 11:42:06', '2025-04-27 11:42:06'),
('PAY0010', 'ORD1745779393', 'Pending', 'virtual_account', '2025-04-27', '2025-04-27 11:43:14', '2025-04-27 11:43:14'),
('PAY0011', 'ORD1745780458', 'Pending', 'virtual_account', '2025-04-27', '2025-04-27 12:00:58', '2025-04-27 12:00:58'),
('PAY0012', 'ORD1745824484', 'Pending', 'e_wallet', '2025-04-28', '2025-04-28 00:14:45', '2025-04-28 00:14:45'),
('PAY0013', 'ORD1747556145', 'Pending', 'e_wallet', '2025-05-18', '2025-05-18 01:15:45', '2025-05-18 01:15:45'),
('PAY0014', 'ORD1747597180', 'Pending', 'virtual_account', '2025-05-18', '2025-05-18 12:39:41', '2025-05-18 12:39:41'),
('PAY0015', 'ORD1748235350', 'Pending', 'e_wallet', '2025-05-26', '2025-05-25 21:55:51', '2025-05-25 21:55:51'),
('PAY0016', 'ORD1748243334', 'Pending', 'e_wallet', '2025-05-26', '2025-05-26 00:08:55', '2025-05-26 00:08:55');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `material` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `category`, `price`, `quantity`, `material`, `color`, `image`, `created_at`, `updated_at`) VALUES
('P0007', 'baju bayi', 'sport', 100000.00, 4, 'carbon fibre', 'blue', '/storage/products/5QChJFarzxgjkNOHssZE7SyZe76x4GptKgNwjGmu.jpg', '2025-04-26 07:21:12', '2025-04-26 07:23:35'),
('P0009', 'kemeja', 'jacket', 200000.00, 40, 'kulit', 'cream', '/storage/products/vjeOoPA8CoZXbX3Qen2nk9cjs1nJzcmjXEWa2dcb.jpg', '2025-04-27 12:05:17', '2025-04-27 12:05:17'),
('P0010', 'Hoodie Hitam', 'Hoodie', 550000.00, 30, 'Cotton', 'Black', '/storage/products/7K1LL5LRjJGrSEgrGtoE8BPMSYxTZGMjF3C1AiNL.jpg', '2025-04-27 23:10:50', '2025-05-18 00:55:12'),
('P0011', 'Baju Polos', 'T-Shirt', 250000.00, 45, 'Cotton', 'White', '/storage/products/1ApuBwQXqDQYgmuaUpYXZlPldQ7hhIfEkgy1cdKk.jpg', '2025-04-27 23:13:17', '2025-04-27 23:13:17'),
('P0012', 'Rompi', 'Vest', 350000.00, 50, 'jeans', 'blue', '/storage/products/Dq7vr1zbVebsA1ibGZaCjLJOSwQRLSuFJqfHbncK.jpg', '2025-04-28 00:10:12', '2025-04-28 00:10:12'),
('P0013', 'T Shirt hitam', 'T-Shirt', 200000.00, 46, 'Cotton', 'Black', '/storage/products/D74UzYPcmazEQKzpM3MqvRUYXLbp1mHzSasFxiPR.jpg', '2025-05-18 23:39:02', '2025-05-18 23:39:02'),
('P0014', 'Brown Vest', 'Vest', 350000.00, 80, 'kulit', 'Brown', '/storage/products/4RWyZlHDRCjfx0O3hGZiBYVbO8X559SXUp9dSIfH.jpg', '2025-05-18 23:42:41', '2025-05-18 23:42:41'),
('P0015', 'Jaket Varsity', 'jacket', 1500000.00, 13, 'Cotton', 'White', '/storage/products/YpzH6fUAeh4pM4wYmEfVSZd8KRlsKO0vSK5tsWxu.jpg', '2025-05-18 23:45:27', '2025-05-18 23:45:27'),
('P0016', 'Brown Hoodie', 'Hoodie', 750000.00, 66, 'Cotton', 'Brown', '/storage/products/k1Z8hizHi4iuTERvPzhGzminCgjiO7ag1OMOb4sG.jpg', '2025-05-18 23:47:11', '2025-05-18 23:47:11'),
('P0017', 'Yellow T Shirt', 'T-Shirt', 260000.00, 50, 'Polyester', 'Yelloe', '/storage/products/8QxJ6M13csIZluagFQcDWUtuq3W2FJcTgXhvomAe.jpg', '2025-05-18 23:53:01', '2025-05-18 23:53:01'),
('P0018', 'Green Hoodie', 'Hoodie', 400000.00, 60, 'Cotton', 'Green', '/storage/products/cIYF28aDB8nxDUG97NKi2xsCyAfWcVRpWKsUc4ML.jpg', '2025-05-19 00:01:12', '2025-05-19 00:01:12'),
('P0019', 'Black Jacket', 'jacket', 450000.00, 50, 'Polyester', 'Black', '/storage/products/VZRnUtortGzLUDcH9USFBz2pa1MMbNYBzRBFs2KZ.jpg', '2025-05-19 00:09:03', '2025-05-19 00:09:03'),
('P0020', 'hoodie biru', 'Hoodie', 1000000.00, 70, 'cotton', 'Blue', '/storage/products/TWcj5xqiEFxJs12feamqC3tPbKF0ul9D9zBtD94n.jpg', '2025-05-26 00:10:39', '2025-05-26 00:10:39');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `review_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `product_id`, `customer_id`, `rating`, `review`, `review_date`, `created_at`, `updated_at`) VALUES
('REV0001', 'P0007', 'CU0010', 5, NULL, '2025-05-18', '2025-05-18 13:11:58', '2025-05-18 13:11:58'),
('REV0002', 'P0007', 'CU0010', 5, NULL, '2025-05-18', '2025-05-18 13:12:08', '2025-05-18 13:12:08'),
('REV0003', 'P0007', 'CU0010', 4, NULL, '2025-05-18', '2025-05-18 13:12:14', '2025-05-18 13:12:14'),
('REV0004', 'P0007', 'CU0010', 5, NULL, '2025-05-18', '2025-05-18 13:19:03', '2025-05-18 13:19:03'),
('REV0005', 'P0007', 'CU0010', 5, NULL, '2025-05-18', '2025-05-18 13:21:18', '2025-05-18 13:21:18'),
('REV0006', 'P0007', 'CU0010', 5, NULL, '2025-05-18', '2025-05-18 13:21:54', '2025-05-18 13:21:54'),
('REV0007', 'P0007', 'CU0010', 5, NULL, '2025-05-18', '2025-05-18 13:24:01', '2025-05-18 13:24:01'),
('REV0008', 'P0007', 'CU0009', 3, NULL, '2025-05-19', '2025-05-19 00:09:52', '2025-05-19 00:09:52'),
('REV0009', 'P0009', 'CU0009', 4, NULL, '2025-05-19', '2025-05-19 00:10:08', '2025-05-19 00:10:08'),
('REV0010', 'P0010', 'CU0009', 5, NULL, '2025-05-19', '2025-05-19 00:10:24', '2025-05-19 00:10:24');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3GOj8yGeVv0sa7UGTQ3DKxB6pUPp6dgiBPWZXC8H', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVUtJTmxkNXBMTG84bk9rSHlZN0tKdDhpOWFqWTJkRkFUZG8zVENDcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1748235321),
('7S5O6lDaKzP6busLkV2YqxmxOO1bpLVa7VKfCZ8g', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHZLUENQNVFQNWc5VXRWM0dESGhtSXZLdDZkOGZYelRtOXNTaUowSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745756021),
('cEvtpUGlJUFOC84R7UMcXcjnmbfHr5R2kl6iT0c3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRGFDUHE1NHA5RkdHUVNFbDlRalV3RVhQQVI2aWNLb3dTdjlYVExGdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1747579262),
('CEXmFn6DYPZnMzFEmheXJf7FNSArG4kIpqzdim5m', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRGJ2U1AyN0dNV3FlTERKM2pad0pVcnFKRHhldFJyZTFMYTh6dHpzVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745676494),
('cojsp0MclXjSq96z30HBmh3wCWrhMQpOHSMYK3wI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQTZqWWR6RE1Sd2tqZWtuc3R0TndwR25jTGU3RjhQNHE0aW4waE15eCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1747638543),
('EXM8ZITA6bPGUeF8xrtfq2ZAnef3SSLXnwXyo0zv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib1hZNDY5MW84cmlUMEZ1WWpEVHJrV1lKYmhhanN0cEoxeWdlS3VBUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cy9jcmVhdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1747417186),
('gpefnYIRHBmVytzmqSEx12T0HabaeLHrXS61icG7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY0hoMFROdDV6RnlQTTNOcTBOeW9JaUNyUFZVYThPOGRTTHBMNmJDeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cy9QMDAwOS9lZGl0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1745780723),
('gz8IqYJjlBPfl36rqcwiWnl0YN0zoNKnXhj4uQOv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZWNmd0hjMzFJMGplWnFQZ1dheXNYUlBNSlVESkU3aUdKV3F3ZmFNMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1749627436),
('WQHVFdndbzSkNUbytAKxecCdjPRfGQSKGlO5bvey', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSTBBbnJaTlI4N1ZiVFluSHp0YjdwbnFZQVBIQnhweWs5dXh3UWpzTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cy9jcmVhdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1748243507),
('x8xANuRjcrTtUIwevRPtyzVfb4XkVtpiu3ZK2VyE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRjh3Vm1GWlI4QkZWdndpNlRzN1o2OFFHMEFheWRTQUplYk1makZxRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745729311),
('xIXIyR1RLe2A3cFqNednQqmyZVy9rGkhHdeoX0mL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU004UllmN1VZUmhSYmhRR2dkalFiRzcyc1huQ0dkeUw3c2NhdjlkYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1747557202),
('XJSfJ4WM1pgLrQ8JwyTo4cG2HTpd4hb3SW45i9iE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY0NNM1dnMFdCZzNjellTb2xmaXQxbG95M2Y1YmFNTW1uS2VrUDNPeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745677415),
('ytxP3H1LBvtmJWxYg4uCYrioyJ9KtUn23GH3Zs35', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTTR0NUJ0UDd3WjFaMFR5RzdndDVodDdUTVBsdmd6ZjVYQlk5dkptVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cy9QMDAwNy9lZGl0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1745826457),
('ZfHXmlEmSAb8rrxBWvcBvichUvmt8rfhSHKxHJkW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOGtXeUZPZjJMS2RFMW8yM042a0JXeUpxazhOSkVhc2JtdGlFY0R5UyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745780682);

-- --------------------------------------------------------

--
-- Table structure for table `shopping_carts`
--

CREATE TABLE `shopping_carts` (
  `cart_id` varchar(255) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shopping_carts`
--

INSERT INTO `shopping_carts` (`cart_id`, `customer_id`, `product_id`, `created_at`, `updated_at`) VALUES
('CART0004', 'CU0009', 'P0009', '2025-05-18 23:50:50', '2025-05-18 23:50:50'),
('CART0006', 'CU0010', 'P0018', '2025-05-26 00:07:58', '2025-05-26 00:07:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customers_customer_email_unique` (`customer_email`),
  ADD UNIQUE KEY `customers_customer_phone_number_unique` (`customer_phone_number`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `payments_order_id_foreign` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `reviews_product_id_foreign` (`product_id`),
  ADD KEY `reviews_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shopping_carts`
--
ALTER TABLE `shopping_carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `shopping_carts_customer_id_foreign` (`customer_id`),
  ADD KEY `shopping_carts_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `shopping_carts`
--
ALTER TABLE `shopping_carts`
  ADD CONSTRAINT `shopping_carts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shopping_carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
