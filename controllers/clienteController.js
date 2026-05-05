const clienteModel = require("../models/clienteModels");

// GET ALL
const obtenerClientes = (req, res) => {
  clienteModel.getClientes((err, results) => {
    if (err) return res.status(500).json(err);

    // Transformar a formato del frontend
    const data = results.map((c) => ({
      id: c.id_cliente,
      name: c.nombre,
      email: c.email,
      phone: c.telefono,
      type: c.tipo,
      registerDate: c.fecha_registro,
    }));

    res.json(data);
  });
};

// GET ONE
const obtenerCliente = (req, res) => {
  const { id } = req.params;

  clienteModel.getClienteById(id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ msg: "No encontrado" });

    res.json(results[0]);
  });
};

// CREATE
const crearCliente = (req, res) => {
  const { name, email, phone, type, registerDate } = req.body;

  const data = {
    nombre: name,
    email,
    telefono: phone,
    tipo: type,
    fecha_registro: registerDate,
  };

  clienteModel.createCliente(data, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      msg: "Cliente creado",
      id: result.insertId,
    });
  });
};

// UPDATE
const actualizarCliente = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, type, registerDate } = req.body;

  const data = {
    nombre: name,
    email,
    telefono: phone,
    tipo: type,
    fecha_registro: registerDate,
  };

  clienteModel.updateCliente(id, data, (err) => {
    if (err) return res.status(500).json(err);

    res.json({ msg: "Cliente actualizado" });
  });
};

// DELETE
const eliminarCliente = (req, res) => {
  const { id } = req.params;

  clienteModel.deleteCliente(id, (err) => {
    if (err) return res.status(500).json(err);

    res.json({ msg: "Cliente eliminado" });
  });
};

module.exports = {
  obtenerClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
