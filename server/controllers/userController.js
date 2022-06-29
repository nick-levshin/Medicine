const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const { validationResult } = require('express-validator');
const db = require('../db');

const generateJwt = (id, email, role, canCreate, canEdit, canDelete) => {
  return jwt.sign(
    {
      id,
      email,
      role,
      canCreate,
      canEdit,
      canDelete,
    },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

class UserController {
  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const [users] = await db.query(
      `SELECT id, email, role, "canCreate", "canEdit", "canDelete" FROM users ORDER BY id LIMIT ${limit} OFFSET ${offset}`
    );

    const query = users;

    const count = await User.count();

    return res.json({ query, count });
  }

  async registration(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Incorrect email or password'));
    }

    const { email, password, role, canCreate, canEdit, canDelete } = req.body;

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(
        ApiError.badRequest(`User with email ${email} already exists`)
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      role,
      password: hashPassword,
      canCreate,
      canEdit,
      canDelete,
    });

    const token = generateJwt(
      user.id,
      user.email,
      user.role,
      canCreate,
      canEdit,
      canDelete
    );

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.internal('User not found'));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.internal('Incorrect password'));
    }

    const token = generateJwt(
      user.id,
      user.email,
      user.role,
      user.canCreate,
      user.canEdit,
      user.canDelete
    );
    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.role,
      req.user.canCreate,
      req.user.canEdit,
      req.user.canDelete
    );
    return res.json({ token });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return next(ApiError.internal('User not found'));
    }

    if (user.role === 'ADMIN') {
      return next(ApiError.badRequest('You can not remove admin'));
    }

    await User.destroy({ where: { id } });

    return res.json({ message: 'User was deleted' });
  }
}

module.exports = new UserController();
