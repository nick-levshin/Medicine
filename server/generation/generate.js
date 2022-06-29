const ApiError = require('../error/ApiError');
const {
  District,
  Type,
  Department,
  Form,
  Group,
  TypeOfProperty,
} = require('../models/models');
const generateDirectories = require('./generateDirectories');
const generateCountry = require('./generateCountry');
const generateMedicine = require('./generateMedicine');
const generateFirm = require('./generateFirm');
const generateFirmMedicine = require('./generateFirmMedicine');
const generateClinic = require('./generateClinic');
const generateClinicDepartment = require('./generateClinicDepartment');
const generateOrder = require('./generateOrder');
const path = require('path');

const directories = new Map([
  [path.resolve(__dirname, '..', 'data', 'district.json'), District],
  [path.resolve(__dirname, '..', 'data', 'type.json'), Type],
  [path.resolve(__dirname, '..', 'data', 'department.json'), Department],
  [path.resolve(__dirname, '..', 'data', 'form.json'), Form],
  [path.resolve(__dirname, '..', 'data', 'group.json'), Group],
  [
    path.resolve(__dirname, '..', 'data', 'typeOfProperty.json'),
    TypeOfProperty,
  ],
]);

module.exports = async function (req, res, next) {
  try {
    await generateDirectories(directories);
    await generateCountry();
    await generateMedicine();
    await generateFirm();
    await generateFirmMedicine();
    await generateClinic();
    await generateClinicDepartment();
    await generateOrder();

    return res.json({ message: 'Data was generated' });
  } catch (e) {
    console.log(e);
    next(ApiError.internal('Generation was failed'));
  }
};
