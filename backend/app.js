    import cors from "cors";
import express from "express";
import clienteRoutes from "./routes/clienteRoutes.js";
import ventasRoutes from "./routes/ventasRoutes.js";

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.use("/api/ventas", ventasRoutes);
    app.use("/api/clientes", clienteRoutes);

    app.get("/", (req, res) => {
    res.json({ message: "Servidor corriendo" });
    });

    app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
    });

    export default app;
