const { Medicine, Firm, FirmMedicine } = require('../models/models');
const { randomIntFromInterval } = require('../utils/random');

module.exports = async function () {
  let count = await FirmMedicine.count();
  const firmCount = await Firm.count();
  const medicineCount = await Medicine.count();

  while (count != process.env.GENERATE_FIRM_MEDICINE) {
    const firmId = randomIntFromInterval(1, firmCount);
    const medicineId = randomIntFromInterval(1, medicineCount);

    const check = await FirmMedicine.findOne({ where: { firmId, medicineId } });

    if (!check) {
      await FirmMedicine.create({ firmId, medicineId });
      count = await FirmMedicine.count();
    }
  }
};
