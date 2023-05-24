CREATE DATABASE Paranormal_distribution;
ALTER DATABASE Paranormal_distribution COLLATE utf8_danish_ci;
USE Paranormal_distribution; 



CREATE TABLE Credentials
(
	User_ID INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	User_type VARCHAR(13) NOT NULL
		CONSTRAINT User_type CHECK (User_type IN (N'Адміністратор', N'Студент')),
	Login VARCHAR(40) NOT NULL,
	Password VARCHAR(40) NOT NULL
);
ALTER TABLE Credentials CONVERT TO CHARACTER SET 'UTF8';



CREATE TABLE Study_groups
(
	Study_group_ID INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Study_group_name VARCHAR(23) NOT NULL
);
ALTER TABLE Study_groups CONVERT TO CHARACTER SET 'UTF8';



CREATE TABLE Students
(
	Student_ID INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Student_full_name VARCHAR(100) NOT NULL,
	Study_group_ID INTEGER NOT NULL
);
ALTER TABLE Students
	ADD FOREIGN KEY Include (Study_group_ID) REFERENCES Study_groups(Study_group_ID);
ALTER TABLE Students CONVERT TO CHARACTER SET 'UTF8';



CREATE TABLE Subjects
(
	Subject_ID INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Subject_name VARCHAR(100) NOT NULL,
	Subject_privacy_type VARCHAR(9) NOT NULL
		CONSTRAINT Subject_privacy_type CHECK (Subject_privacy_type IN (N'Приватний', N'Публічний')),
	Accept_grades VARCHAR(10) NOT NULL
		CONSTRAINT Accept_grades CHECK (Accept_grades IN (N'Заборонено', N'Дозволено'))
);
ALTER TABLE Subjects CONVERT TO CHARACTER SET 'UTF8';



CREATE TABLE Grades
(
	Student_ID INTEGER NOT NULL,
	Subject_ID INTEGER NOT NULL,
	Student_grades INTEGER NOT NULL
		CONSTRAINT Student_grades CHECK (Student_grades BETWEEN 60 AND 100)
);
ALTER TABLE Grades
	ADD PRIMARY KEY (Student_ID, Subject_ID);
ALTER TABLE Grades
	ADD FOREIGN KEY Receive (Student_ID) REFERENCES Students(Student_ID);
ALTER TABLE Grades
	ADD FOREIGN KEY Have (Subject_ID) REFERENCES Subjects(Subject_ID);
ALTER TABLE Grades CONVERT TO CHARACTER SET 'UTF8';