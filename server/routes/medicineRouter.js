const Router = require('express');
const medicineController = require('../controllers/medicineController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), medicineController.create);
router.get('/', medicineController.getAll);
router.get('/one', medicineController.getOne);
router.get('/dropdown', medicineController.getDropdown);
router.delete('/:id', checkRoleMiddleware('ADMIN'), medicineController.delete);

module.exports = router;
