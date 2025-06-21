const db = require('../models/db');

exports.purchaseTicket = async (req, res) => {
    const { userId, origin, destination, date } = req.body;
    await db.query('INSERT INTO tickets (user_id, origin, destination, date, status) VALUES (?, ?, ?, ?, ?)', [userId, origin, destination, date, 'comprado']);
    res.status(201).json({ message: 'Tiquete comprado' });
};

exports.reserveTicket = async (req, res) => {
    const { userId, origin, destination, date } = req.body;
    await db.query('INSERT INTO tickets (user_id, origin, destination, date, status) VALUES (?, ?, ?, ?, ?)', [userId, origin, destination, date, 'reservado']);
    res.status(201).json({ message: 'Tiquete reservado' });
};
