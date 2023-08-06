select * from `Applications`;

select * from `HR`;

select * from `Jobs`;

#adding some data
INSERT INTO `HR` (`Employee_Name`,`Employee_Email`,`Employee_Password`) 
VALUES ('John Johnson', 'John.John@real-company.net', "Johns1987");

INSERT INTO `Jobs` (`HR_Creator_ID`,`Job_Name`, `Job_Description`,`Job_Salary`, `Job_Location`, `Job_Department`, `Job_Employment_Type`, `Job_Status`, `Open_Application_Count`, `Rejected_Application_Count`, `Accepted_Application_Count`, `Job_Date_Posted`)
VALUES (1, 'CEO', 'You gotta run the buisness and not do crime', '215,000,000-216,000,000', 'New York', 'Board of Directors', 'part-time', 'open', 3, 20, 1, now());

ALTER TABLE `Jobs`
DROP `Job_Posting`;

ALTER TABLE `Applications`
CHANGE `Applicant_Status` `Applicant_Status` ENUM   
("Pending", "Rejected", "Accepted", "Archived");

UPDATE `Jobs`
SET `Job_Date_Posted` = now() + `Job_ID`;

INSERT INTO `Applications` (`Job_ID`, `Applicant_Name`, `Applicant_Email`, `Applicant_Phone`, `Applicant_Links`, `Applicant_Status`, `Applicant_Legal`, `Application_Date`, `Applicant_Resume`) 
VALUES (1, "Sarah", "Sarah@jobless.com", "(123)456-7890", "google.com", "Accepted", 1, now(), "https://janderson2024.me/files/updated_resume.pdf");

#UPDATING APPLICANT_COUNT
UPDATE `Jobs`
SET `Open_Application_Count` = `Open_Application_Count` + 1
WHERE `Job_ID` = 1;

#("SELECT * FROM `Jobs` WHERE `Job_ID` = ?",[params.jobId])


DROP TABLE IF EXISTS `Jobs`;

CREATE TABLE IF NOT EXISTS `Jobs` (
  `Job_ID` INT NOT NULL AUTO_INCREMENT,
  `HR_Creator_ID` INT NOT NULL,
  `Job_Name` VARCHAR(255) NULL,
  `Job_Posting` LONGTEXT NULL,
  `Job_Salary` VARCHAR(255) NULL,
  `Job_Location` VARCHAR(255) NULL,
  `Job_Department` VARCHAR(255) NULL,
  `Job_Employment_Type` VARCHAR(255) NULL,
  `Job_Status` ENUM("open", "closed", "filled") NULL,
  `Open_Application_Count` INT NULL,
  `Rejected_Application_Count` INT NULL,
  `Accepted_Application_Count` INT NULL,
  PRIMARY KEY (`Job_ID`),
  UNIQUE INDEX `Job_ID_UNIQUE` (`Job_ID` ASC) VISIBLE
)
ENGINE = InnoDB;


SELECT Jobs.Job_ID, HR.Employee_Name, Jobs.Job_Name, Jobs.Job_Status, Jobs.Open_Application_Count, Jobs.Rejected_Application_Count, Jobs.Accepted_Application_Count from Jobs INNER JOIN HR ON Jobs.HR_Creator_ID = HR.Employee_ID;