const Router = require('express');
const clinicController = require('../controllers/clinicController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), clinicController.create);
router.get('/', clinicController.getAll);
router.get('/one', clinicController.getOne);
router.get('/dropdown', clinicController.getDropdown);
router.delete('/:id', checkRoleMiddleware('ADMIN'), clinicController.delete);

module.exports = router;
