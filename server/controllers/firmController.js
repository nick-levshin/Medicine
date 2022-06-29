const { Firm } = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');

class FirmController {
  async create(req, res, next) {
    try {
      const { name, year_of_create, countryId, typeOfPropertyId } = req.body;

      const check = await Firm.findOne({
        where: { name },
      });

      if (check) {
        return res.json({ message: 'Such a company already exists' });
      }

      const firm = await Firm.create({
        name,
        year_of_create,
        countryId,
        typeOfPropertyId,
      });

      return res.json(firm);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const [firms] = await db.query(
      `SELECT firms.id, firms.name, firms.year_of_create, countries.name AS "country", type_of_properties.name AS "type of property" FROM firms JOIN countries ON "countryId" = countries.id JOIN type_of_properties ON "typeOfPropertyId" = type_of_properties.id ORDER BY firms.id LIMIT ${limit} OFFSET ${offset}`
    );

    const query = firms;

    const count = await Firm.count();

    return res.json({ query, count });
  }

  async getOne(req, res) {
    const { name } = req.query;

    const firm = await Firm.findOne({
      where: {
        name,
      },
    });

    return res.json({ firm });
  }

  async getDropdown(req, res) {
    const [firms] = await db.query(`SELECT name FROM firms ORDER BY name`);

    const query = firms;

    return res.json({ query });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const firm = await Firm.findOne({ where: { id } });

    if (!firm) {
      return next(ApiError.internal('Firm not found'));
    }

    await Firm.destroy({ where: { id } });

    return res.json({ message: 'Firm was deleted' });
  }

  async afterYearRequest(req, res) {
    const { year } = req.query;
    const firms = await db.query(
      `SELECT firms.name, firms.year_of_create, countries.name AS "country", type_of_properties.name AS "type of property" FROM firms JOIN countries ON "countryId" = countries.id JOIN type_of_properties ON "typeOfPropertyId" = type_of_properties.id WHERE firms.year_of_create > ${year}`
    );

    const query = firms[0];

    return res.json({ query });
  }

  async oldestFirmRequest(req, res) {
    const { name } = req.query;
    const firms = await db.query(
      `SELECT MIN(year_of_create) FROM firms JOIN countries ON "countryId" = countries.id WHERE countries.name = '${name}';`
    );

    const query = firms[0];

    return res.json({ query });
  }
}

module.exports = new FirmController();
