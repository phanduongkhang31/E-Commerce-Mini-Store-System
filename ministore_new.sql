-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2026 at 02:40 PM
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
-- Database: `ministore_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`) VALUES
(1, 'Thời trang', 'thoi-trang', '2026-01-25 09:41:10'),
(2, 'Điện tử', 'dien-tu', '2026-01-25 09:41:10'),
(3, 'Nhà cửa', 'nha-cua', '2026-01-25 09:41:10');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `sale_price` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `thumb` varchar(500) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `rating` decimal(2,1) NOT NULL DEFAULT 4.5,
  `review_count` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `price`, `sale_price`, `description`, `thumb`, `stock`, `rating`, `review_count`, `is_active`, `created_at`) VALUES
(1, 1, 'Áo thun trắng basic', 149000, 129000, 'Cotton 100%, form basic dễ phối đồ.', 'https://i.postimg.cc/tYCwzVvw/Ao-thun-trang.png', 60, 4.7, 210, 1, '2026-01-25 09:41:10'),
(2, 1, 'Áo polo nam', 249000, 219000, 'Vải cá sấu thoáng mát, lịch sự.', 'https://i.postimg.cc/4H3Ppp49/ao-polo-nam.png', 45, 4.6, 150, 1, '2026-01-25 09:41:10'),
(3, 1, 'Áo sơ mi trắng', 299000, 269000, 'Form chuẩn đi học/đi làm.', 'https://i.postimg.cc/HjP4fcsQ/ao-so-mi-trang.png', 35, 4.6, 72, 1, '2026-01-25 09:41:10'),
(4, 1, 'Quần jeans slim fit', 399000, 349000, 'Co giãn nhẹ, bền màu.', 'https://i.postimg.cc/0620Tpm0/Quan-jeans-slim-fit.png', 28, 4.5, 98, 1, '2026-01-25 09:41:10'),
(5, 1, 'Áo hoodie nỉ', 429000, 389000, 'Nỉ dày vừa, giữ ấm tốt.', 'https://i.postimg.cc/yWW0X1XQ/Ao-hoodie-ni.png', 22, 4.7, 110, 1, '2026-01-25 09:41:10'),
(6, 1, 'Giày sneaker trắng', 599000, 529000, 'Đế êm, dễ phối đồ.', 'https://i.postimg.cc/cKsnK0LX/giay-sneaker.png', 20, 4.7, 130, 1, '2026-01-25 09:41:10'),
(7, 2, 'Chuột không dây', 129000, 0, 'Pin lâu, click êm, phù hợp văn phòng.', 'https://i.postimg.cc/HVXcBVJZ/chuot-khong-day.png', 80, 4.6, 120, 1, '2026-01-25 09:41:10'),
(8, 2, 'Bàn phím không dây', 499000, 0, 'Gõ êm, thiết kế gọn.', 'https://i.postimg.cc/sQM1SXdJ/ban-phim-khong-day.png', 25, 4.5, 52, 1, '2026-01-25 09:41:10'),
(9, 2, 'Tai nghe Bluetooth', 349000, 0, 'Kết nối ổn định, pin ~20h.', 'https://i.postimg.cc/2q65R65w/tai-nghe-bluetooth.png', 40, 4.6, 140, 1, '2026-01-25 09:41:10'),
(10, 2, 'Loa Bluetooth mini', 299000, 0, 'Âm thanh rõ, nhỏ gọn.', 'https://i.postimg.cc/dLYtQn1B/loa-bluetooth-mini.png', 30, 4.5, 88, 1, '2026-01-25 09:41:10'),
(11, 2, 'Sạc nhanh 20W', 159000, 0, 'Sạc PD 20W an toàn.', 'https://i.postimg.cc/jnQTJ05N/sac-nhanh-20w.png', 60, 4.7, 95, 1, '2026-01-25 09:41:10'),
(12, 2, 'Cáp Type-C 1m', 59000, 0, 'Hỗ trợ sạc nhanh, bền bỉ.', 'https://i.postimg.cc/ZBN44yzv/cap-typec-1m.png', 120, 4.5, 64, 1, '2026-01-25 09:41:10'),
(13, 3, 'Bình gốm trang trí', 499000, 449000, 'Phong cách tối giản, hợp phòng khách.', 'https://i.postimg.cc/7bDZwmbz/binh-gom-trang-tri.png', 20, 4.8, 76, 1, '2026-01-25 09:41:10'),
(14, 3, 'Đèn bàn trang trí', 259000, 0, 'Ánh sáng ấm, phù hợp phòng ngủ.', 'https://i.postimg.cc/hJTKqdBb/den-ban-trang-tri.png', 45, 4.6, 63, 1, '2026-01-25 09:41:10'),
(15, 3, 'Nến thơm', 159000, 0, 'Hương nhẹ, thư giãn.', 'https://i.postimg.cc/nCrZh5x7/nen-thom.png', 70, 4.5, 90, 1, '2026-01-25 09:41:10'),
(16, 3, 'Thảm trải sàn', 459000, 399000, 'Chống trượt, dễ vệ sinh.', 'https://i.postimg.cc/BLN9q5w2/tham-trai-san.png', 18, 4.6, 66, 1, '2026-01-25 09:41:10'),
(17, 3, 'Đồng hồ treo tường', 349000, 299000, 'Thiết kế tối giản, chạy êm.', 'https://i.postimg.cc/9RmKNRFX/dong-ho-treo-tuong.png', 25, 4.5, 48, 1, '2026-01-25 09:41:10'),
(18, 3, 'Cây cảnh để bàn', 199000, 0, 'Trang trí bàn làm việc, không gian xanh.', 'https://i.postimg.cc/HctHr1jk/cay-canh-de-ban.png', 60, 4.5, 83, 1, '2026-01-25 09:41:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password_hash`, `role`, `created_at`) VALUES
(3, 'taingo', 'c@gmail.com', NULL, '$2y$10$1oHr1QxRAIaS93pfUWZmUONzjKagwEcVhBhGyurlFjJR1oRvCZcsa', 'user', '2026-01-29 08:57:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
