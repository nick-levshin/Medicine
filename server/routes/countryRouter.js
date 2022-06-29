const Router = require('express');
const directoryController = require('../controllers/directoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { Country } = require('../models/models');
const router = new Router();

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  directoryController.create(Country, 'countries')
);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  directoryController.edit(Country, 'countries')
);
router.get('/', directoryController.getAll(Country, 'countries'));
router.get('/one', directoryController.getOne(Country));
router.get('/dropdown', directoryController.getDropdown('countries'));
router.get('/allFirms', directoryController.allFirmsRequest);

router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  directoryController.delete(Country)
);

module.exports = router;
