const { Medicine, Group, Form } = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');

class MedicineController {
  async create(req, res, next) {
    try {
      const { name, formId, groupId } = req.body;

      const check = await Medicine.findOne({
        where: { name, formId, groupId },
      });

      if (check) {
        return res.json({ message: 'Such a medicine already exists' });
      }

      const medicine = await Medicine.create({
        name,
        formId,
        groupId,
      });

      return res.json(medicine);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const [medicines] = await db.query(
      `SELECT medicines.id, medicines.name, forms.name AS "form", groups.name AS "group" FROM medicines JOIN forms ON "formId" = forms.id JOIN groups ON "groupId" = groups.id LIMIT ${limit} OFFSET ${offset}`
    );

    const query = medicines;

    const count = await Medicine.count();

    return res.json({ query, count });
  }

  async getOne(req, res) {
    const { group, form, name } = req.query;

    const groupObj = await Group.findOne({ where: { name: group } });
    const formObj = await Form.findOne({
      where: { name: form },
    });

    const medicine = await Medicine.findOne({
      where: {
        groupId: groupObj.id,
        formId: formObj.id,
        name,
      },
    });

    return res.json({ medicine });
  }

  async getDropdown(req, res) {
    const [medicines] = await db.query(
      `SELECT concat(groups.name, ' - ', forms.name, ' - ', medicines.name) FROM medicines JOIN groups ON medicines."groupId" = groups.id JOIN forms ON medicines."formId" = forms.id ORDER BY groups.name, forms.name, medicines.name`
    );

    const query = medicines;

    return res.json({ query });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const medicine = await Medicine.findOne({ where: { id } });

    if (!medicine) {
      return next(ApiError.internal('Medicine not found'));
    }

    await Medicine.destroy({ where: { id } });

    return res.json({ message: 'Medicine was deleted' });
  }
}

module.exports = new MedicineController();
