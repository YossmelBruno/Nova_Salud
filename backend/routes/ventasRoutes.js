import { Router } from "express";
import {
    createNewVenta,
    deleteExistingVenta,
    getVenta,
    getVentas,
    updateExistingVenta,
} from "../controllers/ventasController.js";
const router = Router();
router.get("/", getVentas);
router.get("/:id", getVenta);
router.post("/", createNewVenta);
router.put("/:id", updateExistingVenta);
router.delete("/:id", deleteExistingVenta);
export default router;
