const { Order } = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');

class OrderController {
  async create(req, res, next) {
    try {
      const { date, number, price, clinicId, medicineId } = req.body;

      const order = await Order.create({
        date,
        number,
        price,
        clinicId,
        medicineId,
      });

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const [orders] = await db.query(
      `SELECT orders.id, orders.date, orders.number, orders.price, concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic", concat(groups.name, ' ', medicines.name, ' ', forms.name) AS "medicine" FROM orders JOIN clinics ON "clinicId" = clinics.id JOIN medicines ON "medicineId" = medicines.id JOIN types ON clinics."typeId" = types.id JOIN districts ON clinics."districtId" = districts.id JOIN groups ON medicines."groupId" = groups.id JOIN forms ON medicines."formId" = forms.id ORDER BY orders.id LIMIT ${limit} OFFSET ${offset}`
    );

    const query = orders;

    const count = await Order.count();

    return res.json({ query, count });
  }

  async certainClinicRequest(req, res) {
    const { type, district, clinic } = req.query;
    const orders = await db.query(
      `SELECT concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic", orders.date, orders.number, orders.price, concat(groups.name, ' ', medicines.name, ' ', forms.name) AS "medicine" FROM orders JOIN clinics ON "clinicId" = clinics.id JOIN medicines ON "medicineId" = medicines.id JOIN types ON clinics."typeId" = types.id JOIN districts ON clinics."districtId" = districts.id JOIN groups ON medicines."groupId" = groups.id JOIN forms ON medicines."formId" = forms.id WHERE types.name = '${type}' AND districts.name = '${district}' AND clinics.number = '${clinic}'`
    );

    const query = orders[0];

    return res.json({ query });
  }

  async certainDateRequest(req, res) {
    const { date } = req.query;
    const orders = await db.query(
      `SELECT orders.date, orders.number, orders.price, concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic", concat(groups.name, ' ', medicines.name, ' ', forms.name) AS "medicine" FROM orders JOIN clinics ON "clinicId" = clinics.id JOIN medicines ON "medicineId" = medicines.id JOIN types ON clinics."typeId" = types.id JOIN districts ON clinics."districtId" = districts.id JOIN groups ON medicines."groupId" = groups.id JOIN forms ON medicines."formId" = forms.id WHERE orders.date = '${date}'`
    );

    const query = orders[0];

    return res.json({ query });
  }

  async sumOfOrdersRequest(req, res) {
    const { type, district, clinic } = req.query;
    const orders = await db.query(
      `SELECT concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic" , SUM(TO_NUMBER(SUBSTRING(orders.price, 1,length(orders.price)- 1), '9999L')) FROM orders JOIN clinics ON "clinicId" = clinics.id JOIN types ON clinics."typeId" = types.id JOIN districts ON clinics."districtId" = districts.id WHERE types.name = '${type}' AND districts.name = '${district}' AND clinics.number = '${clinic}' GROUP BY "clinic" ORDER BY "sum"`
    );

    const query = orders[0];

    return res.json({ query });
  }

  async aboveAverageRequest(req, res) {
    const orders = await db.query(
      `SELECT orders.price, concat(groups.name, ' ', medicines.name, ' ', forms.name) AS "medicine" FROM orders JOIN medicines ON "medicineId" = medicines.id JOIN groups ON medicines."groupId" = groups.id JOIN forms ON medicines."formId" = forms.id WHERE TO_NUMBER(SUBSTRING(orders.price, 1,length(orders.price)- 1), '9999L') > (SELECT AVG(TO_NUMBER(SUBSTRING(orders.price, 1, length(orders.price) - 1), '9999L')) FROM orders) ORDER BY orders.price;`
    );

    const query = orders[0];

    return res.json({ query });
  }

  async numInClinicsRequest(req, res) {
    const orders = await db.query(
      `SELECT concat(types.name, ' ', districts.name, ' №', clinics.number) AS "clinic",  count(orders.id) FROM orders JOIN clinics ON "clinicId" = clinics.id JOIN districts ON clinics."districtId" = districts.id JOIN types on clinics."typeId" = types.id GROUP BY "clinic";`
    );

    const query = orders[0];

    return res.json({ query });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });

    if (!order) {
      return next(ApiError.internal('Order not found'));
    }

    await Order.destroy({ where: { id } });

    return res.json({ message: 'Order was deleted' });
  }
}

module.exports = new OrderController();
