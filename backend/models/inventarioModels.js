import Producto from './inventarioModels.js';

// Actualizar un producto por ID
export const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, stock, precio, proveedor } = req.body;

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { nombre, categoria, stock, precio, proveedor },
            { new: true } // Para que devuelva el objeto ya editado
        );

        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
};