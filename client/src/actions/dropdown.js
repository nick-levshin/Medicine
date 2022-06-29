import {
  setClinicDropdown,
  setDepartmentDropdown,
  setFirmDropdown,
  setMedicineDropdown,
  setDistrictDropdown,
  setTypeDropdown,
  setCountryDropdown,
  setTypeOfPropertyDropdown,
  setFormDropdown,
  setGroupDropdown,
} from '../reducers/modalReducer';
import { $authHost } from './index';

export const getClinicDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/clinic/dropdown');

      dispatch(setClinicDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getDepartmentDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/department/dropdown');

      dispatch(setDepartmentDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getDistrictDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/district/dropdown');

      dispatch(setDistrictDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getTypeDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/type/dropdown');

      dispatch(setTypeDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getCountryDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/country/dropdown');

      dispatch(setCountryDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getTypeOfPropertyDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/typeOfProperty/dropdown');

      dispatch(setTypeOfPropertyDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getFirmDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/firm/dropdown');

      dispatch(setFirmDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getFormDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/form/dropdown');

      dispatch(setFormDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getGroupDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/group/dropdown');

      dispatch(setGroupDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getMedicineDropdown = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/medicine/dropdown');

      dispatch(setMedicineDropdown(data.query));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
