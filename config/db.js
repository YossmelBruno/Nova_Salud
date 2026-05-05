import {createPool} from "mysql2/promise";

const pool = createPool({
    host:"localhost",
    port:3306,
    database:"nova_salud",
    user:"root",
    password:"",
});

const getConnection = async () => {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error("Error getting database connection:", error.message);
        throw error;
    }
};