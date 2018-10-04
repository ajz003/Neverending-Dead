CREATE DATABASE zombie_db;
USE zombie_db;

CREATE TABLE enemies
(
id INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
img VARCHAR(255) NOT NULL,
hp BIGINT NOT NULL,
attack BIGINT NOT NULL,
position INTEGER NOT NULL, 
PRIMARY KEY (id)
);

DESCRIBE enemies;

INSERT INTO enemies (name, img, hp, attack, position) VALUES ("Zombie", "https://c1.staticflickr.com/4/3084/2596483147_58d6bae3b1_b.jpg", "100", "20", "0");
INSERT INTO enemies (name, img, hp, attack, position) VALUES ("Lich King", "https://orig00.deviantart.net/b15b/f/2017/305/5/3/the_lich_king_by_ze_l-dbsdieg.jpg", "1000", "90", "1");
 
 
SELECT * FROM enemies;