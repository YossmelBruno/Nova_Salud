import express from 'express';
import { updateProducto } from '../models/inventarioModels.js';

const router = express.Router();

// Ruta para editar (PUT)
router.put('/:id', updateProducto);

export default router;