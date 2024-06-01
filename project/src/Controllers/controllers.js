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

// const getFoodEstablishmentLinks = async (req, res) => {
//     const { estId } = req.body;
//     const sql = `SELECT Links FROM FOOD_ESTABLISHMENT_links WHERE Establishment_id = ?`;
//     pool.query(sql, [estId])
//     .then((result) => {
//         res.status(200).send(result);
//     });
// }

// const getFoodEstablishmentContactNo = async (req, res) => {}


export {addUser, authenticateUser, getFoodEstablishments};