const { Clinic, District, Type } = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');

class ClinicController {
  async create(req, res, next) {
    try {
      const {
        number,
        typeId,
        districtId,
        phone,
        year_of_create,
        number_of_places,
        number_of_doctors,
      } = req.body;

      const check1 = await Clinic.findOne({
        where: { phone },
      });
      const check2 = await Clinic.findOne({
        where: { number, typeId, districtId },
      });

      if (check1 || check2) {
        return res.json({ message: 'Such a clinic already exists' });
      }

      const clinic = await Clinic.create({
        number,
        typeId,
        districtId,
        phone,
        year_of_create,
        number_of_places,
        number_of_doctors,
      });

      return res.json(clinic);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const [clinics] = await db.query(
      `SELECT clinics.id, clinics.number, clinics.phone, clinics.year_of_create, clinics.number_of_places, clinics.number_of_doctors, types.name AS "type", districts.name AS "district" FROM clinics JOIN types ON "typeId" = types.id JOIN districts ON "districtId" = districts.id ORDER BY clinics.id LIMIT ${limit} OFFSET ${offset}`
    );

    const query = clinics;

    const count = await Clinic.count();

    return res.json({ query, count });
  }

  async getOne(req, res) {
    const { type, district, number } = req.query;

    const typeObj = await Type.findOne({ where: { name: type } });
    const districtObj = await District.findOne({
      where: { name: district },
    });

    const clinic = await Clinic.findOne({
      where: {
        typeId: typeObj.id,
        districtId: districtObj.id,
        number,
      },
    });

    return res.json({ clinic });
  }

  async getDropdown(req, res) {
    const [clinics] = await db.query(
      `SELECT concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic" FROM clinics JOIN types ON clinics."typeId" = types.id JOIN districts ON clinics."districtId" = districts.id ORDER BY types.name, districts.name, clinics.number`
    );

    const query = clinics;

    return res.json({ query });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const clinic = await Clinic.findOne({ where: { id } });

    if (!clinic) {
      return next(ApiError.internal('Clinic not found'));
    }

    await Clinic.destroy({ where: { id } });

    return res.json({ message: 'Clinic was deleted' });
  }
}

module.exports = new ClinicController();
