const Router = require('express');
const jsonController = require('../controllers/jsonController');
const router = new Router();

router.get('/', jsonController.getAll);

module.exports = router;
