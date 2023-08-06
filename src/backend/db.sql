CREATE TABLE `Applications` (
  `Application_ID` INT NOT NULL AUTO_INCREMENT,
  `Job_ID` INT,
  `Applicant_Name` VARCHAR(255),
  `Applicant_Email` VARCHAR(255),
  `Applicant_Phone` VARCHAR(20),
  `Applicant_Links` VARCHAR(255),
  `Applicant_Status` ENUM('Pending', 'Rejected', 'Accepted', 'Archived'),
  `Applicant_Legal` TINYINT(1),
  `Application_Date` DATE,
  `Applicant_Resume` VARCHAR(255),
  PRIMARY KEY (`Application_ID`)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `HR` (
  `Employee_ID` INT NOT NULL AUTO_INCREMENT,
  `Employee_Name` VARCHAR(255),
  `Employee_Email` VARCHAR(255),
  `Employee_Password` VARCHAR(255),
  PRIMARY KEY (`Employee_ID`)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Jobs` (
  `Job_ID` INT NOT NULL AUTO_INCREMENT,
  `HR_Creator_ID` INT NOT NULL,
  `Job_Name` VARCHAR(255),
  `Job_Salary` VARCHAR(255),
  `Job_Location` VARCHAR(255),
  `Job_Department` VARCHAR(255),
  `Job_Employment_Type` VARCHAR(255),
  `Job_Status` ENUM('open', 'closed', 'filled'),
  `Open_Application_Count` INT,
  `Rejected_Application_Count` INT,
  `Accepted_Application_Count` INT,
  `Job_Date_Posted` DATE,
  `Job_Description` LONGTEXT,
  `Job_Accepted_Email` LONGTEXT,
  `Job_Rejected_Email` LONGTEXT,
  PRIMARY KEY (`Job_ID`),
  UNIQUE KEY `Job_ID_UNIQUE` (`Job_ID`)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
