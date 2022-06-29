const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: { type: DataTypes.STRING, defaultValue: 'USER', allowNull: false },
  canCreate: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  canEdit: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  canDelete: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
});

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const District = sequelize.define('district', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Department = sequelize.define('department', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Country = sequelize.define('country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const TypeOfProperty = sequelize.define('type_of_property', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Form = sequelize.define('form', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Group = sequelize.define('group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Firm = sequelize.define('firm', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  year_of_create: { type: DataTypes.INTEGER, allowNull: false },
});

const Clinic = sequelize.define('clinic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  year_of_create: { type: DataTypes.INTEGER, allowNull: false },
  number_of_places: { type: DataTypes.INTEGER, allowNull: false },
  number_of_doctors: { type: DataTypes.INTEGER, allowNull: false },
});

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  number: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
});

const Medicine = sequelize.define('medicine', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const FirmMedicine = sequelize.define('firm_medicine', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ClinicDepartment = sequelize.define('clinic_department', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Type.hasMany(Clinic, { foreignKey: { allowNull: false } });
Clinic.belongsTo(Type, { foreignKey: { allowNull: false } });

District.hasMany(Clinic, { foreignKey: { allowNull: false } });
Clinic.belongsTo(District, { foreignKey: { allowNull: false } });

Country.hasMany(Firm, { foreignKey: { allowNull: false } });
Firm.belongsTo(Country, { foreignKey: { allowNull: false } });

TypeOfProperty.hasMany(Firm, { foreignKey: { allowNull: false } });
Firm.belongsTo(TypeOfProperty, { foreignKey: { allowNull: false } });

Clinic.hasMany(Order, { foreignKey: { allowNull: false } });
Order.belongsTo(Clinic, { foreignKey: { allowNull: false } });

Form.hasMany(Medicine, { foreignKey: { allowNull: false } });
Medicine.belongsTo(Form, { foreignKey: { allowNull: false } });

Group.hasMany(Medicine, { foreignKey: { allowNull: false } });
Medicine.belongsTo(Group, { foreignKey: { allowNull: false } });

Medicine.hasOne(Order, { foreignKey: { allowNull: false } });
Order.belongsTo(Medicine, { foreignKey: { allowNull: false } });

Firm.belongsToMany(
  Medicine,
  { through: FirmMedicine },
  { foreignKey: { allowNull: false } }
);
Medicine.belongsToMany(
  Firm,
  { through: FirmMedicine },
  { foreignKey: { allowNull: false } }
);

Clinic.belongsToMany(Department, {
  through: ClinicDepartment,
});
Department.belongsToMany(Clinic, {
  through: ClinicDepartment,
});

module.exports = {
  User,
  District,
  Type,
  Department,
  Clinic,
  Order,
  Medicine,
  Form,
  Group,
  Firm,
  Country,
  TypeOfProperty,
  FirmMedicine,
  ClinicDepartment,
};
