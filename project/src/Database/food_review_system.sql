DROP DATABASE IF EXISTS food_review_system;

CREATE DATABASE food_review_system;

USE food_review_system;


-- Table for users
CREATE TABLE IF NOT EXISTS USER (
    Username VARCHAR(50) PRIMARY KEY,
    First_name VARCHAR(50),
    Middle_name VARCHAR(50),
    Last_name VARCHAR(50),
    Password VARCHAR(255),
    Email VARCHAR(100),
    Age INT,
    Birthday DATE,
    No_of_reviews INT
    -- CONSTRAINT fk_user_reviews FOREIGN KEY (Username) REFERENCES USER_REVIEWS_FOOD_ESTABLISHMENT(Username)
);

-- Table for food establishments
CREATE TABLE IF NOT EXISTS FOOD_ESTABLISHMENT (
    Establishment_id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Description TEXT,
    Address VARCHAR(255),
    Type VARCHAR(50)
    -- CONSTRAINT fk_food_establishment_reviews FOREIGN KEY (Establishment_id) REFERENCES USER_REVIEWS_FOOD_ESTABLISHMENT(Establishment_id)
);

CREATE TABLE IF NOT EXISTS USER_REVIEWS_FOOD_ESTABLISHMENT (
    Username VARCHAR(50),
    Establishment_id INT,
    review TEXT,
    Review_date_time DATETIME,
    Rating DECIMAL(3,2),
    PRIMARY KEY (Username, Establishment_id),
    CONSTRAINT fk_user_reviews FOREIGN KEY (Username) REFERENCES USER(Username),
    CONSTRAINT fk_food_establishment_reviews FOREIGN KEY (Establishment_id) REFERENCES FOOD_ESTABLISHMENT(Establishment_id)
);

-- Table for linkss related to food establishments
CREATE TABLE IF NOT EXISTS FOOD_ESTABLISHMENT_links (
    Establishment_id INT,
    links VARCHAR(255),
    PRIMARY KEY (Establishment_id, links),
    CONSTRAINT fk_food_establishment_links FOREIGN KEY (Establishment_id) REFERENCES FOOD_ESTABLISHMENT(Establishment_id)
);

-- Table for contact numbers of food establishments
CREATE TABLE IF NOT EXISTS FOOD_ESTABLISHMENT_CONTACT_NO (
    Establishment_id INT,
    Contact_no VARCHAR(20),
    PRIMARY KEY (Establishment_id, Contact_no),
    CONSTRAINT fk_food_establishment_contact FOREIGN KEY (Establishment_id) REFERENCES FOOD_ESTABLISHMENT(Establishment_id)
);

-- Table for food items
CREATE TABLE IF NOT EXISTS FOOD_ITEM (
    Item_id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Description TEXT,
    Price DECIMAL(10,2),
    Food_type VARCHAR(50),
    Establishment_id INT,
    CONSTRAINT fk_food_item_establishment FOREIGN KEY (Establishment_id) REFERENCES FOOD_ESTABLISHMENT(Establishment_id)
);




-- Table for user reviews on food items
CREATE TABLE IF NOT EXISTS USER_REVIEWS_FOOD_ITEM (
    Username VARCHAR(50),
    Item_id INT,
    review TEXT,
    Review_date_time DATETIME,
    Rating INT,
    PRIMARY KEY (Username, Item_id),
    CONSTRAINT fk_user_reviews_food_item FOREIGN KEY (Username) REFERENCES USER(Username),
    CONSTRAINT fk_user_reviews_item FOREIGN KEY (Item_id) REFERENCES FOOD_ITEM(Item_id)
);

-- -- Insert FOOD_ESTABLISHMENT
-- INSERT INTO FOOD_ESTABLISHMENT (Name, Description, Address, Type)
-- VALUES ('JOLLIBEE', 'A cozy restaurant with a variety of dishes.', 'Grove Street', 'Casual Dining'),
--        ('MCDONALDS', 'Love Ko to!', 'Vega Center', 'Fast Food'),
--        ('STARBUCKS', 'KapeKapeKape', 'Vega Center', 'Cafe');

-- -- Update FOOD_ESTABLISHMENT
-- UPDATE FOOD_ESTABLISHMENT
-- SET Description = 'Bida ang Saya!',
--     Type = 'Fast Food'
-- WHERE Establishment_id = 1;

-- --Delete FOOD_ESTABLISHMENT
-- -- DELETE FROM FOOD_ESTABLISHMENT
-- -- WHERE Establishment_id = 2;

-- --Search FOOD_ESTABLISHMENT
-- SELECT * FROM FOOD_ESTABLISHMENT WHERE Establishment_id = 1;

-- -- Insert FOOD_ITEM
-- INSERT INTO FOOD_ITEM (Name, Description, Price, Food_type, Establishment_id)
-- VALUES ('ChickenJoy', '1pc Chicken with Rice', 10.99, 'Meat', 1), 
-- ('McCafe', 'Roasted Coffee', 3.14, 'Drinks', 2), 
-- ('Caramel Macchiato', 'Espresso with Vanilla Syrup and Milk', 5.99, 'Drinks', 3);

-- -- Update FOOD_ITEM
-- UPDATE FOOD_ESTABLISHMENT
-- SET Description = 'Coffee na may Caramel at Kape',
--     Price = 6.99
-- WHERE Item_id = 3;

-- --Delete FOOD_ITEM
-- -- DELETE FROM FOOD_ITEM
-- -- WHERE Item_id = 2;

-- --Search FOOD_ITEM
-- SELECT * FROM FOOD_ITEM WHERE Item_id = 1;

-- -- Insert USER
-- INSERT INTO USER (Username, First_name, Middle_name, Last_name, Password, Email, Age, Birthday, No_of_reviews)
-- VALUES ('janhidalgo7', 'Jan Ryan', 'Solomon', 'Hidalgo', 'password123', 'jshidalgo@up.edu.ph', 21, '2002-06-25', 0);

-- -- INSERT  USER_REVIEWS_FOOD_ESTABLISHMENT
-- INSERT INTO USER_REVIEWS_FOOD_ESTABLISHMENT (Username, Establishment_id, review, Review_date_time, Rating)
-- VALUES ('janhidalgo7', 1, 'Malamig hehe', NOW(), 5);
-- -- INSERT  USER_REVIEWS_FOOD_ITEM
-- INSERT INTO USER_REVIEWS_FOOD_ITEM (Username, Item_id, review, Review_date_time, Rating)
-- VALUES ('janhidalgo7', 1, 'Sarap ng Chicken yum yum!', NOW(), 5);

-- UPDATE USER_REVIEWS_FOOD_ESTABLISHMENT
-- SET review = 'Medyo Malamig na lang', Rating = 4
-- WHERE Username = 'janhidalgo7' AND Establishment_id = 1;

-- UPDATE USER_REVIEWS_FOOD_ITEM
-- SET review = 'Kulang gravy', Rating = 3
-- WHERE Username = 'janhidalgo7' AND Item_id = 1;

-- DELETE FROM USER_REVIEWS_FOOD_ESTABLISHMENT
-- WHERE Username = 'janhidalgo7' AND Establishment_id = 1;

-- -- Delete a review for a food item
-- DELETE FROM USER_REVIEWS_FOOD_ITEM
-- WHERE Username = 'janhidalgo7' AND Item_id = 1;

-- -- View all Food Establishments
-- SELECT * FROM FOOD_ESTABLISHMENT;

-- --View all food reviews for an establishment or a food item
-- -- For a food establishment
-- SELECT * FROM USER_REVIEWS_FOOD_ESTABLISHMENT
-- WHERE Establishment_id = 1;

-- -- For a food item
-- SELECT * FROM USER_REVIEWS_FOOD_ITEM
-- WHERE Item_id = 1;

-- SELECT * FROM FOOD_ITEM
-- WHERE Establishment_id = 1 AND Food_type = 'Meat';


-- -- View all reviews made within a month for an establishment or a food item:
-- -- For a food establishment
-- SELECT * FROM USER_REVIEWS_FOOD_ESTABLISHMENT
-- WHERE Review_date_time >= DATE_SUB(NOW(), INTERVAL 1 MONTH);

-- -- For a food item
-- SELECT * FROM USER_REVIEWS_FOOD_ITEM
-- WHERE Review_date_time >= DATE_SUB(NOW(), INTERVAL 1 MONTH);

-- -- View all establishments with a high average rating (rating >= 4)
-- SELECT * FROM FOOD_ESTABLISHMENT
-- WHERE Establishment_id IN (
--     SELECT Establishment_id
--     FROM USER_REVIEWS_FOOD_ESTABLISHMENT
--     GROUP BY Establishment_id
--     HAVING AVG(Rating) >= 4
-- );

-- --View all food items from an establishment arranged according to price:
-- SELECT * FROM FOOD_ITEM
-- WHERE Establishment_id = 1
-- ORDER BY Price;

-- -- Search food items from any establishment based on a given price range and/or food type:
-- SELECT * FROM FOOD_ITEM
-- WHERE Price BETWEEN 5.00 AND 15.00
-- AND Food_type = 'Meat';