# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.35)
# Database: wemall
# Generation Time: 2017-02-08 14:57:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `order` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL,
  `remark` varchar(1000) DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `name`, `order`, `parent_id`, `status`, `remark`, `create_at`, `update_at`)
VALUES
	(1,'电子产品',0,0,2,'这是一个备注','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(2,'书籍',0,0,2,'这是一个备注','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(3,'书籍2',0,0,2,'这是一个备注2','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(4,'书籍3',0,0,2,'这是一个备注3','2017-02-07 21:34:50','2017-02-07 21:34:50'),
	(8,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:11:58','2017-02-07 23:11:58'),
	(9,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:12:15','2017-02-07 23:12:15'),
	(10,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:12:32','2017-02-07 23:12:32'),
	(11,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:13:04','2017-02-07 23:13:04'),
	(12,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:13:36','2017-02-07 23:13:36'),
	(13,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:14:04','2017-02-07 23:14:04'),
	(14,'友好，在贺中系不断向前发展。 ',10000,0,2,'习近平在贺电中指出，中斯建交','2017-02-07 23:16:47','2017-02-07 23:16:47'),
	(15,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:18:11','2017-02-07 23:18:11'),
	(16,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:27:58','2017-02-07 23:27:58'),
	(17,'友好，在贺中系不断向前发展。 ',10000,0,2,'','2017-02-07 23:28:07','2017-02-07 23:28:07'),
	(18,'友好，在贺中系不断向前发展x。',1,0,2,'c','2017-02-07 23:29:12','2017-02-08 15:57:53');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `phone` varchar(20) DEFAULT '',
  `province` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `street` int(11) NOT NULL,
  `address` varchar(200) NOT NULL DEFAULT '',
  `zipcode` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;

INSERT INTO `contact` (`id`, `name`, `phone`, `province`, `city`, `street`, `address`, `zipcode`, `created_at`, `updated_at`)
VALUES
	(1,'shen100','13412345678',1,2,3,'湖北省XX市','432799','2017-01-10 12:05:34','2017-01-10 12:05:34');

/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `total_price` double NOT NULL,
  `payment` double NOT NULL,
  `freight` double DEFAULT '0' COMMENT '运费',
  `remark` text COMMENT '备注',
  `discount` int(11) DEFAULT '0',
  `deliver_start` datetime NOT NULL,
  `deliver_end` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `pay_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;

INSERT INTO `order` (`id`, `user_id`, `total_price`, `payment`, `freight`, `remark`, `discount`, `deliver_start`, `deliver_end`, `status`, `created_at`, `updated_at`, `pay_at`)
VALUES
	(1,1,22,22,0,NULL,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,'2017-02-04 01:00:00','2017-01-10 12:05:34','2017-02-04 01:00:00'),
	(2,6,33,33.5,0,NULL,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,'2017-02-05 01:00:00','2017-01-18 12:05:34','2017-02-05 01:00:00'),
	(3,7,45,45.4,0,NULL,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,'2017-02-05 01:00:00','2017-01-18 12:08:34','2017-02-05 01:00:00'),
	(4,8,55,55,0,NULL,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,'0000-00-00 00:00:00','2017-02-07 01:00:00','2017-02-07 01:00:00');

/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `browse_count` int(11) NOT NULL DEFAULT '0',
  `buy_count` int(11) NOT NULL DEFAULT '0',
  `total_sale` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `name`, `browse_count`, `buy_count`, `total_sale`)
VALUES
	(1,'iphone5 64G',1,2,3),
	(2,'三星galaxy XXX',11,22,33);

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) unsigned DEFAULT NULL COMMENT '默认地址',
  `open_id` text,
  `nickname` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(20) NOT NULL DEFAULT '',
  `token` text,
  `avatar` text,
  `sex` tinyint(1) DEFAULT NULL COMMENT '0:男;1:女',
  `subscribe` tinyint(1) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `lastip` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `contact_id`, `open_id`, `nickname`, `username`, `phone`, `password`, `token`, `avatar`, `sex`, `subscribe`, `status`, `lastip`, `created_at`, `updated_at`)
VALUES
	(1,1,'asdfafsafafafafafsfadfsadfasfaf','shen100','张三','13588889998','adaffasdfasdfafasfas','safafdasdfasdfasfsafafdaf',NULL,1,NULL,NULL,NULL,'2017-02-04 01:00:00','2017-02-04 01:00:00'),
	(6,1,'adsfsadadfafaf','shen100','李四','13444445555','adfafdadfasf','asfsafaf',NULL,1,NULL,NULL,NULL,'2017-02-05 01:00:00','2017-02-05 01:00:00'),
	(7,1,'sadfaafsafs','shen','MK','13555556666','bbbbb','NULLasfdsafaf',NULL,1,NULL,NULL,NULL,'2017-02-05 01:00:00','2017-02-05 01:00:00'),
	(8,1,'adfasfdafa','kk','aa','13333333333','adaf','asdfaf',NULL,0,NULL,NULL,NULL,'2017-02-07 01:00:00','2017-02-07 01:00:00');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
