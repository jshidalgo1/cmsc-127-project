import { pool } from '../Database/db.js';

const addUser = async (req, res) => {  
    
    const { firstName, middleName, lastName, username, password, email, age, birthday } = req.body;
    const sql = `INSERT INTO USER (Username, First_name, Middle_name, Last_name, Password, Email, Age, Birthday, No_of_reviews)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`;
    pool.query(sql, [username, firstName, middleName, lastName, password, email, age, birthday])
    .then((result) => {
        console.log(result);
        res.status(200).json({ success: `User ${username} added successfully!`});
    });
}

const authenticateUser = async (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM USER WHERE Username = ? AND Password = ?`;
    pool.query(sql, [username, password])
    .then((result) => {
        if (result.length > 0) {
            res.status(200).json({ user: result[0] });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });

}


export {addUser, authenticateUser};