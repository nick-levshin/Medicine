const { Order, Medicine, Clinic } = require('../models/models');
const { faker } = require('@faker-js/faker');
const { randomIntFromInterval } = require('../utils/random');

module.exports = async function () {
  let count = await Order.count();
  const medicineCount = await Medicine.count();
  const clinicCount = await Clinic.count();

  while (count != process.env.GENERATE_ORDER) {
    const date = faker.date.between(
      '2013-01-01T00:00:00.000Z',
      '2023-01-01T00:00:00.000Z'
    );
    const number = randomIntFromInterval(1, 1000);
    const price = randomIntFromInterval(5, 2000) + '₽';
    const clinicId = randomIntFromInterval(1, clinicCount);
    const medicineId = randomIntFromInterval(1, medicineCount);

    await Order.create({ date, number, price, clinicId, medicineId });
    count = await Order.count();
  }
};
