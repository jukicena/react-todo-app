CREATE DATABASE todo_sql;

USE todo_sql;

CREATE TABLE users (
	userId INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL,
    PRIMARY KEY (userId)
);

CREATE TABLE todos (
		todoId INT NOT NULL AUTO_INCREMENT,
		userId INT NOT NULL NOT NULL,
		todoName VARCHAR(3000) NOT NULL,
		isTodoDone ENUM('false', 'true') NOT NULL DEFAULT 'false',
		dateCreated DATETIME NOT NULL,
		dateTodoDone DATETIME NULL,
		PRIMARY KEY (todoId)
);
