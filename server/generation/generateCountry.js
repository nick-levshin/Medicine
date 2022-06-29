const { Country } = require('../models/models');
const { faker } = require('@faker-js/faker');

module.exports = async function () {
  let count = await Country.count();
  while (count != process.env.GENERATE_COUNTRY) {
    const name = faker.address.country();
    const check = await Country.findOne({ where: { name } });

    if (!check) {
      await Country.create({ name });
      count = await Country.count();
    }
  }
};
