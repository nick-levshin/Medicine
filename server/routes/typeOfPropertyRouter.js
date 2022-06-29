const Router = require('express');
const directoryController = require('../controllers/directoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { TypeOfProperty } = require('../models/models');
const router = new Router();

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  directoryController.create(TypeOfProperty, 'type_of_properties')
);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  directoryController.edit(TypeOfProperty)
);
router.get(
  '/',
  directoryController.getAll(TypeOfProperty, 'type_of_properties')
);
router.get('/one', directoryController.getOne(TypeOfProperty));
router.get('/dropdown', directoryController.getDropdown('type_of_properties'));
router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  directoryController.delete(TypeOfProperty)
);

module.exports = router;
