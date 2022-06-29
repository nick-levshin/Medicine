const ApiError = require('../error/ApiError');
const {
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
} = require('../models/models');

class DbController {
  async clearAll(req, res) {
    District.truncate({ cascade: true, restartIdentity: true });
    Type.truncate({ cascade: true, restartIdentity: true });
    Department.truncate({ cascade: true, restartIdentity: true });
    Clinic.truncate({ cascade: true, restartIdentity: true });
    Order.truncate({ cascade: true, restartIdentity: true });
    Medicine.truncate({ cascade: true, restartIdentity: true });
    Form.truncate({ cascade: true, restartIdentity: true });
    Group.truncate({ cascade: true, restartIdentity: true });
    Firm.truncate({ cascade: true, restartIdentity: true });
    Country.truncate({ cascade: true, restartIdentity: true });
    TypeOfProperty.truncate({ cascade: true, restartIdentity: true });
    FirmMedicine.truncate({ cascade: true, restartIdentity: true });
    ClinicDepartment.truncate({ cascade: true, restartIdentity: true });

    return res.json({ message: 'Database was truncated' });
  }
}

module.exports = new DbController();
