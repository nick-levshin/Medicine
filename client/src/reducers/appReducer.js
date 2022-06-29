const SET_COMPONENT = 'SET_COMPONENT';
const SET_LOADING = 'SET_LOADING';
const SET_DIRECTORY_MODAL = 'SET_DIRECTORY_MODAL';
const SET_CLINIC_DEPARTMENT_MODAL = 'SET_CLINIC_DEPARTMENT_MODAL';
const SET_FIRM_MEDICINE_MODAL = 'SET_FIRM_MEDICINE_MODAL';
const SET_CLINIC_MODAL = 'SET_CLINIC_MODAL';
const SET_FIRM_MODAL = 'SET_FIRM_MODAL';
const SET_MEDICINE_MODAL = 'SET_MEDICINE_MODAL';
const SET_ORDER_MODAL = 'SET_ORDER_MODAL';
const SET_USER_MODAL = 'SET_USER_MODAL';

const defaultState = {
  component: 'table',
  isLoading: true,
  directoryModal: false,
  clinicDepartmentModal: false,
  firmMedicineModal: false,
  clinicModal: false,
  firmModal: false,
  medicineModal: false,
  orderModal: false,
  userModal: false,
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_DIRECTORY_MODAL:
      return {
        ...state,
        directoryModal: action.payload,
      };

    case SET_CLINIC_DEPARTMENT_MODAL:
      return {
        ...state,
        clinicDepartmentModal: action.payload,
      };

    case SET_FIRM_MEDICINE_MODAL:
      return {
        ...state,
        firmMedicineModal: action.payload,
      };

    case SET_CLINIC_MODAL:
      return {
        ...state,
        clinicModal: action.payload,
      };

    case SET_FIRM_MODAL:
      return {
        ...state,
        firmModal: action.payload,
      };

    case SET_MEDICINE_MODAL:
      return {
        ...state,
        medicineModal: action.payload,
      };

    case SET_ORDER_MODAL:
      return {
        ...state,
        orderModal: action.payload,
      };

    case SET_USER_MODAL:
      return {
        ...state,
        userModal: action.payload,
      };

    default:
      return state;
  }
}

export const setComponent = (component) => ({
  type: SET_COMPONENT,
  payload: component,
});

export const setLoading = (boolean) => ({
  type: SET_LOADING,
  payload: boolean,
});

export const setDirectoryModal = (boolean) => ({
  type: SET_DIRECTORY_MODAL,
  payload: boolean,
});

export const setClinicDepartmentModal = (boolean) => ({
  type: SET_CLINIC_DEPARTMENT_MODAL,
  payload: boolean,
});

export const setFirmMedicineModal = (boolean) => ({
  type: SET_FIRM_MEDICINE_MODAL,
  payload: boolean,
});

export const setClinicModal = (boolean) => ({
  type: SET_CLINIC_MODAL,
  payload: boolean,
});

export const setFirmModal = (boolean) => ({
  type: SET_FIRM_MODAL,
  payload: boolean,
});

export const setMedicineModal = (boolean) => ({
  type: SET_MEDICINE_MODAL,
  payload: boolean,
});

export const setOrderModal = (boolean) => ({
  type: SET_ORDER_MODAL,
  payload: boolean,
});

export const setUserModal = (boolean) => ({
  type: SET_USER_MODAL,
  payload: boolean,
});
