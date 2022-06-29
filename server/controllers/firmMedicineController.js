const {
  FirmMedicine,
  Firm,
  Medicine,
  Form,
  Group,
} = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');

class FirmMedicineController {
  async create(req, res, next) {
    try {
      const { medicineId, firmId } = req.body;

      const check = await FirmMedicine.findOne({
        where: { medicineId, firmId },
      });

      if (check) {
        return res.json({ message: 'Such an entry already exists' });
      }

      const firmMedicine = await FirmMedicine.create({ medicineId, firmId });

      return res.json(firmMedicine);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  edit() {
    return async function (req, res) {
      const { id, firmName, medicineGroup, medicineForm, medicineName } =
        req.body;

      const firm = await Firm.findOne({
        where: { name: firmName },
      });

      const form = await Form.findOne({
        where: { name: medicineForm },
      });

      const group = await Group.findOne({
        where: { name: medicineGroup },
      });

      const medicine = await Medicine.findOne({
        where: { name: medicineName, formId: form.id, groupId: group.id },
      });

      await FirmMedicine.update({ firmId: firm.id }, { where: { id } });
      await FirmMedicine.update({ medicineId: medicine.id }, { where: { id } });

      return res.json({ message: 'Entry was updated' });
    };
  }

  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const obj = await db.query(
      `SELECT firm_medicines.id, firms.name as "firm", concat(groups.name, ' ', medicines.name, ' ', forms.name) AS "medicine" FROM firm_medicines JOIN firms ON "firmId" = firms.id JOIN medicines ON "medicineId" = medicines.id JOIN groups ON medicines."groupId" = groups.id JOIN forms ON medicines."formId" = forms.id ORDER BY firm_medicines.id LIMIT ${limit} OFFSET ${offset}`
    );

    const query = obj[0];

    const count = await FirmMedicine.count();

    return res.json({ query, count });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const firmMedicine = await FirmMedicine.findOne({ where: { id } });

    if (!firmMedicine) {
      return next(ApiError.internal('Entry not found'));
    }

    await FirmMedicine.destroy({ where: { id } });

    return res.json({ message: 'Entry was deleted' });
  }

  async certainFirmRequest(req, res) {
    const { name } = req.query;
    const medicines = await db.query(
      `SELECT firms.name, groups.name AS "group", medicines.name AS "medicine", forms.name AS "form" FROM firm_medicines JOIN firms ON firm_medicines."firmId" = firms.id JOIN medicines ON firm_medicines."medicineId" = medicines.id JOIN groups ON medicines."groupId" = groups.id JOIN forms ON medicines."formId" = forms.id WHERE firms.name = '${name}'`
    );

    const query = medicines[0];

    return res.json({ query });
  }
}

module.exports = new FirmMedicineController();
