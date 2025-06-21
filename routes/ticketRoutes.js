const express = require('express');
const router = express.Router();
const { purchaseTicket, reserveTicket } = require('../controllers/ticketController');

router.post('/purchase', purchaseTicket);
router.post('/reserve', reserveTicket);

module.exports = router;
