-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `ngo_id` int NOT NULL,
  `name` varchar(160) NOT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `full_description` text,
  `location` varchar(160) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `ticket_price` decimal(10,2) DEFAULT '0.00',
  `currency` char(3) DEFAULT 'AUD',
  `goal_amount` decimal(12,2) DEFAULT NULL,
  `progress_amount` decimal(12,2) DEFAULT '0.00',
  `status` enum('draft','active','suspended','finished') DEFAULT 'draft',
  PRIMARY KEY (`event_id`),
  KEY `fk_event_ngo` (`ngo_id`),
  CONSTRAINT `fk_event_ngo` FOREIGN KEY (`ngo_id`) REFERENCES `ngo` (`ngo_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,1,'Outback Astronomy Night','Fund science kits for rural schools','A guided stargazing session in the desert with expert astronomers.','Alice Springs Desert Park, NT','2025-05-21 19:00:00','2025-05-21 23:00:00',45.00,'AUD',10000.00,3200.00,'active'),(2,1,'Mangrove Kayak Challenge','Support coastal restoration','Teams kayak through mangrove channels, raising awareness for habitat protection.','Darwin Harbour, NT','2025-08-15 08:00:00','2025-08-15 12:00:00',25.00,'AUD',8000.00,2100.00,'active'),(3,1,'Desert Film Screening','Provide solar lamps to remote communities','Open-air screening of independent desert-themed films.','Araluen Arts Centre, Alice Springs','2025-09-10 18:00:00','2025-09-10 21:00:00',15.00,'AUD',5000.00,1000.00,'draft'),(4,2,'Penguin Parade Charity Walk','Raise funds for seabird sanctuaries','Evening walk alongside penguin colonies with conservation experts.','Phillip Island, VIC','2025-07-03 16:00:00','2025-07-03 19:00:00',20.00,'AUD',7000.00,2500.00,'active'),(5,2,'Seabird Sketch Exhibition','Art therapy for coastal communities','Exhibition of sketches and paintings featuring seabirds by local artists.','Tasmanian Museum and Art Gallery, Hobart','2025-10-19 10:00:00','2025-10-19 17:00:00',30.00,'AUD',6000.00,1200.00,'active'),(6,2,'Harbour Lighthouse Gala','Restore historic lighthouse facilities','Formal dinner and auction held at a lighthouse.','Cape Bruny Lighthouse, TAS','2025-12-02 18:00:00','2025-12-02 23:30:00',100.00,'AUD',20000.00,5000.00,'draft'),(7,3,'Rainforest Tree Planting','Plant 5000 trees in degraded areas','Volunteer-led planting of native rainforest species.','Daintree Rainforest, QLD','2025-06-12 09:00:00','2025-06-12 15:00:00',0.00,'AUD',12000.00,4000.00,'active'),(8,3,'Coral Reef Concert','Support reef clean-up programs','Live music on the beach with proceeds to coral reef projects.','Cairns Esplanade, QLD','2025-11-04 17:00:00','2025-11-04 21:00:00',60.00,'AUD',15000.00,5200.00,'active'),(9,3,'Midnight Library Readathon','Fund mobile libraries','Participants read aloud all night in a symbolic marathon.','Adelaide City Library, SA','2025-09-25 20:00:00','2025-09-26 08:00:00',10.00,'AUD',4000.00,1900.00,'active'),(10,3,'Vintage Train Ride for Charity','Support mental health helplines','A heritage train ride experience through scenic routes.','Belair Line, Adelaide Hills, SA','2025-10-05 10:00:00','2025-10-05 15:00:00',70.00,'AUD',18000.00,6400.00,'active'),(11,3,'Starlight Coding Hackathon','Fund youth coding bootcamps','48-hour hackathon with mentorship, supporting young coders.','Innovation Hub, Adelaide, SA','2025-11-18 09:00:00','2025-11-19 21:00:00',35.00,'AUD',9000.00,3000.00,'active');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ngo`
--

DROP TABLE IF EXISTS `ngo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ngo` (
  `ngo_id` int NOT NULL AUTO_INCREMENT,
  `ngo_name` varchar(120) NOT NULL,
  `hq_location` varchar(120) DEFAULT NULL,
  `contact_email` varchar(190) DEFAULT NULL,
  PRIMARY KEY (`ngo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ngo`
--

LOCK TABLES `ngo` WRITE;
/*!40000 ALTER TABLE `ngo` DISABLE KEYS */;
INSERT INTO `ngo` VALUES (1,'Aurora Relief','Darwin, Australia','contact@aurorarelief.org'),(2,'Seabird Conservation Alliance','Hobart, Australia','info@seabirdalliance.org'),(3,'Horizon Health Network','Adelaide, Australia','hello@horizonhealth.org');
/*!40000 ALTER TABLE `ngo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration` (
  `registration_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(190) DEFAULT NULL,
  `registered_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `payment_status` enum('paid','pending','free') DEFAULT 'free',
  PRIMARY KEY (`registration_id`),
  KEY `fk_reg_event` (`event_id`),
  CONSTRAINT `fk_reg_event` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
INSERT INTO `registration` VALUES (1,1,'Quentin Zhao','quentin.zhao@gmail.com','2025-10-02 21:55:19','paid'),(2,1,'Marisol Ortega','marisol.ortega@gmail.com','2025-10-02 21:55:19','pending'),(3,2,'Leif Gunnarsson','leif.gunnarsson@gmail.com','2025-10-02 21:55:19','paid'),(4,2,'Soraya El-Amin','soraya.elamin@gmail.com','2025-10-02 21:55:19','free'),(5,2,'Takumi Arai','takumi.arai@gmail.com','2025-10-02 21:55:19','paid'),(6,3,'Beatrix Novák','beatrix.novak@gmail.com','2025-10-02 21:55:19','pending'),(7,3,'Oluwaseun Adeyemi','oluwaseun.adeyemi@gmail.com','2025-10-02 21:55:19','paid'),(8,4,'Yara Haddad','yara.haddad@gmail.com','2025-10-02 21:55:19','paid'),(9,4,'Mateo Ferreira','mateo.ferreira@gmail.com','2025-10-02 21:55:19','free'),(10,5,'Svetlana Kuznetsova','svetlana.k@gmail.com','2025-10-02 21:55:19','paid'),(11,5,'Ibrahim Diallo','ibrahim.diallo@gmail.com','2025-10-02 21:55:19','pending'),(12,6,'Chike Obi','chike.obi@gmail.com','2025-10-02 21:55:19','paid'),(13,7,'Nia Mbatha','nia.mbatha@gmail.com','2025-10-02 21:55:19','free'),(14,7,'Hideo Sato','hideo.sato@gmail.com','2025-10-02 21:55:19','paid'),(15,8,'Anouk van Dijk','anouk.vandijk@gmail.com','2025-10-02 21:55:19','pending'),(16,8,'Kofi Mensah','kofi.mensah@gmail.com','2025-10-02 21:55:19','paid'),(17,9,'Giulia Romano','giulia.romano@gmail.com','2025-10-02 21:55:19','paid'),(18,9,'Linh Tran','linh.tran@gmail.com','2025-10-02 21:55:19','pending'),(19,10,'Tomasz Zielinski','tomasz.zielinski@gmail.com','2025-10-02 21:55:19','paid'),(20,10,'Fatima Noor','fatima.noor@gmail.com','2025-10-02 21:55:19','free'),(21,11,'Jonas Bergström','jonas.bergstrom@gmail.com','2025-10-02 21:55:19','paid'),(22,11,'Ayesha Rahman','ayesha.rahman@gmail.com','2025-10-02 21:55:19','pending');
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-02 21:56:30
