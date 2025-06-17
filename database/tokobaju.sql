-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Jun 2025 pada 14.06
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

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
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
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
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_name`, `customer_age`, `customer_email`, `customer_phone_number`, `customer_address`, `password`, `created_at`, `updated_at`) VALUES
('CU0001', 'test', 0, 'test@gmail.com', '081234567890', '', '$2y$12$V96QtTRPLA6vNFi0HSGT5umgFH.Z7NDi6iqpLJwSZ8bbEgTqXYd6i', '2025-06-16 04:59:34', '2025-06-16 04:59:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
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
(13, '2025_03_26_095240_drop_order_id_and_quantity_from_shopping_cart', 1),
(14, '2025_06_16_085558_add_description_to_products_table', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_items`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `payments`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `material` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `category`, `price`, `quantity`, `material`, `color`, `description`, `image`, `created_at`, `updated_at`) VALUES
('P0002', 'Royal Thread', 'Shirt', 399000.00, 100, 'Katun', 'Putih', NULL, '/storage/products/SQMxWUVSw09HCt7v1QWWUqOIH6h7hA1crYgRghc1.jpg', '2025-06-16 00:20:48', '2025-06-16 00:23:46'),
('P0003', 'Velvet Crest', 'Shirt', 399000.00, 12, 'Katun', 'Putih', NULL, '/storage/products/9MTHRSuCKdShCSRqcxWY4z0V3AeMCokesByhShYF.jpg', '2025-06-16 00:21:55', '2025-06-16 00:23:50'),
('P0004', 'Ivory Stitch', 'Shirt', 399000.00, 34, 'Katun', 'Putih', NULL, '/storage/products/WNTS7USUMwgWD4IDLvvfG3X7z0lg81BtlG6M7H1n.jpg', '2025-06-16 00:22:36', '2025-06-16 00:23:53'),
('P0005', 'Chic Shorts', 'Shorts', 299000.00, 11, 'Katun', 'blue', NULL, '/storage/products/U3YM33Msn6xug7dmyp8GbhmVceYt8SplJFTFapQ6.jpg', '2025-06-16 00:27:46', '2025-06-16 04:13:10'),
('P0006', 'Urban Cut', 'Shorts', 299000.00, 12, 'asd', 'blue', NULL, '/storage/products/5mDGGveP7lnDqVk50I6Dj4EXnLuKUfiqeSOEmBN6.jpg', '2025-06-16 00:28:52', '2025-06-16 00:28:52'),
('P0007', 'Velvet Line', 'Shorts', 299000.00, 2, 'Katun', 'Biru', NULL, '/storage/products/N4seJIp6ok3rUauH7fW7V60ajhrU6D7NWUWewRa2.jpg', '2025-06-16 00:29:21', '2025-06-16 00:41:46'),
('P0008', 'Noble Fit', 'Shorts', 299000.00, 34, 'Katun', 'Biru', NULL, '/storage/products/lX5fKnT7GyEdQbI07GCMmWOmiMFSIq0hNzhdR2tO.jpg', '2025-06-16 00:29:39', '2025-06-16 00:29:39'),
('P0009', 'Polish Frame', 'Shirt', 499000.00, 2, 'Katun', 'biru', NULL, '/storage/products/nJyXeUAPGaLeyLkXxTXVaYRH0DNrBGue1T32liqP.jpg', '2025-06-16 04:44:22', '2025-06-16 04:44:22'),
('P0010', 'Storm Coat', 'Jacket', 999000.00, 2, 'Katun', 'Putih', NULL, '/storage/products/5XKzve0q5OClbVS1OQzC4BIgIXWAcukt56Km65HC.jpg', '2025-06-16 04:45:31', '2025-06-16 04:45:31'),
('P0011', 'Velvet Shield', 'Jacket', 999000.00, 3, 'Katun', 'Putih', NULL, '/storage/products/ibEwonLVYyoXJWGFfYYS8EWqSkjckiGYZpWeKC9K.jpg', '2025-06-16 04:45:54', '2025-06-16 04:45:54'),
('P0012', 'Urban Hide', 'Jacket', 999000.00, 4, 'Katun', 'Putih', NULL, '/storage/products/QkoMDmfxjrO7vmePt1ezW2a0hEgKcG28n35O0etc.jpg', '2025-06-16 04:46:13', '2025-06-16 04:46:32'),
('P0013', 'Prime Layer', 'Jacket', 999000.00, 4, 'Katun', 'Biru', NULL, '/storage/products/TFPfhJgG0BHmQtop1pYYfTVtGNxcmOXTZr7PyNN8.jpg', '2025-06-16 04:46:53', '2025-06-16 04:46:53'),
('P0014', 'Crown Fit', 'Hat', 1299000.00, 6, 'Katun', 'Hijau', NULL, '/storage/products/sMKoyYJk3r9H8ZYza7CFScrAl8R5ypEZVM5dSSMQ.jpg', '2025-06-16 04:47:42', '2025-06-16 04:47:42'),
('P0015', 'Velvet Cap', 'Hat', 1299000.00, 7, 'Katun', 'Putih', NULL, '/storage/products/DOAZ0FaoXTzi9U1ona0RMUlyutiGxkt1IG1JZVjs.jpg', '2025-06-16 04:47:59', '2025-06-16 04:47:59'),
('P0016', 'Luxe Dome', 'Hat', 1299000.00, 8, 'Katun', 'Hijau', NULL, '/storage/products/q57wE3NFw73u81Pik7hPoCRwDfgZpyXJS6V52byc.jpg', '2025-06-16 04:48:23', '2025-06-16 04:48:23'),
('P0017', 'Mono Peak', 'Hat', 1299000.00, 5, 'Katun', 'Putih', NULL, '/storage/products/HHEL11BXQ7kYjx9Lhx7ObsExZHuSAzZ06brB4w9T.jpg', '2025-06-16 04:48:52', '2025-06-16 04:48:52'),
('P0018', 'Silk Hood', 'Hoodie', 699000.00, 2, 'Katun', 'Putih', NULL, '/storage/products/89NZTltR6OoEHczo6YvMSp5LnoKT6Zk9JE6XcEJt.jpg', '2025-06-16 04:49:38', '2025-06-16 04:49:38'),
('P0019', 'Urban Drape', 'Hoodie', 699000.00, 1, 'Katun', 'Merah', NULL, '/storage/products/gKfxUY9v76V29hkxkQGKd93SJqYKTy4icWN2bSb9.jpg', '2025-06-16 04:50:00', '2025-06-16 04:50:00'),
('P0020', 'Noble Fleece', 'Hoodie', 699000.00, 1, 'Katun', 'biru', NULL, '/storage/products/CNpJSWmuCArF8W7pph4zuPC7UKYoVME7Ey7ENPIi.jpg', '2025-06-16 04:50:22', '2025-06-16 04:50:22'),
('P0021', 'Mono Shade', 'Hoodie', 699000.00, 6, 'Katun', 'Cokelat', NULL, '/storage/products/iiO1h2DGtICpzNYaa4Phj1u8Jzk9JxJ6mq8SrOL8.jpg', '2025-06-16 04:50:50', '2025-06-16 04:50:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reviews`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
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
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0CpfM25bSkmnqCZKj9MXu6EjFQjRU7sVTQi70I9t', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUmZ4djlFOVo1MW8xdEtTOE5DdUxDd0NQR2hnZ1p3MHNabHpYU2VwUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750074873);

-- --------------------------------------------------------

--
-- Struktur dari tabel `shopping_carts`
--

CREATE TABLE `shopping_carts` (
  `cart_id` varchar(255) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customers_customer_email_unique` (`customer_email`),
  ADD UNIQUE KEY `customers_customer_phone_number_unique` (`customer_phone_number`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`);

--
-- Indeks untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indeks untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `payments_order_id_foreign` (`order_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `reviews_product_id_foreign` (`product_id`),
  ADD KEY `reviews_customer_id_foreign` (`customer_id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `shopping_carts`
--
ALTER TABLE `shopping_carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `shopping_carts_customer_id_foreign` (`customer_id`),
  ADD KEY `shopping_carts_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `shopping_carts`
--
ALTER TABLE `shopping_carts`
  ADD CONSTRAINT `shopping_carts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shopping_carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
