const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

router.get('/', usersAPIController.list);

// router.get('/latest', productsAPIController.latest);

router.get('/:id', usersAPIController.detail);

module.exports = router;