import { pool } from '../Database/db.js';

const addUser = async (req, res) => {

    const { firstName, middleName, lastName, username, password, email, age, birthday } = req.body;
    const sql = `INSERT INTO USER (Username, First_name, Middle_name, Last_name, Password, Email, Age, Birthday, No_of_reviews)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`;
    pool.query(sql, [username, firstName, middleName, lastName, password, email, age, birthday])
        .then((result) => {
            console.log(result);
            res.status(200).json({ success: `User ${username} added successfully!` });
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

// const getFoodEstablishments = async (req, res) => {
//     const sql = `SELECT * FROM FOOD_ESTABLISHMENT`;

//     pool.query(sql)
//     .then((result) => {
//         res.status(200).send(result);
//     });
// }

const getFoodEstablishments = async (req, res) => {
    const establishmentsSql = 'SELECT * FROM FOOD_ESTABLISHMENT';
    const linksSql = 'SELECT * FROM FOOD_ESTABLISHMENT_LINKs';
    const contactNosSql = 'SELECT * FROM FOOD_ESTABLISHMENT_CONTACT_NO';

    try {
        const establishments = await pool.query(establishmentsSql);
        const links = await pool.query(linksSql);
        const contactNos = await pool.query(contactNosSql);

        const combinedData = establishments.map(est => {
            const estLinks = links
                .filter(link => link.Establishment_id === est.Establishment_id)
                .map(link => link.links);
            const estContactNos = contactNos
                .filter(contactNo => contactNo.Establishment_id === est.Establishment_id)
                .map(contactNo => contactNo.Contact_no);

            return {
                ...est,
                links: estLinks,
                contact_nos: estContactNos
            };
        });

        res.status(200).json(combinedData);
        // const establishments = establishmentsResult.rows.map(est => {
        //     const links = linksResult.rows
        //         .filter(link => link.establishment_id === est.establishment_id)
        //         .map(link => link.link);
        //     const contactNos = contactNosResult.rows
        //         .filter(contactNo => contactNo.establishment_id === est.establishment_id)
        //         .map(contactNo => contactNo.contact_no);

        //     return {
        //         ...est,
        //         links,
        //         contact_nos: contactNos
        //     };
        // });
        // console.log(establishments);
        // res.status(200).json(establishments);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query');
    }
}

const getFoodItems = async (req, res) => {
    const sql = `SELECT * FROM FOOD_ITEM`;
    pool.query(sql)
        .then((result) => {
            res.status(200).send(result);
        });
}

// const getFoodEstablishmentLinks = async (req, res) => {
//     const { estId } = req.body;
//     const sql = `SELECT Links FROM FOOD_ESTABLISHMENT_links WHERE Establishment_id = ?`;
//     pool.query(sql, [estId])
//     .then((result) => {
//         res.status(200).send(result);
//     });
// }

// const getFoodEstablishmentContactNo = async (req, res) => {}

const getFoodReviews = async (req, res) => {
    const sql = `SELECT * FROM USER_REVIEWS_FOOD_ITEM`;
    pool.query(sql)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error('Error executing query', error.stack);
            res.status(500).send('Error executing query');
        });
}

const getFoodEstablishmentReviews = async (req, res) => {
    const { establishmentId } = req.params; // Assuming the establishment ID is passed as a URL parameter
    const sql = `SELECT * FROM USER_REVIEWS_FOOD_ESTABLISHMENT`;
    pool.query(sql)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error('Error executing query', error.stack);
            res.status(500).send('Error executing query');
        });
}


const addEstablishment = async (req, res) => {
    const { Name, Description, Address, Type, Links, ContactNumbers } = req.body;
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        const sql = `INSERT INTO FOOD_ESTABLISHMENT (Name, Description, Address, Type) VALUES (?, ?, ?, ?)`;
        const queryResult = await conn.query(sql, [Name, Description, Address, Type]);
        const establishmentId = queryResult.insertId;

        if (Array.isArray(Links) && Links.length > 0) {
            const linkSql = `INSERT INTO FOOD_ESTABLISHMENT_LINKS (Establishment_id, links) VALUES (?, ?)`;
            for (const link of Links) {
                await conn.query(linkSql, [establishmentId, link]); // Correctly pass the parameterized query
            }
            // console.log("Links inserted successfully");
        }

        if (Array.isArray(ContactNumbers) && ContactNumbers.length > 0) {
            const contactSql = `INSERT INTO FOOD_ESTABLISHMENT_CONTACT_NO (Establishment_id, Contact_no) VALUES (?, ?)`;
            for (const number of ContactNumbers) {
                await conn.query(contactSql, [establishmentId, number]); // Correctly pass the parameterized query
            }
            // console.log("Contact numbers inserted successfully");
        }

        await conn.commit();
        res.status(200).json({ success: `Establishment ${Name} added successfully!` });
    } catch (error) {
        await conn.rollback();
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query: ' + error.message);
    } finally {
        conn.release();
    }
};


export { addUser, authenticateUser, getFoodEstablishments, getFoodItems, getFoodReviews, getFoodEstablishmentReviews, addEstablishment };