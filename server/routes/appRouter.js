const Router = require('express');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const generateData = require('../generation/generate');
const generateJSON = require('../generation/generateJSON');
const dbController = require('../controllers/dbController');
const router = new Router();

router.post('/generate', checkRoleMiddleware('ADMIN'), generateData);
router.post('/json', generateJSON);
router.delete('/clear', checkRoleMiddleware('ADMIN'), dbController.clearAll);

module.exports = router;
