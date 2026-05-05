const db = require("../config/db");

// Obtener todos
const getClientes = (callback) => {
  db.query("SELECT * FROM clientes", callback);
};

// Obtener uno
const getClienteById = (id, callback) => {
  db.query("SELECT * FROM clientes WHERE id_cliente = ?", [id], callback);
};

// Crear
const createCliente = (data, callback) => {
  const { nombre, email, telefono, tipo, fecha_registro } = data;

  const sql = `
    INSERT INTO clientes (nombre, email, telefono, tipo, fecha_registro)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nombre, email, telefono, tipo, fecha_registro], callback);
};

// Actualizar
const updateCliente = (id, data, callback) => {
  const { nombre, email, telefono, tipo, fecha_registro } = data;

  const sql = `
    UPDATE clientes
    SET nombre=?, email=?, telefono=?, tipo=?, fecha_registro=?
    WHERE id_cliente=?
  `;

  db.query(sql, [nombre, email, telefono, tipo, fecha_registro, id], callback);
};

// Eliminar
const deleteCliente = (id, callback) => {
  db.query("DELETE FROM clientes WHERE id_cliente = ?", [id], callback);
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};