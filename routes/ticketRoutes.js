const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const db = require('../utils/db');

// Crear tiquete (requiere token)
router.post('/', authMiddleware, (req, res) => {
  const { origen, destino, fecha, cantidad } = req.body;
  const usuario_id = req.user.id;

  db.query('INSERT INTO tiquetes (usuario_id, origen, destino, fecha, cantidad) VALUES (?, ?, ?, ?, ?)',
    [usuario_id, origen, destino, fecha, cantidad],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error al crear tiquete', error: err });
      res.json({ message: 'Tiquete creado correctamente' });
    });
});

module.exports = router;
