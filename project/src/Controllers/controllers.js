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


// Add Establishment
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

// Delete Establishment
const deleteEstablishment = async (req, res) => {
    const { Establishment_id } = req.body;
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        // Delete related entries in food_establishment_contact_no table
        const deleteContactsSql = `DELETE FROM FOOD_ESTABLISHMENT_CONTACT_NO WHERE Establishment_id = ?`;
        await conn.query(deleteContactsSql, [Establishment_id]);

        // Delete related entries in food_establishment_links table
        const deleteLinksSql = `DELETE FROM FOOD_ESTABLISHMENT_LINKS WHERE Establishment_id = ?`;
        await conn.query(deleteLinksSql, [Establishment_id]);

        //Delete related entries in food_item_reviews table

        const deleteSql = `
            DELETE UR 
            FROM USER_REVIEWS_FOOD_ITEM UR 
            INNER JOIN FOOD_ITEM FI ON UR.Item_id = FI.Item_id 
            WHERE FI.establishment_id = ?`;
        await pool.query(deleteSql, [Establishment_id]);

        // Delete related entries in food_item table
        const deleteItemsSql = `DELETE FROM FOOD_ITEM WHERE Establishment_id = ?`;
        await conn.query(deleteItemsSql, [Establishment_id]);

        const deleteReviewEstabSql = `DELETE FROM USER_REVIEWS_FOOD_ESTABLISHMENT WHERE Establishment_id = ?`;
        await conn.query(deleteReviewEstabSql, [Establishment_id]);

        // Delete the establishment
        const deleteEstablishmentSql = `DELETE FROM FOOD_ESTABLISHMENT WHERE Establishment_id = ?`;
        await conn.query(deleteEstablishmentSql, [Establishment_id]);

        await conn.commit();
        res.status(200).json({ success: `Establishment deleted successfully!` });
    } catch (error) {
        await conn.rollback();
        console.error('Error deleting establishment:', error.stack);
        res.status(500).send('Error deleting establishment: ' + error.message);
    } finally {
        conn.release();
    }
};

// Update Establishment
const updateEstablishment = async (req, res) => {
    const { Establishment_id, Name, Description, Address, Type, Links, ContactNumbers } = req.body;
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        // Update establishment details
        const updateEstablishmentSql = `UPDATE FOOD_ESTABLISHMENT SET Name = ?, Description = ?, Address = ?, Type = ? WHERE Establishment_id = ?`;
        await conn.query(updateEstablishmentSql, [Name, Description, Address, Type, Establishment_id]);

        // Handle links
        if (Array.isArray(Links) && Links.length > 0) {
            // Delete existing links
            const deleteLinksSql = `DELETE FROM FOOD_ESTABLISHMENT_LINKS WHERE Establishment_id = ?`;
            await conn.query(deleteLinksSql, [Establishment_id]);

            // Insert new links
            const linkSql = `INSERT INTO FOOD_ESTABLISHMENT_LINKS (Establishment_id, links) VALUES (?, ?)`;
            for (const link of Links) {
                await conn.query(linkSql, [Establishment_id, link]);
            }
        }

        // Handle contact numbers
        if (Array.isArray(ContactNumbers) && ContactNumbers.length > 0) {
            // Delete existing contact numbers
            const deleteContactsSql = `DELETE FROM FOOD_ESTABLISHMENT_CONTACT_NO WHERE Establishment_id = ?`;
            await conn.query(deleteContactsSql, [Establishment_id]);

            // Insert new contact numbers
            const contactSql = `INSERT INTO FOOD_ESTABLISHMENT_CONTACT_NO (Establishment_id, Contact_no) VALUES (?, ?)`;
            for (const number of ContactNumbers) {
                await conn.query(contactSql, [Establishment_id, number]);
            }
        }

        await conn.commit();
        res.status(200).json({ success: `Establishment updated successfully!` });
    } catch (error) {
        await conn.rollback();
        console.error('Error updating establishment:', error.stack);
        res.status(500).send('Error updating establishment: ' + error.message);
    } finally {
        conn.release();
    }
};



// Get Establishment by Id
const getEstablishment = async (req, res) => {
    const { id } = req.params;
    try {
        const establishmentQuery = `
            SELECT 
                FOOD_ESTABLISHMENT.Establishment_id, 
                Name, 
                Type, 
                Description, 
                Address, 
                COALESCE(GROUP_CONCAT(DISTINCT links), '') AS links, 
                COALESCE(GROUP_CONCAT(DISTINCT Contact_no), '') AS Contact_no
            FROM 
                FOOD_ESTABLISHMENT 
                LEFT JOIN FOOD_ESTABLISHMENT_LINKS ON FOOD_ESTABLISHMENT.Establishment_id = FOOD_ESTABLISHMENT_LINKS.Establishment_id
                LEFT JOIN FOOD_ESTABLISHMENT_CONTACT_NO ON FOOD_ESTABLISHMENT.Establishment_id = FOOD_ESTABLISHMENT_CONTACT_NO.Establishment_id
            WHERE 
                FOOD_ESTABLISHMENT.Establishment_id = ?`;

        // SELECT * FROM FOOD_ESTABLISHMENT WHERE Establishment_id = ?`;
        const [establishmentResult] = await pool.query(establishmentQuery, [id]);


        if (!establishmentResult) {
            return res.status(404).json({ error: 'Establishment not found' });
        }

        const establishment = {
            Establishment_id: establishmentResult.Establishment_id,
            Name: establishmentResult.Name,
            Description: establishmentResult.Description,
            Address: establishmentResult.Address,
            Type: establishmentResult.Type,
            links: establishmentResult.links ? establishmentResult.links.split(',') : [],
            Contact_no: establishmentResult.Contact_no ? establishmentResult.Contact_no.split(',') : []
        };

        // console.log('Establishment Query Result:', establishment); // Log the links query result

        res.status(200).json(establishment);
    } catch (error) {
        console.error('Error fetching establishment details:', error.stack);
        res.status(500).send('Error fetching establishment details: ' + error.message);
    }
};

// Search Establishment by Name
const searchEstablishmentByName = async (req, res) => {
    const { name } = req.query;
    const sql = `
        SELECT 
            FOOD_ESTABLISHMENT.Establishment_id, 
            Name, 
            Type, 
            Description, 
            Address, 
            COALESCE(GROUP_CONCAT(DISTINCT links), '') AS links, 
            COALESCE(GROUP_CONCAT(DISTINCT Contact_no), '') AS contact_nos
        FROM 
            FOOD_ESTABLISHMENT 
            LEFT JOIN FOOD_ESTABLISHMENT_LINKS ON FOOD_ESTABLISHMENT.Establishment_id = FOOD_ESTABLISHMENT_LINKS.Establishment_id
            LEFT JOIN FOOD_ESTABLISHMENT_CONTACT_NO ON FOOD_ESTABLISHMENT.Establishment_id = FOOD_ESTABLISHMENT_CONTACT_NO.Establishment_id
        WHERE Name LIKE ?
        GROUP BY Establishment_id
    `;

    const searchPattern = `%${name}%`;

    try {
        const establishmentResults = await pool.query(sql, [searchPattern]);

        const establishments = establishmentResults.map(establishmentResult => ({
            Establishment_id: establishmentResult.Establishment_id,
            Name: establishmentResult.Name,
            Description: establishmentResult.Description,
            Address: establishmentResult.Address,
            Type: establishmentResult.Type,
            links: establishmentResult.links ? establishmentResult.links.split(',') : [],
            contact_nos: establishmentResult.contact_nos ? establishmentResult.contact_nos.split(',') : []
        }));

        console.log('searchEstablishmentByName Result:', establishments);
        res.status(200).json(establishments);
    } catch (error) {
        console.error('Error searching establishments by name:', error.stack);
        res.status(500).send('Error searching establishments by name');
    }
};






export {
    addUser,
    authenticateUser,
    getFoodEstablishments,
    getFoodItems,
    getFoodReviews,
    getFoodEstablishmentReviews,
    addEstablishment,
    deleteEstablishment,
    updateEstablishment,
    getEstablishment,
    searchEstablishmentByName
};
