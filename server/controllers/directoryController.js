const db = require('../db');

class DirectoryController {
  create(model, modelName) {
    return async function (req, res) {
      const { name } = req.body;

      const check = await model.findOne({
        where: { name },
      });

      if (check) {
        return res.json({ message: 'Such an entry already exists' });
      }

      const obj = await model.create({ name });
      const queryObj = await db.query(
        `SELECT id, name FROM ${modelName} WHERE id = ${obj.id}`
      );

      const query = queryObj[0];

      return res.json({ query });
    };
  }

  getAll(model, name) {
    return async function (req, res) {
      let { limit, page } = req.query;

      page = page || 1;
      limit = limit || 10;
      const offset = page * limit - limit;

      const obj = await db.query(
        `SELECT id, name FROM ${name} ORDER BY id LIMIT ${limit} OFFSET ${offset}`
      );

      const query = obj[0];

      const count = await model.count();

      return res.json({ query, count });
    };
  }

  getOne(model) {
    return async function (req, res) {
      const { title } = req.query;

      const typeObj = await model.findOne({ where: { name: title } });

      return res.json({ typeObj });
    };
  }

  getDropdown(modelName) {
    return async function (req, res) {
      const obj = await db.query(`SELECT name FROM ${modelName} ORDER BY name`);

      const query = obj[0];

      return res.json({ query });
    };
  }

  delete(model) {
    return async function (req, res, next) {
      const { id } = req.params;
      let obj = await model.findOne({ where: { id } });

      if (!obj) {
        return next(ApiError.internal('Object not found'));
      }

      await model.destroy({ where: { id } });

      return res.json({ message: 'Object was deleted' });
    };
  }

  edit(model) {
    return async function (req, res) {
      const { id, name } = req.body;

      const check = await model.findOne({
        where: { name },
      });

      if (check) {
        return res.json({ message: 'Such an entry already exists' });
      }

      await model.update({ name }, { where: { id } });

      return res.json({ message: 'Entry was updated' });
    };
  }

  async allMedicinesRequest(req, res) {
    const forms = await db.query(
      `SELECT forms.name AS "form", medicines.name FROM forms LEFT JOIN medicines ON medicines."formId" = forms.id ORDER BY forms.name`
    );

    const query = forms[0];

    return res.json({ query });
  }

  async allFirmsRequest(req, res) {
    const countries = await db.query(
      `SELECT countries.name AS "country", firms.name as "firm" FROM countries RIGHT JOIN firms ON firms."countryId" = countries.id ORDER BY countries.name`
    );

    const query = countries[0];

    return res.json({ query });
  }
}

module.exports = new DirectoryController();
