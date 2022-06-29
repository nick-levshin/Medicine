const { District, Type, Clinic } = require('../models/models');
const { faker } = require('@faker-js/faker');
const { randomIntFromInterval } = require('../utils/random');

module.exports = async function () {
  let count = await Clinic.count();
  const typeCount = await Type.count();
  const districtCount = await District.count();

  while (count != process.env.GENERATE_CLINIC) {
    const number = randomIntFromInterval(1, 100);
    const phone = faker.phone.phoneNumber('+38 071 ### ## ##');
    const typeId = randomIntFromInterval(1, typeCount);
    const districtId = randomIntFromInterval(1, districtCount);

    const check1 = await Clinic.findOne({ where: { phone } });
    const check2 = await Clinic.findOne({
      where: { number, typeId, districtId },
    });

    if (!check1 && !check2) {
      const year_of_create = randomIntFromInterval(1930, 2022);
      const number_of_places = randomIntFromInterval(50, 500);
      const number_of_doctors = randomIntFromInterval(10, 100);

      await Clinic.create({
        number,
        phone,
        year_of_create,
        number_of_places,
        number_of_doctors,
        typeId,
        districtId,
      });
      count = await Clinic.count();
    }
  }
};
