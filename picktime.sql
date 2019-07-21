-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-07-2019 a las 18:42:52
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- create user
GRANT ALL PRIVILEGES ON *.* TO 'luciana'@'localhost' IDENTIFIED BY 'NewPassword!123';


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `picktime`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `application_styles`
--

CREATE TABLE `application_styles` (
  `id` int(11) NOT NULL,
  `background` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `application_styles`
--

INSERT INTO `application_styles` (`id`, `background`) VALUES
(1, 'red'),
(2, 'blue'),
(3, 'black');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `description` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `photo_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `dest_id_usr` int(11) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `description`, `photo_id`, `user_id`, `dest_id_usr`, `date`) VALUES
(4, 'nueva descripcion', 3, 4, 4, '2019-04-26 10:00:00'),
(5, 'Comentario de prueba', 4, 4, NULL, '2019-06-29 11:00:00'),
(7, 'Via lactea', 5, 4, NULL, '2019-06-29 12:00:00'),
(8, 'asdfasdf', 5, 4, NULL, '2019-07-02 01:00:00'),
(9, 'el eclipse estuvo genial!', 8, 6, NULL, '2019-07-20 00:00:00'),
(10, 'Quiero ver esa pelicula!', 5, 6, NULL, '2019-07-17 03:00:00'),
(11, 'me encanto esta foto!', 9, 5, NULL, '2019-07-17 04:00:00'),
(12, 'que lindoo', 9, 5, NULL, '2019-07-17 05:00:00'),
(13, 'aafasdf', 9, 5, NULL, '2019-07-17 06:00:00'),
(14, 'aaa', 4, 4, NULL, '2019-07-17 07:00:00'),
(17, 'a', 9, 4, NULL, '2019-07-17 08:00:00'),
(18, 'aa', 9, 4, NULL, '2019-07-17 09:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `photo` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `photos`
--

INSERT INTO `photos` (`id`, `photo`, `user_id`, `date`) VALUES
(3, 'http://as01.epimg.net/tikitakas/imagenes/2018/11/01/portada/1541090901_594075_1541091249_noticia_normal.jpg', 4, '2019-01-26'),
(4, './api/storage/resources/Investigacion_272983529_58835331_1024x576.jpg', 4, '2019-07-03'),
(5, './api/storage/resources/rey-leon-2019.jpg', 4, '2019-07-02'),
(7, './api/storage/resources/rey-leon-2019.jpg', 6, '2019-07-12'),
(8, './api/storage/resources/1366_2000.jpg', 6, '2019-07-17'),
(9, './api/storage/resources/54340900-vintage-roses-in-a-vase-over-a-girly-box-and-books.jpg', 5, '2019-07-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `lastName` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `rol` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `photo` varchar(256) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mail` varchar(256) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `rol`, `photo`, `mail`, `password`) VALUES
(4, 'mauro', 'mauro', 'user', './api/storage/resources/male-avatar1.png', 'mauro@mauro.com', '$2y$10$gbvL88byojU7Hgy9Pv3tTunEgSImwpAvR6OvebaeTwK.P7xrP.OLy'),
(5, 'pepe', 'pepe', 'user', 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-female-circle-pink-512.png', 'pepe@pepe.com', '$2y$10$B4ctqvs28DqKgF3HiepxKOE7rH0B9MgmwGtmY8ag1lMy6ahkvG7Jm'),
(6, 'luciana', 'luciana', 'admin', './api/storage/resources/images.png', 'luciana@luciana.com', '$2y$10$zD1meC0lukqro3Hoa9omE.L2U7TV5cnUobRElbxKuizxDGUNVNySm'),
(7, 'ana', 'ana', 'user', '', 'ana@ana.com', '$2y$10$NfNmOvbJJDfIy7qUWU0PH.aPhIW.EEvFCNkJQu.uGerVoB29i3pHK'),
(8, 'andres', 'andres', 'user', '', 'andres@andres.com', '$2y$10$.v15VZqM/gbv.4C7TDypEeRIc2lITYvoZK8YRlfv1mwFTWJskWDhG');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `application_styles`
--
ALTER TABLE `application_styles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_ibfk_1` (`user_id`),
  ADD KEY `id_photo` (`photo_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `application_styles`
--
ALTER TABLE `application_styles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
