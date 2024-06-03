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
                Contact_no: estContactNos
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
            COALESCE(GROUP_CONCAT(DISTINCT Contact_no), '') AS Contact_no
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
            Contact_no: establishmentResult.Contact_no ? establishmentResult.Contact_no.split(',') : []
        }));

        console.log('searchEstablishmentByName Result:', establishments);
        res.status(200).json(establishments);
    } catch (error) {
        console.error('Error searching establishments by name:', error.stack);
        res.status(500).send('Error searching establishments by name');
    }
};

const saveEstablishmentReview = async (req, res) => {
    const { Username, Establishment_id, Review, Rating } = req.body;
    const sql = `INSERT INTO USER_REVIEWS_FOOD_ESTABLISHMENT (Username, Establishment_id, review, Rating, Review_date_time) VALUES (?, ?, ?, ?, NOW())`;
    pool.query(sql, [Username, Establishment_id, Review, Rating])
        .then((result) => {
            res.status(200).json({ success: `Review added successfully!` });
        })
        .catch((error) => {
            console.error('Error saving establishment review:', error.stack);
            res.status(500).send('Error saving establishment review');
        });
}

const getFoodEstablishmentName = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewsQuery =
            'SELECT name FROM food_establishment WHERE establishment_id = ?';
        const [rows] = await pool.query(reviewsQuery, [id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching establishment name:', error.stack);
        res.status(500).send('Error fetching establishment name: ' + error.message);
    }
}

// Search Establishment by Name
const getEstablishmentById = async (req, res) => {
    const { id } = req.query;
    const sql = `SELECT * FROM FOOD_ESTABLISHMENT WHERE Establishment_id = ?`;
    try {
        const establishment = await pool.query(sql, [id]);

        console.log('Search Establishment By Name Result:', establishment);
        res.status(200).json(establishment);
    } catch (error) {
        console.error('Error getting establishments by id:', error.stack);
        res.status(500).send('Error getting establishments by id');
    }
};


const getFoodItemsByEstablishmentId = async (req, res) => {
    const { establishmentId } = req.params;
    console.log('getFoodItemsByEstablishmentId called with establishmentId:', establishmentId);

    const sql = `SELECT * FROM FOOD_ITEM WHERE Establishment_id = ?`;

    try {
        const result = await pool.query(sql, [establishmentId]);
        console.log('getFoodItemsByEstablishmentId result:', result);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error fetching food items by establishment ID:', error.stack);
        res.status(500).send('Error fetching food items by establishment ID: ' + error.message);
    }
};

const addFoodItemFromEstablishment = async (req, res) => {
    const { establishmentId, itemName, description, price, category } = req.body;

    const sql = `INSERT INTO FOOD_ITEM (Establishment_id, name, Description, Price, food_type) 
                 VALUES (?, ?, ?, ?, ?)`;

    try {
        await pool.query(sql, [establishmentId, itemName, description, price, category]);
        res.status(200).json({ success: "Food item added successfully!" });
    } catch (error) {
        console.error('Error adding food item:', error.stack);
        res.status(500).send('Error adding food item: ' + error.message);
    }
};


// // Get Establishment by Id
// const getEstablishment = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const establishmentQuery = `
//             SELECT 
//                 FOOD_ESTABLISHMENT.Establishment_id, 
//                 Name, 
//                 Type, 
//                 Description, 
//                 Address, 
//                 COALESCE(GROUP_CONCAT(DISTINCT links), '') AS links, 
//                 COALESCE(GROUP_CONCAT(DISTINCT Contact_no), '') AS Contact_no
//             FROM 
//                 FOOD_ESTABLISHMENT 
//                 LEFT JOIN FOOD_ESTABLISHMENT_LINKS ON FOOD_ESTABLISHMENT.Establishment_id = FOOD_ESTABLISHMENT_LINKS.Establishment_id
//                 LEFT JOIN FOOD_ESTABLISHMENT_CONTACT_NO ON FOOD_ESTABLISHMENT.Establishment_id = FOOD_ESTABLISHMENT_CONTACT_NO.Establishment_id
//             WHERE 
//                 FOOD_ESTABLISHMENT.Establishment_id = ?`;

//         // SELECT * FROM FOOD_ESTABLISHMENT WHERE Establishment_id = ?`;
//         const [establishmentResult] = await pool.query(establishmentQuery, [id]);


//         if (!establishmentResult) {
//             return res.status(404).json({ error: 'Establishment not found' });
//         }

//         const establishment = {
//             Establishment_id: establishmentResult.Establishment_id,
//             Name: establishmentResult.Name,
//             Description: establishmentResult.Description,
//             Address: establishmentResult.Address,
//             Type: establishmentResult.Type,
//             links: establishmentResult.links ? establishmentResult.links.split(',') : [],
//             Contact_no: establishmentResult.Contact_no ? establishmentResult.Contact_no.split(',') : []
//         };

//         // console.log('Establishment Query Result:', establishment); // Log the links query result

//         res.status(200).json(establishment);
//     } catch (error) {
//         console.error('Error fetching establishment details:', error.stack);
//         res.status(500).send('Error fetching establishment details: ' + error.message);
//     }
// };






const getAllFoodItemsOrderedByEstablishmentName = async (req, res) => {
    const sql = `
        SELECT fi.*, fe.Name as EstablishmentName
        FROM Food_Item fi
        JOIN Food_Establishment fe ON fi.Establishment_id = fe.Establishment_id
        ORDER BY fe.Name;
    `;

    try {
        const result = await pool.query(sql); // Execute query without destructuring
        console.log('Raw query result:', result); // Log the raw result to understand its structure

        // Inspect the type and structure of the result
        if (Array.isArray(result)) {
            console.log('Result is an array:', result);
            if (result.length > 0 && Array.isArray(result[0])) {
                const [rows] = result; // Destructure rows from the result
                console.log('Query result length:', rows.length); // Log the length of the result
                console.log('Query result:', rows); // Log the actual result
                res.status(200).json(rows); // Send the rows directly
            } else {
                console.log('First element of result is not an array:', result[0]);
                res.status(200).json(result); // Send the result directly
            }
        } else {
            console.log('Result is not an array:', result);
            res.status(200).json(result); // Send the result directly
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query: ' + error.message);
    }
};

const getAllFoodItemsOrderedByEstablishmentNameAndFoodType = async (req, res) => {
    const sql = `
        SELECT fi.*, fe.Name as EstablishmentName
        FROM Food_Item fi
        JOIN Food_Establishment fe ON fi.Establishment_id = fe.Establishment_id
        ORDER BY fe.Name, fi.Food_type;
    `;

    try {
        const result = await pool.query(sql); // Execute query without destructuring
        console.log('Raw query result:', result); // Log the raw result to understand its structure

        // Inspect the type and structure of the result
        if (Array.isArray(result)) {
            console.log('Result is an array:', result);
            if (result.length > 0 && Array.isArray(result[0])) {
                const [rows] = result; // Destructure rows from the result
                console.log('Query result length:', rows.length); // Log the length of the result
                console.log('Query result:', rows); // Log the actual result
                res.status(200).json(rows); // Send the rows directly
            } else {
                console.log('First element of result is not an array:', result[0]);
                res.status(200).json(result); // Send the result directly
            }
        } else {
            console.log('Result is not an array:', result);
            res.status(200).json(result); // Send the result directly
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query: ' + error.message);
    }
};

const getAllFoodItemsOrderedByEstablishmentNameAndPrice = async (req, res) => {
    const sql = `
        SELECT fi.*, fe.Name as EstablishmentName
        FROM Food_Item fi
        JOIN Food_Establishment fe ON fi.Establishment_id = fe.Establishment_id
        ORDER BY fe.Name, CAST(Price AS DECIMAL(10, 2));
    `;

    try {
        const result = await pool.query(sql); // Execute query without destructuring
        console.log('Raw query result:', result); // Log the raw result to understand its structure

        // Inspect the type and structure of the result
        if (Array.isArray(result)) {
            console.log('Result is an array:', result);
            if (result.length > 0 && Array.isArray(result[0])) {
                const [rows] = result; // Destructure rows from the result
                console.log('Query result length:', rows.length); // Log the length of the result
                console.log('Query result:', rows); // Log the actual result
                res.status(200).json(rows); // Send the rows directly
            } else {
                console.log('First element of result is not an array:', result[0]);
                res.status(200).json(result); // Send the result directly
            }
        } else {
            console.log('Result is not an array:', result);
            res.status(200).json(result); // Send the result directly
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query: ' + error.message);
    }
};

const deleteEstablishmentReviews = async (req, res) => {
    const { Establishment_id } = req.body;
    const sql = `DELETE FROM USER_REVIEWS_FOOD_ESTABLISHMENT WHERE Establishment_id = ?`;
    pool.query(sql, [Establishment_id])
        .then((result) => {
            res.status(200).json({ success: `Reviews deleted successfully!` });
        })
        .catch((error) => {
            console.error('Error deleting establishment reviews:', error.stack);
            res.status(500).send('Error deleting establishment reviews');
        });
}

const updateEstablishmentReview = async (req, res) => {
    const { Establishment_id, Review, Rating } = req.body;
    console.log(req.body);
    const sql = `UPDATE USER_REVIEWS_FOOD_ESTABLISHMENT SET Review = ?, Rating = ?, review_date_time = NOW() WHERE Establishment_id = ?`;
    pool.query(sql, [Review, Rating, Establishment_id])

        .then((result) => {
            res.status(200).json({ success: `Review updated successfully!` });
        })
        .catch((error) => {
            console.error('Error updating establishment review:', error.stack);
            res.status(500).send('Error updating establishment review');
        });
}

const getSpecificFoodEstablishmentReview = async (req, res) => {
    const { id, username } = req.params;
    console.log(id, username)
    const sql = `SELECT USER_REVIEWS_FOOD_ESTABLISHMENT.*, FOOD_ESTABLISHMENT.name 
    FROM USER_REVIEWS_FOOD_ESTABLISHMENT 
    INNER JOIN FOOD_ESTABLISHMENT 
    ON USER_REVIEWS_FOOD_ESTABLISHMENT.Establishment_id = FOOD_ESTABLISHMENT.Establishment_id 
    WHERE USER_REVIEWS_FOOD_ESTABLISHMENT.Establishment_id = ? AND USER_REVIEWS_FOOD_ESTABLISHMENT.Username = ?`;
    try {
        const [review] = await pool.query(sql, [id, username]);

        res.status(200).json(review);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query: ' + error.message);
    }
};
const getAllFoodEstablishmentReviewsWithinMonth = async (req, res) => {
    const sql = `
        SELECT reviews.*, est.Name as EstablishmentName
        FROM USER_REVIEWS_FOOD_ESTABLISHMENT reviews
        JOIN FOOD_ESTABLISHMENT est ON reviews.Establishment_id = est.Establishment_id
        WHERE reviews.Review_date_time >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
        ORDER BY est.Name;
    `;
    try {
        const result = await pool.query(sql); // Execute query without destructuring
        console.log('Raw query result:', result); // Log the raw result to understand its structure

        // Inspect the type and structure of the result
        if (Array.isArray(result)) {
            console.log('Result is an array:', result);
            if (result.length > 0 && Array.isArray(result[0])) {
                const [rows] = result; // Destructure rows from the result
                console.log('Query result length:', rows.length); // Log the length of the result
                console.log('Query result:', rows); // Log the actual result
                res.status(200).json(rows); // Send the rows directly
            } else {
                console.log('First element of result is not an array:', result[0]);
                res.status(200).json(result); // Send the result directly
            }
        } else {
            console.log('Result is not an array:', result);
            res.status(200).json(result); // Send the result directly
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query: ' + error.message);
    }
};

const getAllFoodItemReviewsWithinMonth = async (req, res) => {
    const sql = `
        SELECT reviews.*, item.Name as ItemName
        FROM USER_REVIEWS_FOOD_ITEM reviews
        JOIN FOOD_ITEM item ON reviews.Item_id = item.Item_id
        WHERE reviews.Review_date_time >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
        ORDER BY item.Name;
    `;
    try {
        const result = await pool.query(sql);
        console.log('Raw query result:', result);

        if (Array.isArray(result)) {
            console.log('Result is an array:', result);
            if (result.length > 0 && Array.isArray(result[0])) {
                const [rows] = result;
                console.log('Query result length:', rows.length);
                console.log('Query result:', rows);
                res.status(200).json(rows);
            } else {
                console.log('First element of result is not an array:', result[0]);
                res.status(200).json(result);
            }
        } else {
            console.log('Result is not an array:', result);
            res.status(200).json(result);
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query: ' + error.message);
    }
};

const saveFoodItemReview = async (req, res) => {
    const { Username, Item_id, Review, Rating } = req.body;
    console.log(req.body);
    const sql = `INSERT INTO USER_REVIEWS_FOOD_ITEM (Username, Item_id, review, Rating, Review_date_time) VALUES (?, ?, ?, ?, NOW())`;
    pool.query(sql, [Username, Item_id, Review, Rating])
        .then((result) => {
            res.status(200).json({ success: `Review added successfully!` });
        })
        .catch((error) => {
            console.error('Error saving establishment review:', error.stack);
            res.status(500).send('Error saving establishment review');
        });
}

const updateFoodItemReview = async (req, res) => {
    const { Item_id, Review, Rating } = req.body;
    console.log(req.body);
    const sql = `UPDATE USER_REVIEWS_FOOD_ESTABLISHMENT SET Review = ?, Rating = ?, review_date_time = NOW() WHERE Establishment_id = ?`;
    pool.query(sql, [Review, Rating, Item_id])

        .then((result) => {
            res.status(200).json({ success: `Review updated successfully!` });
        })
        .catch((error) => {
            console.error('Error updating establishment review:', error.stack);
            res.status(500).send('Error updating establishment review');
        });
}

const deleteFoodItemReview = async (req, res) => {
    const { Item_id } = req.body;
    const sql = `DELETE FROM USER_REVIEWS_FOOD_ITEM WHERE Item_id = ?`;
    pool.query(sql, [Item_id])
        .then((result) => {
            res.status(200).json({ success: `Review deleted successfully!` });
        })
        .catch((error) => {
            console.error('Error deleting establishment reviews:', error.stack);
            res.status(500).send('Error deleting establishment reviews');
        });
}

const getFoodItemName = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewsQuery =
            'SELECT name FROM food_item WHERE item_id = ?';
        const [rows] = await pool.query(reviewsQuery, [id]);
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching establishment name:', error.stack);
        res.status(500).send('Error fetching establishment name: ' + error.message);
    }
}

const getSpecificFoodItemReview = async (req, res) => {
    
}


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
    searchEstablishmentByName,
    saveEstablishmentReview,
    getFoodEstablishmentName,
    addFoodItemFromEstablishment,
    deleteEstablishmentReviews,
    getFoodItemsByEstablishmentId,
    getAllFoodItemsOrderedByEstablishmentName,
    getAllFoodItemsOrderedByEstablishmentNameAndFoodType,
    getAllFoodItemsOrderedByEstablishmentNameAndPrice,
    getAllFoodEstablishmentReviewsWithinMonth,
    getAllFoodItemReviewsWithinMonth,
    getSpecificFoodEstablishmentReview,
    updateEstablishmentReview,
    saveFoodItemReview,
    updateFoodItemReview,
    deleteFoodItemReview,
    getFoodItemName,
    getSpecificFoodItemReview
};
