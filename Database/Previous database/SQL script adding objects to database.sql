INSERT INTO Credentials (User_type, Login, Password) 
VALUES (N'Адміністратор', 'Zhenia_Matvienko', 'P@55w0rd_1');

INSERT INTO Credentials (User_type, Login, Password) 
VALUES (N'Адміністратор', 'Vova_Matus', 'P@55w0rd_2');

INSERT INTO Credentials (User_type, Login, Password) 
VALUES (N'Адміністратор', 'Tolik_Kasatkin', 'P@55w0rd_3');

INSERT INTO Credentials (User_type, Login, Password) 
VALUES (N'Адміністратор', 'Antoha_Pylypchuk', 'P@55w0rd_4');

INSERT INTO Credentials (User_type, Login, Password) 
VALUES (N'Студент', 'Sashko_Zhemik', 'P@55w0rd_5');

INSERT INTO Credentials (User_type, Login, Password) 
VALUES (N'Студент', 'Andriy_Kosiak', 'P@55w0rd_6');



INSERT INTO Study_groups (Study_group_name) 
VALUES (N'Системні адміністратори');

INSERT INTO Study_groups (Study_group_name) 
VALUES (N'Мережеві адміністратори');



INSERT INTO Students (Student_full_name, Study_group_ID) 
VALUES (N'Матвієнко Євгеній Олександрович', 1);

INSERT INTO Students (Student_full_name, Study_group_ID) 
VALUES (N'Матус Володимир Юрійович', 1);

INSERT INTO Students (Student_full_name, Study_group_ID) 
VALUES (N'Касаткін Анатолій Дмитрович', 2);

INSERT INTO Students (Student_full_name, Study_group_ID) 
VALUES (N'Пилипчук Антон Олегович', 1);

INSERT INTO Students (Student_full_name, Study_group_ID) 
VALUES (N'Жеміоніс Олександр Анатолійович', 2);

INSERT INTO Students (Student_full_name, Study_group_ID) 
VALUES (N'Косяк Андрій Сергійович', 2);



INSERT INTO Subjects (Subject_name, Subject_privacy_type, Accept_grades) 
VALUES (N'Прикладна теорія цифрових автоматів', N'Публічний', N'Дозволено');

INSERT INTO Subjects (Subject_name, Subject_privacy_type, Accept_grades) 
VALUES (N'Комп''ютерні системи', N'Публічний', N'Дозволено');

INSERT INTO Subjects (Subject_name, Subject_privacy_type, Accept_grades) 
VALUES (N'Системне програмне забезпечення', N'Приватний', N'Дозволено');

INSERT INTO Subjects (Subject_name, Subject_privacy_type, Accept_grades) 
VALUES (N'Технологічна практика', N'Приватний', N'Заборонено');

INSERT INTO Subjects (Subject_name, Subject_privacy_type, Accept_grades) 
VALUES (N'Вибрані розділи трудового права та основи підприємницької діяльності', N'Публічний', N'Заборонено');



INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (1, 1, 100);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (1, 2, 100);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (1, 3, 100);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (1, 4, 100);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (1, 5, 100);

INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (2, 1, 90);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (2, 2, 90);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (2, 3, 95);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (2, 4, 100);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (2, 5, 99);

INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (3, 1, 85);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (3, 2, 80);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (3, 3, 92);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (3, 4, 90);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (3, 5, 100);

INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (4, 1, 75);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (4, 2, 65);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (4, 3, 95);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (4, 4, 90);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (4, 5, 60);

INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (5, 1, 73);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (5, 2, 77);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (5, 3, 88);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (5, 4, 82);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (5, 5, 94);

INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (6, 1, 60);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (6, 2, 60);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (6, 3, 95);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (6, 4, 75);
INSERT INTO Grades (Student_ID, Subject_ID, Student_grades) 
VALUES (6, 5, 100);