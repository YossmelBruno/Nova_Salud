    import { getConnection } from "../config/db.js";

    export const getAllVentas = async () => {
    try {
        const connection = await getConnection();
        const [ventas] = await connection.query("SELECT * FROM ventas");
        connection.release();
        return ventas;
    } catch (error) {
        console.error("Error al recuperar ventas:", error);
        throw error;
    }
    };

    export const getVentaById = async (id) => {
    try {
        const connection = await getConnection();
        const [venta] = await connection.query(
        "SELECT * FROM ventas WHERE id_venta = ?",
        [id]
        );
        connection.release();
        return venta[0];
    } catch (error) {
        console.error("Error al recuperar venta por ID:", error);
        throw error;
    }
    };

    export const createVenta = async (id_cliente, id_producto, cantidad, total, estado, fecha) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
        "INSERT INTO ventas (id_cliente, id_producto, cantidad, total, estado, fecha) VALUES (?, ?, ?, ?, ?, ?)",
        [id_cliente, id_producto, cantidad, total, estado, fecha]
        );
        connection.release();
        return result.insertId;
    } catch (error) {
        console.error("Error al crear venta:", error);
        throw error;
    }
    };

    export const updateVenta = async (id, id_cliente, id_producto, cantidad, total, estado, fecha) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
        "UPDATE ventas SET id_cliente = ?, id_producto = ?, cantidad = ?, total = ?, estado = ?, fecha = ? WHERE id_venta = ?",
        [id_cliente, id_producto, cantidad, total, estado, fecha, id]
        );
        connection.release();
        return result.affectedRows;
    } catch (error) {
        console.error("Error al actualizar venta:", error);
        throw error;
    }
    };

    export const deleteVenta = async (id) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
        "DELETE FROM ventas WHERE id_venta = ?",
        [id]
        );
        connection.release();
        return result.affectedRows;
    } catch (error) {
        console.error("Error al eliminar venta:", error);
        throw error;
    }
    };
