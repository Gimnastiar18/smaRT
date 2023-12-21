-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 21, 2023 at 02:08 PM
-- Server version: 8.0.30
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rt`
--

-- --------------------------------------------------------

--
-- Table structure for table `table_admin`
--

CREATE TABLE `table_admin` (
  `id_admin` int NOT NULL,
  `nama` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kata_sandi` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `keamanan` varchar(250) NOT NULL,
  `foto_profil` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Default_Profile.png',
  `jenis_kelamin` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `table_admin`
--

INSERT INTO `table_admin` (`id_admin`, `nama`, `email`, `kata_sandi`, `keamanan`, `foto_profil`, `jenis_kelamin`) VALUES
(1, 'Gilang Andri Asto', 'admin123@test.com', '$2b$10$I8vRlV7mIpyfMv8NFd1mwu46YI8d5p12b7/IwzB55PYVQcaCDkGdS', 'rt', 'Default_Profile.png', 'Laki-Laki');

-- --------------------------------------------------------

--
-- Table structure for table `table_arsip_surat`
--

CREATE TABLE `table_arsip_surat` (
  `id_surat_masuk` int NOT NULL,
  `id_surat` int NOT NULL,
  `id_user` int NOT NULL,
  `nama` varchar(45) NOT NULL,
  `nik` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tempat_lahir` varchar(45) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `jenis_kelamin` varchar(45) NOT NULL,
  `agama` varchar(45) NOT NULL,
  `alamat` varchar(45) NOT NULL,
  `waktu_diajukan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_status` int NOT NULL DEFAULT '1',
  `updated_time` datetime DEFAULT NULL,
  `no_surat` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `table_status`
--

CREATE TABLE `table_status` (
  `id_status` int NOT NULL,
  `nama_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `table_status`
--

INSERT INTO `table_status` (`id_status`, `nama_status`) VALUES
(1, 'Diajukan'),
(2, 'Ditolak'),
(3, 'Selesai');

-- --------------------------------------------------------

--
-- Table structure for table `table_surat`
--

CREATE TABLE `table_surat` (
  `id_surat` int NOT NULL,
  `singkatan` varchar(10) NOT NULL,
  `jenis_surat` varchar(45) NOT NULL,
  `isi_surat` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `table_surat`
--

INSERT INTO `table_surat` (`id_surat`, `singkatan`, `jenis_surat`, `isi_surat`) VALUES
(1, 'SKD', 'Surat Keterangan Domisili', 'Bahwa yang bersangkutan benar-benar penduduk di wilayah RT 11 Kelurahan Wanasari, Cibitung, Bekasi.\r\nBahwa yang bersangkutan memiliki alamat sesuai yang tercatat dalam data kependudukan RT 11.\r\nBahwa yang bersangkutan adalah warga yang baik dan taat aturan di lingkungan RT 11.'),
(2, 'SKU', 'Surat Keterangan Usaha', ''),
(3, 'SKTM', 'Surat Keterangan Tidak Mampu', ''),
(4, 'SPKTP', 'Surat Pengantar KTP', ''),
(5, 'SPKK', 'Surat Pengantar KK', ''),
(6, 'SKK', 'Surat Keterangan Kematian', ''),
(7, 'SPN', 'Surat Pengantar Nikah', ''),
(8, 'SPC', 'Surat Permohonan Cerai', ''),
(9, 'SKPO', 'Surat Keterangan Penghasilan Ortu', ''),
(10, 'SKBM', 'Surat Keterangan Belum Menikah', ''),
(11, 'SKBMR', 'Surat Keterangan Belum Memiliki Rumah', '');

-- --------------------------------------------------------

--
-- Table structure for table `table_user`
--

CREATE TABLE `table_user` (
  `id_user` int NOT NULL,
  `nama` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kata_sandi` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `keamanan` varchar(250) NOT NULL,
  `jenis_kelamin` varchar(45) DEFAULT NULL,
  `tanggal_lahir` varchar(45) DEFAULT NULL,
  `ktp` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `kk` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `foto_profil` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Default_Profile.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `table_admin`
--
ALTER TABLE `table_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `table_arsip_surat`
--
ALTER TABLE `table_arsip_surat`
  ADD PRIMARY KEY (`id_surat_masuk`),
  ADD KEY `id_user_idx` (`id_user`),
  ADD KEY `id_surat` (`id_surat`),
  ADD KEY `id_status` (`id_status`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `table_status`
--
ALTER TABLE `table_status`
  ADD PRIMARY KEY (`id_status`);

--
-- Indexes for table `table_surat`
--
ALTER TABLE `table_surat`
  ADD PRIMARY KEY (`id_surat`);

--
-- Indexes for table `table_user`
--
ALTER TABLE `table_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `table_admin`
--
ALTER TABLE `table_admin`
  MODIFY `id_admin` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `table_arsip_surat`
--
ALTER TABLE `table_arsip_surat`
  MODIFY `id_surat_masuk` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `table_status`
--
ALTER TABLE `table_status`
  MODIFY `id_status` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `table_surat`
--
ALTER TABLE `table_surat`
  MODIFY `id_surat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `table_user`
--
ALTER TABLE `table_user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `table_arsip_surat`
--
ALTER TABLE `table_arsip_surat`
  ADD CONSTRAINT `id_status` FOREIGN KEY (`id_status`) REFERENCES `table_status` (`id_status`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `id_surat` FOREIGN KEY (`id_surat`) REFERENCES `table_surat` (`id_surat`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `table_user` (`id_user`),
  ADD CONSTRAINT `updated_by` FOREIGN KEY (`updated_by`) REFERENCES `table_admin` (`id_admin`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
