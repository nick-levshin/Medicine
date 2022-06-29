const Router = require('express');
const orderController = require('../controllers/orderController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), orderController.create);
router.get('/', orderController.getAll);
router.get('/certainClinic', orderController.certainClinicRequest);
router.get('/certainDate', orderController.certainDateRequest);
router.get('/sumOfOrders', orderController.sumOfOrdersRequest);
router.get('/numInClinics', orderController.numInClinicsRequest);
router.get('/aboveAverage', orderController.aboveAverageRequest);
router.delete('/:id', checkRoleMiddleware('ADMIN'), orderController.delete);

module.exports = router;
