const Router = require('express');
const directoryController = require('../controllers/directoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { Type } = require('../models/models');
const router = new Router();

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  directoryController.create(Type, 'types')
);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  directoryController.edit(Type)
);
router.get('/', directoryController.getAll(Type, 'types'));
router.get('/one', directoryController.getOne(Type));
router.get('/dropdown', directoryController.getDropdown('types'));
router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  directoryController.delete(Type)
);

module.exports = router;
