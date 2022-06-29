const Router = require('express');
const firmMedicineController = require('../controllers/firmMedicineController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), firmMedicineController.create);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  firmMedicineController.edit()
);
router.get('/', firmMedicineController.getAll);
router.get('/certainFirm', firmMedicineController.certainFirmRequest);
router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  firmMedicineController.delete
);

module.exports = router;
