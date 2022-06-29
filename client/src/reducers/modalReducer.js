const SET_CLINIC_DROPDOWN = 'SET_CLINIC_DROPDOWN';
const SET_DEPARTMENT_DROPDOWN = 'SET_DEPARTMENT_DROPDOWN';
const SET_FIRM_DROPDOWN = 'SET_FIRM_DROPDOWN';
const SET_MEDICINE_DROPDOWN = 'SET_MEDICINE_DROPDOWN';
const SET_DISTRICT_DROPDOWN = 'SET_DISTRICT_DROPDOWN';
const SET_TYPE_DROPDOWN = 'SET_TYPE_DROPDOWN';
const SET_COUNTRY_DROPDOWN = 'SET_COUNTRY_DROPDOWN';
const SET_TYPE_OF_PROPERTY_DROPDOWN = 'SET_TYPE_OF_PROPERTY_DROPDOWN';
const SET_FORM_DROPDOWN = 'SET_FORM_DROPDOWN';
const SET_GROUP_DROPDOWN = 'SET_GROUP_DROPDOWN';
const SET_EDIT_ID = 'SET_EDIT_ID';
const REMOVE_EDIT_ID = 'REMOVE_EDIT_ID';

const defaultState = {
  clinicDropdown: [],
  departmentDropdown: [],
  firmDropdown: [],
  medicineDropdown: [],
  districtDropdown: [],
  typeDropdown: [],
  countryDropdown: [],
  typeOfPropertyDropdown: [],
  formDropdown: [],
  groupDropdown: [],
  editId: '',
};

export default function modalReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CLINIC_DROPDOWN:
      return {
        ...state,
        clinicDropdown: action.payload,
      };

    case SET_DEPARTMENT_DROPDOWN:
      return {
        ...state,
        departmentDropdown: action.payload,
      };

    case SET_FIRM_DROPDOWN:
      return {
        ...state,
        firmDropdown: action.payload,
      };

    case SET_MEDICINE_DROPDOWN:
      return {
        ...state,
        medicineDropdown: action.payload,
      };

    case SET_DISTRICT_DROPDOWN:
      return {
        ...state,
        districtDropdown: action.payload,
      };

    case SET_TYPE_DROPDOWN:
      return {
        ...state,
        typeDropdown: action.payload,
      };

    case SET_COUNTRY_DROPDOWN:
      return {
        ...state,
        countryDropdown: action.payload,
      };

    case SET_TYPE_OF_PROPERTY_DROPDOWN:
      return {
        ...state,
        typeOfPropertyDropdown: action.payload,
      };

    case SET_FORM_DROPDOWN:
      return {
        ...state,
        formDropdown: action.payload,
      };

    case SET_GROUP_DROPDOWN:
      return {
        ...state,
        groupDropdown: action.payload,
      };

    case SET_EDIT_ID:
      return {
        ...state,
        editId: action.payload,
      };

    case REMOVE_EDIT_ID:
      return {
        ...state,
        editId: '',
      };

    default:
      return state;
  }
}

export const setClinicDropdown = (data) => ({
  type: SET_CLINIC_DROPDOWN,
  payload: data,
});

export const setDepartmentDropdown = (data) => ({
  type: SET_DEPARTMENT_DROPDOWN,
  payload: data,
});

export const setFirmDropdown = (data) => ({
  type: SET_FIRM_DROPDOWN,
  payload: data,
});

export const setMedicineDropdown = (data) => ({
  type: SET_MEDICINE_DROPDOWN,
  payload: data,
});

export const setDistrictDropdown = (data) => ({
  type: SET_DISTRICT_DROPDOWN,
  payload: data,
});

export const setTypeDropdown = (data) => ({
  type: SET_TYPE_DROPDOWN,
  payload: data,
});

export const setCountryDropdown = (data) => ({
  type: SET_COUNTRY_DROPDOWN,
  payload: data,
});

export const setTypeOfPropertyDropdown = (data) => ({
  type: SET_TYPE_OF_PROPERTY_DROPDOWN,
  payload: data,
});

export const setFormDropdown = (data) => ({
  type: SET_FORM_DROPDOWN,
  payload: data,
});

export const setGroupDropdown = (data) => ({
  type: SET_GROUP_DROPDOWN,
  payload: data,
});

export const setEditId = (id) => ({
  type: SET_EDIT_ID,
  payload: id,
});

export const removeEditId = () => ({
  type: REMOVE_EDIT_ID,
});
