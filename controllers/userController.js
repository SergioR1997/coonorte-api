const db = require('../models/db');

exports.getUser = async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
    res.json(rows[0]);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    res.json({ message: 'Usuario actualizado' });
};
