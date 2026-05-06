import Producto from '../models/inventarioModels.js';

// 1. Obtener todos los productos (Para llenar la tabla de image_bc0cff.png)
export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
    }
};

// 2. Crear un nuevo producto (Para el botón "Agregar producto" de image_bc0939.png)
export const createProducto = async (req, res) => {
    const { nombre, categoria, stock, precio, proveedor } = req.body;
    try {
        const nuevoProducto = new Producto({ nombre, categoria, stock, precio, proveedor });
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear producto", error: error.message });
    }
};

// 3. ACTUALIZAR PRODUCTO (La clave para que funcione el modal de image_bc0ce0.png)
export const updateProducto = async (req, res) => {
    const { id } = req.params; // Captura el ID de la URL
    const { nombre, categoria, stock, precio, proveedor } = req.body; // Datos que vienen del formulario

    try {
        // Buscamos por ID y actualizamos con los nuevos datos
        const productoActualizado = await Producto.findByIdAndUpdate(
            id, 
            { nombre, categoria, stock, precio, proveedor }, 
            { new: true, runValidators: true } // 'new: true' devuelve el objeto ya cambiado
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: "Producto no encontrado para actualizar" });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar", error: error.message });
    }
};

// 4. Eliminar producto (Para el botón rojo de image_bc0cff.png)
export const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
};