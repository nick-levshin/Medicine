const Router = require('express');
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check(
      'password',
      'Password must be longer than 6 and shorter than 12'
    ).isLength({ min: 6, max: 12 }),
  ],
  userController.registration
);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/', userController.getAll);
router.delete('/:id', checkRoleMiddleware('ADMIN'), userController.delete);

module.exports = router;
