const Router = require('express');
const clinicDepartmentController = require('../controllers/clinicDepartmentController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router();

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  clinicDepartmentController.create
);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  clinicDepartmentController.edit()
);
router.get('/', clinicDepartmentController.getAll);
router.get('/allClinics', clinicDepartmentController.allClinicsRequest);
router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  clinicDepartmentController.delete
);

module.exports = router;
