const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ message: 'Faltan campos' });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', 
    [nombre, email, hashedPassword],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error al registrar', error: err });
      res.json({ message: 'Usuario registrado' });
    });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error interno' });
    if (results.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

module.exports = router;
