import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Napoli07!', // TODO: change password of local mariadb
    connectionLimit: 5,
    database: 'food_review_system'
});


const setUpDatabase = async () => {
    try {
        
        await pool.query("CREATE DATABASE IF NOT EXISTS food_review_system;");



        await pool.query(`CREATE TABLE IF NOT EXISTS USER (
            Username VARCHAR(50) PRIMARY KEY,
            First_name VARCHAR(50),
            Middle_name VARCHAR(50),
            Last_name VARCHAR(50),
            Password VARCHAR(255),
            Email VARCHAR(100),
            Age INT,
            Birthday DATE,
            No_of_reviews INT
        );`);

        await pool.query(`CREATE TABLE IF NOT EXISTS FOOD_ESTABLISHMENT (
            Establishment_id INT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(100),
            Description TEXT,
            Address VARCHAR(255),
            Type VARCHAR(50)
        );`)

        await pool.query(`CREATE TABLE IF NOT EXISTS USER_REVIEWS_FOOD_ESTABLISHMENT (
            Username VARCHAR(50),
            Establishment_id INT,
            review TEXT,
            Review_date_time DATETIME,
            Rating DECIMAL(3,2),
            PRIMARY KEY (Username, Establishment_id, Review_date_time),
            CONSTRAINT fk_user_reviews FOREIGN KEY (Username) REFERENCES USER(Username),
            CONSTRAINT fk_food_establishment_reviews FOREIGN KEY (Establishment_id) REFERENCES FOOD_ESTABLISHMENT(Establishment_id)
        );`);

        await pool.query(`CREATE TABLE IF NOT EXISTS FOOD_ESTABLISHMENT_links (
            Establishment_id INT,
            links VARCHAR(255),
            PRIMARY KEY (Establishment_id, links),
            CONSTRAINT fk_food_establishment_links FOREIGN KEY (Establishment_id) REFERENCES FOOD_ESTABLISHMENT(Establishment_id)
        );`);

        await pool.query(`CREATE TABLE IF NOT EXISTS FOOD_ESTABLISHMENT_CONTACT_NO (
            Establishment_id INT,
            Contact_no VARCHAR(20),
            PRIMARY KEY (Establishment_id, Contact_no),
            CONSTRAINT fk_food_establishment_contact FOREIGN KEY (Establishment_id) REFERENCES FOOD_ESTABLISHMENT(Establishment_id)
        );`);

        await pool.query(`CREATE TABLE IF NOT EXISTS FOOD_ITEM (
            Item_id INT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(100),
            Description TEXT,
            Price DECIMAL(10,2),
            Food_type VARCHAR(50),
            Establishment_id INT,
            CONSTRAINT fk_food_item_establishment FOREIGN KEY (Establishment_id) REFERENCES FOOD_ESTABLISHMENT(Establishment_id)
        );`);

        await pool.query(`CREATE TABLE IF NOT EXISTS USER_REVIEWS_FOOD_ITEM (
            Username VARCHAR(50),
            Item_id INT,
            review TEXT,
            Review_date_time DATETIME,
            Rating INT,
            PRIMARY KEY (Username, Item_id, Review_date_time),
            CONSTRAINT fk_user_reviews_food_item FOREIGN KEY (Username) REFERENCES USER(Username),
            CONSTRAINT fk_user_reviews_item FOREIGN KEY (Item_id) REFERENCES FOOD_ITEM(Item_id)
        );`);

        console.log("Database setup completed.");
    } catch (err) {
        console.error("Error setting up database: ", err);
    }
}


export { pool, setUpDatabase };