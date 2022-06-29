const Router = require('express');
const directoryController = require('../controllers/directoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { Department } = require('../models/models');
const router = new Router();

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  directoryController.create(Department, 'departments')
);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  directoryController.edit(Department, 'departments')
);
router.get('/', directoryController.getAll(Department, 'departments'));
router.get('/one', directoryController.getOne(Department));
router.get('/dropdown', directoryController.getDropdown('departments'));
router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  directoryController.delete(Department)
);

module.exports = router;
