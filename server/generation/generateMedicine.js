const { Medicine, Form, Group } = require('../models/models');
const { faker } = require('@faker-js/faker');
const { randomIntFromInterval } = require('../utils/random');

module.exports = async function () {
  let count = await Medicine.count();
  const formCount = await Form.count();
  const groupCount = await Group.count();

  while (count != process.env.GENERATE_MEDICINE) {
    const name = faker.commerce.productName();
    const formId = randomIntFromInterval(1, formCount);
    const groupId = randomIntFromInterval(1, groupCount);

    const check = await Medicine.findOne({ where: { name, formId, groupId } });

    if (!check) {
      await Medicine.create({ name, formId, groupId });
      count = await Medicine.count();
    }
  }
};
