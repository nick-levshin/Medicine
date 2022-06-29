const { Department, Clinic, ClinicDepartment } = require('../models/models');
const { randomIntFromInterval } = require('../utils/random');

module.exports = async function () {
  let count = await ClinicDepartment.count();
  const clinicCount = await Clinic.count();
  const departmentCount = await Department.count();

  while (count != process.env.GENERATE_CLINIC_DEPARTMENT) {
    const clinicId = randomIntFromInterval(1, clinicCount);
    const departmentId = randomIntFromInterval(1, departmentCount);

    const check = await ClinicDepartment.findOne({
      where: { clinicId, departmentId },
    });

    if (!check) {
      await ClinicDepartment.create({ clinicId, departmentId });
      count = await ClinicDepartment.count();
    }
  }
};
