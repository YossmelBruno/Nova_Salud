import cors from "cors";
import express from "express";
import clienteRoutes from "./routes/clienteRoutes.js";
import ventasRoutes from "./routes/ventasRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/ventas", ventasRoutes);
app.use("/api/clientes", clienteRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Servidor corriendo" });
});

// Error404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Error interno del servidor",
  });
});

export default app;