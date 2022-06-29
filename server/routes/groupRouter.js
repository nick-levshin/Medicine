const Router = require('express');
const directoryController = require('../controllers/directoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { Group } = require('../models/models');
const router = new Router();

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  directoryController.create(Group, 'groups')
);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  directoryController.edit(Group, 'groups')
);
router.get('/', directoryController.getAll(Group, 'groups'));
router.get('/one', directoryController.getOne(Group));
router.get('/dropdown', directoryController.getDropdown('groups'));
router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  directoryController.delete(Group)
);

module.exports = router;
