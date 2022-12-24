const express = require('express');
const router = express.Router();

const sms = require('../controllers/sms');

router.post('/', sms.sendSms);

router.post('/receive', sms.receiveSms);

module.exports = router;
