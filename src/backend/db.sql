CREATE TABLE `Applications` (
    `Application_ID` int NOT NULL AUTO_INCREMENT,
    `Job_ID` int,
    `Applicant_Name` varchar(255),
    `Applicant_Email` varchar(255),
    `Applicant_Phone` varchar(20),
    `Applicant_Links` varchar(255),
    `Applicant_Status` enum('Accepted', 'Rejected'),
    `Applicant_Legal` tinyint(1),
    `Application_Date` date,
    `Applicant_Resume` varchar(255),
    PRIMARY KEY (`Application_ID`)
) ENGINE=InnoDB,
  CHARSET=utf8mb4,
  COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `HR` (
    `Employee_ID` int NOT NULL AUTO_INCREMENT,
    `Employee_Name` varchar(255),
    `Employee_Email` varchar(255),
    `Employee_Password` varchar(255),
    PRIMARY KEY (`Employee_ID`)
) ENGINE=InnoDB,
  CHARSET=utf8mb4,
  COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Jobs` (
    `Job_ID` int NOT NULL AUTO_INCREMENT,
    `HR_Creator` int,
    `Job_Name` varchar(255),
    `Job_Posting` text,
    `Applicant_Count` int,
    PRIMARY KEY (`Job_ID`)
) ENGINE=InnoDB,
  CHARSET=utf8mb4,
  COLLATE=utf8mb4_0900_ai_ci;
