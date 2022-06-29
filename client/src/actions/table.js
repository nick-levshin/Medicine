import { $authHost } from './index';
import { setData, setTotalCount, setPage } from '../reducers/tableReducer';
import {
  setLoading,
  setDirectoryModal,
  setClinicDepartmentModal,
  setFirmMedicineModal,
  setClinicModal,
  setFirmModal,
  setMedicineModal,
  setOrderModal,
} from '../reducers/appReducer';

export const getTable = (model, limit, page) => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/' + model, {
        params: { limit, page },
      });

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.count));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const clearAll = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.delete('api/app/clear');

      dispatch(setData([]));
      dispatch(setTotalCount(0));
      dispatch(setPage(1));
      dispatch(setLoading(false));
      alert(data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const generate = () => {
  return async (dispatch) => {
    try {
      await $authHost.post('api/app/generate');
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const createDirectory = (model, name, totalCount) => {
  return async (dispatch) => {
    try {
      const res = await $authHost.post('api/' + model, { name });

      if (res.data?.message) {
        alert(res.data?.message);
        return;
      }

      dispatch(setTotalCount(totalCount + 1));
      dispatch(setDirectoryModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const editDirectory = (model, name, id, limit, page) => {
  return async (dispatch) => {
    try {
      const res = await $authHost.post('api/' + model + '/update', {
        id,
        name,
      });

      if (res.data?.message) {
        alert(res.data?.message);
      }

      dispatch(setLoading(true));
      dispatch(getTable(model, limit, page));
      dispatch(setDirectoryModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const createClinicDepartment = (
  clinic,
  department,
  data,
  totalCount
) => {
  return async (dispatch) => {
    try {
      const clinicType = clinic.split(' ')[0];
      const cliniсDistrict = clinic.split(' ')[1];
      const cliniсNumber = clinic.split('№')[1];

      const clinicRes = await $authHost.get('api/clinic/one', {
        params: {
          type: clinicType,
          district: cliniсDistrict,
          number: cliniсNumber,
        },
      });

      const departmentRes = await $authHost.get('api/department/one', {
        params: {
          title: department,
        },
      });

      const res = await $authHost.post('api/clinicDepartment', {
        clinicId: clinicRes.data.clinic.id,
        departmentId: departmentRes.data.typeObj.id,
      });

      if (res.data?.message) {
        alert(res.data?.message);
        return;
      }

      dispatch(setTotalCount(totalCount + 1));
      dispatch(setClinicDepartmentModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const editClinicDepartment = (
  model,
  clinicName,
  departmentName,
  id,
  limit,
  page
) => {
  return async (dispatch) => {
    try {
      const typeName = clinicName.split(' ')[0];
      const districtName = clinicName.split(' ')[1];
      const clinicNumber = clinicName.split('№')[1];

      const res = await $authHost.post('api/clinicDepartment/update', {
        id,
        districtName,
        typeName,
        clinicNumber,
        departmentName,
      });

      if (res.data?.message) {
        alert(res.data?.message);
      }

      dispatch(setLoading(true));
      dispatch(getTable(model, limit, page));
      dispatch(setClinicDepartmentModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const createFirmMedicine = (firm, medicine, totalCount) => {
  return async (dispatch) => {
    try {
      const medicineGroup = medicine.split(' - ')[0];
      const medicineForm = medicine.split(' - ')[1];
      const medicineName = medicine.split(' - ')[2];

      const medicineRes = await $authHost.get('api/medicine/one', {
        params: {
          group: medicineGroup,
          form: medicineForm,
          name: medicineName,
        },
      });

      const firmRes = await $authHost.get('api/firm/one', {
        params: {
          name: firm,
        },
      });

      const res = await $authHost.post('api/firmMedicine', {
        firmId: firmRes.data.firm.id,
        medicineId: medicineRes.data.medicine.id,
      });

      if (res.data?.message) {
        alert(res.data?.message);
        return;
      }

      dispatch(setTotalCount(totalCount + 1));
      dispatch(setFirmMedicineModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const editFirmMedicine = (
  model,
  firmName,
  medicineName,
  id,
  limit,
  page
) => {
  return async (dispatch) => {
    try {
      const medicineGroup = medicineName.split(' - ')[0];
      const medicineForm = medicineName.split(' - ')[1];
      medicineName = medicineName.split(' - ')[2];

      const res = await $authHost.post('api/firmMedicine/update', {
        id,
        firmName,
        medicineGroup,
        medicineForm,
        medicineName,
      });

      if (res.data?.message) {
        alert(res.data?.message);
      }

      dispatch(setLoading(true));
      dispatch(getTable(model, limit, page));
      dispatch(setFirmMedicineModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const createClinic = (
  number,
  phone,
  year_of_create,
  number_of_places,
  number_of_doctors,
  type,
  district,
  totalCount
) => {
  return async (dispatch) => {
    try {
      const typeRes = await $authHost.get('api/type/one', {
        params: {
          title: type,
        },
      });

      const districtRes = await $authHost.get('api/district/one', {
        params: {
          title: district,
        },
      });

      const res = await $authHost.post('api/clinic', {
        number,
        phone,
        year_of_create,
        number_of_places,
        number_of_doctors,
        typeId: typeRes.data.typeObj.id,
        districtId: districtRes.data.typeObj.id,
      });

      if (res.data?.message) {
        alert(res.data?.message);
        return;
      }

      dispatch(setTotalCount(totalCount + 1));
      dispatch(setClinicModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const createFirm = (
  name,
  year_of_create,
  country,
  typeOfProperty,
  totalCount
) => {
  return async (dispatch) => {
    try {
      const countryRes = await $authHost.get('api/country/one', {
        params: {
          title: country,
        },
      });

      const typeOfPropertyRes = await $authHost.get('api/typeOfProperty/one', {
        params: {
          title: typeOfProperty,
        },
      });

      const res = await $authHost.post('api/firm', {
        name,
        year_of_create,
        countryId: countryRes.data.typeObj.id,
        typeOfPropertyId: typeOfPropertyRes.data.typeObj.id,
      });

      if (res.data?.message) {
        alert(res.data?.message);
        return;
      }

      dispatch(setTotalCount(totalCount + 1));
      dispatch(setFirmModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const createMedicine = (name, form, group, totalCount) => {
  return async (dispatch) => {
    try {
      const formRes = await $authHost.get('api/form/one', {
        params: {
          title: form,
        },
      });

      const groupRes = await $authHost.get('api/group/one', {
        params: {
          title: group,
        },
      });

      const res = await $authHost.post('api/medicine', {
        name,
        formId: formRes.data.typeObj.id,
        groupId: groupRes.data.typeObj.id,
      });

      if (res.data?.message) {
        alert(res.data?.message);
        return;
      }

      dispatch(setTotalCount(totalCount + 1));
      dispatch(setMedicineModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const createOrder = (
  date,
  number,
  price,
  clinic,
  medicine,
  totalCount
) => {
  return async (dispatch) => {
    try {
      const clinicType = clinic.split(' ')[0];
      const cliniсDistrict = clinic.split(' ')[1];
      const cliniсNumber = clinic.split('№')[1];

      const clinicRes = await $authHost.get('api/clinic/one', {
        params: {
          type: clinicType,
          district: cliniсDistrict,
          number: cliniсNumber,
        },
      });

      const medicineGroup = medicine.split(' - ')[0];
      const medicineForm = medicine.split(' - ')[1];
      const medicineName = medicine.split(' - ')[2];

      const medicineRes = await $authHost.get('api/medicine/one', {
        params: {
          group: medicineGroup,
          form: medicineForm,
          name: medicineName,
        },
      });

      const res = await $authHost.post('api/order', {
        date,
        number,
        price,
        clinicId: clinicRes.data.clinic.id,
        medicineId: medicineRes.data.medicine.id,
      });

      if (res.data?.message) {
        alert(res.data?.message);
        return;
      }

      dispatch(setTotalCount(totalCount + 1));
      dispatch(setOrderModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
