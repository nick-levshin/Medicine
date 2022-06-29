const {
  ClinicDepartment,
  Clinic,
  Department,
  District,
  Type,
} = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');

class ClinicDepartmentController {
  async create(req, res, next) {
    try {
      const { clinicId, departmentId } = req.body;

      const check = await ClinicDepartment.findOne({
        where: { clinicId, departmentId },
      });

      if (check) {
        return res.json({ message: 'Such an entry already exists' });
      }

      const clinicDepartment = await ClinicDepartment.create({
        clinicId,
        departmentId,
      });

      const queryObj = await db.query(
        `SELECT clinic_departments.id, concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic", departments.name AS "department" FROM clinic_departments JOIN clinics ON "clinicId" = clinics.id JOIN departments ON "departmentId" = departments.id JOIN types ON clinics."typeId" = types.id JOIN districts ON clinics."districtId" = districts.id WHERE clinic_departments.id = ${clinicDepartment.id}`
      );

      const query = queryObj[0];

      return res.json({ query });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  edit() {
    return async function (req, res) {
      const { id, districtName, typeName, clinicNumber, departmentName } =
        req.body;

      const district = await District.findOne({
        where: { name: districtName },
      });

      const type = await Type.findOne({
        where: { name: typeName },
      });

      const clinic = await Clinic.findOne({
        where: {
          districtId: district.id,
          typeId: type.id,
          number: clinicNumber,
        },
      });

      const department = await Department.findOne({
        where: { name: departmentName },
      });

      const check = await ClinicDepartment.findOne({
        where: {
          clinicId: clinic.id,
          departmentId: department.id,
        },
      });

      if (check) {
        return res.json({ message: 'Such an entry already exists' });
      }

      await ClinicDepartment.update(
        { departmentId: department.id },
        { where: { id } }
      );
      await ClinicDepartment.update({ clinicId: clinic.id }, { where: { id } });

      return res.json({ message: 'Entry was updated' });
    };
  }

  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const obj = await db.query(
      `SELECT clinic_departments.id, concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic", departments.name AS "department" FROM clinic_departments JOIN clinics ON "clinicId" = clinics.id JOIN departments ON "departmentId" = departments.id JOIN types ON clinics."typeId" = types.id JOIN districts ON clinics."districtId" = districts.id ORDER BY clinic_departments.id LIMIT ${limit} OFFSET ${offset}`
    );

    const query = obj[0];

    const count = await ClinicDepartment.count();

    return res.json({ query, count });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const clinicDepartment = await ClinicDepartment.findOne({ where: { id } });

    if (!clinicDepartment) {
      return next(ApiError.internal('Entry not found'));
    }

    await ClinicDepartment.destroy({ where: { id } });

    return res.json({ message: 'Entry was deleted' });
  }

  async allClinicsRequest(req, res) {
    const { district } = req.query;
    const clinic_departments = await db.query(
      `SELECT concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic", departments.name AS "department" FROM clinic_departments JOIN clinics ON "clinicId" = clinics.id JOIN departments ON "departmentId" = departments.id JOIN types ON clinics."typeId" = types.id JOIN districts ON clinics."districtId" = districts.id WHERE districts.name = '${district}' ORDER BY districts.name`
    );

    const query = clinic_departments[0];

    return res.json({ query });
  }
}

module.exports = new ClinicDepartmentController();
