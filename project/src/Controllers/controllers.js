import { pool } from '../Database/db.js';

const addUser = (req, res) => {  

    const { firstName, middleName, lastName, username, password, email, age, birthday } = req.body;
    const sql = `INSERT INTO USER (Username, First_name, Middle_name, Last_name, Password, Email, Age, Birthday, No_of_reviews)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`;
    initialPool.query(sql, [username, firstName, middleName, lastName, password, email, age, birthday], (err, result) => {
        if (err) {
    res.status(500).send({ error: err.message });
} else {
    res.status(200).send({ message: 'User added successfully', result: result });
}
    });
};

export {addUser}