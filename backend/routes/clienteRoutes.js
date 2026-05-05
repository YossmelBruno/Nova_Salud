const router = express.Router();
const controller = require("../controllers/clienteControllers");

router.get("/", controller.obtenerClientes);
router.get("/:id", controller.obtenerCliente);
router.post("/", controller.crearCliente);
router.put("/:id", controller.actualizarCliente);
router.delete("/:id", controller.eliminarCliente);

module.exports = router;
