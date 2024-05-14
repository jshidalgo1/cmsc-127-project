
import pool from '../db.js';

const getAllRooms = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        // await pool.beginTransaction();
        const query = `SELECT * FROM room`;
        const rows = await conn.query(query);

        // await conn.commit();
        res.send(rows);
    } catch (err) {
        // await conn.rollback();
        res.send({errmsg: "Failed to get all rooms", success: false });
    } finally {
        if (conn) conn.release();
    }
}

export { getAllRooms };