    import {
        createVenta,
        deleteVenta,
        getAllVentas,
        getVentaById,
        updateVenta,
    } from "../models/ventasModels.js";

    export const getVentas = async (req, res) => {
    try {
        const ventas = await getAllVentas();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar ventas", error: error.message });
    }
    };

    export const getVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const venta = await getVentaById(id);
        
        if (!venta) {
        return res.status(404).json({ message: "Venta no encontrada" });
        }
        
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar venta", error: error.message });
    }
    };

    export const createNewVenta = async (req, res) => {
    try {
        const { id_cliente, id_producto, cantidad, total, estado, fecha } = req.body;

        if (!id_cliente || !id_producto || !cantidad || !total || !estado || !fecha) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        const ventaId = await createVenta(id_cliente, id_producto, cantidad, total, estado, fecha);
        
        res.status(201).json({
        message: "Venta creada exitosamente",
        id_venta: ventaId,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear venta", error: error.message });
    }
    };

    export const updateExistingVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_cliente, id_producto, cantidad, total, estado, fecha } = req.body;

        const venta = await getVentaById(id);
        if (!venta) {
        return res.status(404).json({ message: "Venta no encontrada" });
        }

        if (!id_cliente || !id_producto || !cantidad || !total || !estado || !fecha) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        const affectedRows = await updateVenta(id, id_cliente, id_producto, cantidad, total, estado, fecha);
        
        if (affectedRows === 0) {
        return res.status(400).json({ message: "No se pudo actualizar la venta" });
        }

        res.json({ message: "Venta actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar venta", error: error.message });
    }
    };

    export const deleteExistingVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const venta = await getVentaById(id);
        if (!venta) {
        return res.status(404).json({ message: "Venta no encontrada" });
        }

        const affectedRows = await deleteVenta(id);
        
        if (affectedRows === 0) {
        return res.status(400).json({ message: "No se pudo eliminar la venta" });
        }

        res.json({ message: "Venta eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar venta", error: error.message });
    }
    };
