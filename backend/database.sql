-- shema 

--création de la base de données
CREATE DATABASE pernstack;

--utiliser la base de données
USE pernstack;

--crée la table 
CREATE TABLE todo (
      todo_id SERIAL  PRIMARY KEY,
      description VARCHAR(255)
);