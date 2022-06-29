const Router = require('express');
const firmController = require('../controllers/firmController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), firmController.create);
router.get('/', firmController.getAll);
router.get('/one', firmController.getOne);
router.get('/dropdown', firmController.getDropdown);
router.get('/afterYear', firmController.afterYearRequest);
router.get('/oldestFirm', firmController.oldestFirmRequest);
router.delete('/:id', checkRoleMiddleware('ADMIN'), firmController.delete);

module.exports = router;
