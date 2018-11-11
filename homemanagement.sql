-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2017 at 06:53 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homemanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `UserId` varchar(50) NOT NULL,
  `FullName` varchar(20) NOT NULL,
  `Mobile` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `DateOfSignup` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`UserId`, `FullName`, `Mobile`, `Email`, `Password`, `DateOfSignup`) VALUES
('tanmoy.tanvir001', 'tanvir tanmoy', 1923839373, 'tanmoy.tanvir001@gmail.com', '123456', '19/08/2017');

-- --------------------------------------------------------

--
-- Table structure for table `adminsenttenant`
--

CREATE TABLE `adminsenttenant` (
  `MID` int(11) NOT NULL,
  `messageTo` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `messageFrom` varchar(50) NOT NULL,
  `message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adminsenttenant`
--

INSERT INTO `adminsenttenant` (`MID`, `messageTo`, `subject`, `messageFrom`, `message`) VALUES
(6, 'azgar', 'Warning', 'tanmoy.tanvir001', 'Suspicious activity ');

-- --------------------------------------------------------

--
-- Table structure for table `flatwanted`
--

CREATE TABLE `flatwanted` (
  `UserID` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `bedroom` int(11) NOT NULL,
  `toilet` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `sublocation` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `flatwanted`
--

INSERT INTO `flatwanted` (`UserID`, `category`, `bedroom`, `toilet`, `location`, `sublocation`) VALUES
('azgar', '\'Flat\'', 3, 2, 'Mohammapur', 'Lalmatia');

-- --------------------------------------------------------

--
-- Table structure for table `landlord`
--

CREATE TABLE `landlord` (
  `UserID` varchar(50) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `NID` int(11) NOT NULL,
  `Mobile` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `DateOfSignup` varchar(50) NOT NULL,
  `LastSeen` varchar(100) NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `landlord`
--

INSERT INTO `landlord` (`UserID`, `FullName`, `NID`, `Mobile`, `Email`, `Password`, `DateOfSignup`, `LastSeen`, `Status`) VALUES
('kamrul', 'Kamrul', 123456789, 1521210273, 'kamrul@gmail.com', '123456', '1995-11-02', '9/19/2017, 12:40:04 PM', '1'),
('tamim', 'tamim huda', 12345678, 1521210273, 'tamim@gmail.com', '123456', '19/09/2017', '9/19/2017, 12:41:12 PM', '1');

-- --------------------------------------------------------

--
-- Table structure for table `landlordinboxmessage`
--

CREATE TABLE `landlordinboxmessage` (
  `MID` int(11) NOT NULL,
  `messageTo` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `messageFrom` varchar(50) NOT NULL,
  `message` varchar(200) NOT NULL,
  `unread` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `landlordinboxmessage`
--

INSERT INTO `landlordinboxmessage` (`MID`, `messageTo`, `subject`, `messageFrom`, `message`, `unread`) VALUES
(12, 'kamrul', 'hello', 'azgar', 'nay', '0'),
(13, 'kamrul', 'Confirmation', 'azgar', 'I will contact with you soon. ', '0'),
(14, 'kamrul', 'About Flat', 'azgar', 'Something', '0'),
(15, 'kamrul', 'Test', 'azgar', 'Hi', '1');

-- --------------------------------------------------------

--
-- Table structure for table `landlordsentmessage`
--

CREATE TABLE `landlordsentmessage` (
  `MID` int(11) NOT NULL,
  `messageTo` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `messageFrom` varchar(50) NOT NULL,
  `message` varchar(200) NOT NULL,
  `unread` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `landlordsentmessage`
--

INSERT INTO `landlordsentmessage` (`MID`, `messageTo`, `subject`, `messageFrom`, `message`, `unread`) VALUES
(9, 'azgar', 'About Flat', 'kamrul', 'My contact number : 01521210273', 'read');

-- --------------------------------------------------------

--
-- Table structure for table `postedad`
--

CREATE TABLE `postedad` (
  `PostedBy` varchar(30) NOT NULL,
  `DateOfPost` varchar(100) NOT NULL,
  `RentType` varchar(20) NOT NULL,
  `BedRoom` int(11) NOT NULL,
  `SDDR` int(11) NOT NULL,
  `Kitchen` int(11) NOT NULL,
  `Toilet` int(11) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `Description` text NOT NULL,
  `TimesOfVisit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `postedad`
--

INSERT INTO `postedad` (`PostedBy`, `DateOfPost`, `RentType`, `BedRoom`, `SDDR`, `Kitchen`, `Toilet`, `Address`, `Description`, `TimesOfVisit`) VALUES
('kamrul', '9/19/2017, 11:02:42 AM', 'FLat', 3, 0, 1, 1, 'Area:Khilkhet;Road:40;House:11', 'No problem', 16),
('tamim', '9/19/2017, 12:41:03 PM', 'Apartment', 4, 1, 1, 3, 'Area:Banani;Road:10;House:60/9 H4', 'New Apartment', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `UserID` varchar(50) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `NID` int(11) NOT NULL,
  `Mobile` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `DateOfSignup` text NOT NULL,
  `LastSeen` varchar(100) NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`UserID`, `FullName`, `NID`, `Mobile`, `Email`, `Password`, `DateOfSignup`, `LastSeen`, `Status`) VALUES
('azgar', 'Azgar Hossain', 123456789, 1778358868, 'azgar@gmail.com', '12345', '1995-11-02', '9/19/2017, 12:38:50 PM', '1'),
('tamim', 'tamim huda', 122, 1521210273, 'tamim@gmail.com', '12345', '19/09/2017', '9/19/2017, 12:20:22 PM', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tenantinboxmessage`
--

CREATE TABLE `tenantinboxmessage` (
  `MID` int(11) NOT NULL,
  `messageTo` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `messageFrom` varchar(50) NOT NULL,
  `message` varchar(200) NOT NULL,
  `unread` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tenantinboxmessage`
--

INSERT INTO `tenantinboxmessage` (`MID`, `messageTo`, `subject`, `messageFrom`, `message`, `unread`) VALUES
(10, 'azgar', 'About Flat', 'kamrul', 'My contact number : 01521210273', 1),
(11, 'azgar', 'Warning', 'tanmoy.tanvir001', 'Suspicious activity ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tenantsentmessage`
--

CREATE TABLE `tenantsentmessage` (
  `MID` int(11) NOT NULL,
  `messageTo` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `messageFrom` varchar(50) NOT NULL,
  `message` varchar(200) NOT NULL,
  `unread` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tenantsentmessage`
--

INSERT INTO `tenantsentmessage` (`MID`, `messageTo`, `subject`, `messageFrom`, `message`, `unread`) VALUES
(12, 'kamrul', 'hello', 'azgar', 'nay', '1'),
(13, 'kamrul', 'Confirmation', 'azgar', 'I will contact with you soon. ', '1'),
(14, 'kamrul', 'About Flat', 'azgar', 'Something', '1'),
(15, 'kamrul', 'Test', 'azgar', 'Hi', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Email`);

--
-- Indexes for table `adminsenttenant`
--
ALTER TABLE `adminsenttenant`
  ADD PRIMARY KEY (`MID`);

--
-- Indexes for table `flatwanted`
--
ALTER TABLE `flatwanted`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `landlord`
--
ALTER TABLE `landlord`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `landlordinboxmessage`
--
ALTER TABLE `landlordinboxmessage`
  ADD PRIMARY KEY (`MID`);

--
-- Indexes for table `landlordsentmessage`
--
ALTER TABLE `landlordsentmessage`
  ADD PRIMARY KEY (`MID`);

--
-- Indexes for table `postedad`
--
ALTER TABLE `postedad`
  ADD PRIMARY KEY (`PostedBy`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `tenantinboxmessage`
--
ALTER TABLE `tenantinboxmessage`
  ADD PRIMARY KEY (`MID`);

--
-- Indexes for table `tenantsentmessage`
--
ALTER TABLE `tenantsentmessage`
  ADD PRIMARY KEY (`MID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminsenttenant`
--
ALTER TABLE `adminsenttenant`
  MODIFY `MID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `landlordinboxmessage`
--
ALTER TABLE `landlordinboxmessage`
  MODIFY `MID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `landlordsentmessage`
--
ALTER TABLE `landlordsentmessage`
  MODIFY `MID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tenantinboxmessage`
--
ALTER TABLE `tenantinboxmessage`
  MODIFY `MID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tenantsentmessage`
--
ALTER TABLE `tenantsentmessage`
  MODIFY `MID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
