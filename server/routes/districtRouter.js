const Router = require('express');
const directoryController = require('../controllers/directoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { District } = require('../models/models');
const router = new Router();

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  directoryController.create(District, 'districts')
);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  directoryController.edit(District)
);
router.get('/', directoryController.getAll(District, 'districts'));
router.get('/one', directoryController.getOne(District));
router.get('/dropdown', directoryController.getDropdown('districts'));
router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  directoryController.delete(District)
);

module.exports = router;
