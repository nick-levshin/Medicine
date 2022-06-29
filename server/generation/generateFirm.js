const { Firm, Country, TypeOfProperty } = require('../models/models');
const { faker } = require('@faker-js/faker');
const { randomIntFromInterval } = require('../utils/random');

module.exports = async function () {
  let count = await Firm.count();
  const countryCount = await Country.count();
  const typeOfPropertyCount = await TypeOfProperty.count();

  while (count != process.env.GENERATE_FIRM) {
    const name = faker.company.companyName();

    const check = await Firm.findOne({ where: { name } });

    if (!check) {
      const year_of_create = randomIntFromInterval(1900, 2022);
      const countryId = randomIntFromInterval(1, countryCount);
      const typeOfPropertyId = randomIntFromInterval(1, typeOfPropertyCount);

      await Firm.create({ name, year_of_create, countryId, typeOfPropertyId });
      count = await Firm.count();
    }
  }
};
