-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- Dump data of "user" -------------------------------------
INSERT INTO `user`(`id`,`roleId`,`departementId`,`nik`,`name`,`username`,`password`,`improvement`,`picture`,`active`,`createdAt`,`updatedAt`) VALUES 
( '1', '1', '1', '123456789', 'Dea Pratiwi Putri', 'gardea', '$2b$10$kqm1wVGcQqoYjZCW8mcAGuD4xmzLyovS8jCddxDNXtvSXSNgWYB2C', 'A23 E', NULL, '1', '2019-10-23 23:37:10.364925', '2019-10-23 23:37:10.364925' );
-- ---------------------------------------------------------


-- Dump data of "departement" ------------------------------
INSERT INTO `departement`(`id`,`code`,`name`,`createdAt`,`updatedAt`) VALUES 
( '1', 'mtn', 'MTN', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' ),
( '2', 'produksi', 'PRODUKSI', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' ),
( '3', 'rmpm', 'RMPM', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' ),
( '4', 'among-rmpm', 'AMONG RMPM', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' ),
( '5', 'fg', 'FG', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' ),
( '6', 'among-fg', 'AMONG FG', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' ),
( '7', 'preparasi', 'PREPARASI', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' ),
( '8', 'ecolab', 'ECOLAB', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' ),
( '9', 'enseval', 'ENSEVAL', '2019-10-27 19:09:20.508980', '2019-10-27 19:09:20.508980' );
-- ---------------------------------------------------------


-- Dump data of "presence" ---------------------------------
-- ---------------------------------------------------------


-- Dump data of "user_role" --------------------------------
INSERT INTO `user_role`(`id`,`name`,`createdAt`,`updatedAt`) VALUES 
( '1', 'admin', '2019-10-23 23:32:46.404346', '2019-10-23 23:32:46.404346' ),
( '2', 'employee', '2019-10-23 23:33:33.375572', '2019-10-23 23:33:33.375572' );
-- ---------------------------------------------------------


-- Dump data of "presence_type" ----------------------------
INSERT INTO `presence_type`(`id`,`code`,`name`,`createdAt`,`updatedAt`,`startTime`,`endTime`) VALUES 
( '1', 'breakfast', 'Breakfast', '2019-10-28 20:13:22.231138', '2019-10-28 20:13:22.231138', '06:00', '10:00' ),
( '2', 'lunch', 'Lunch', '2019-10-28 20:13:22.231138', '2019-10-28 20:13:22.231138', '10:00', '15:00' ),
( '3', 'afternoon-meal', 'Afternoon Meal', '2019-10-28 20:13:22.231138', '2019-10-28 20:13:22.231138', '15:00', '18:00' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


