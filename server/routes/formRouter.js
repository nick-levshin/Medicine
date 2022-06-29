const Router = require('express');
const directoryController = require('../controllers/directoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { Form } = require('../models/models');
const router = new Router();

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  directoryController.create(Form, 'forms')
);
router.post(
  '/update',
  checkRoleMiddleware('ADMIN'),
  directoryController.edit(Form, 'forms')
);
router.get('/', directoryController.getAll(Form, 'forms'));
router.get('/one', directoryController.getOne(Form));
router.get('/dropdown', directoryController.getDropdown('forms'));
router.get('/allMedicines', directoryController.allMedicinesRequest);
router.delete(
  '/:id',
  checkRoleMiddleware('ADMIN'),
  directoryController.delete(Form)
);

module.exports = router;
