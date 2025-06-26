const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const db = require('../utils/db');

// Crear reserva
router.post('/', authMiddleware, (req, res) => {
  const { origen, destino, fecha, cantidad } = req.body;
  const usuario_id = req.user.id;

  db.query('INSERT INTO reservas (usuario_id, origen, destino, fecha, cantidad) VALUES (?, ?, ?, ?, ?)',
    [usuario_id, origen, destino, fecha, cantidad],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error al reservar', error: err });
      res.json({ message: 'Reserva realizada con éxito' });
    });
});

module.exports = router;
