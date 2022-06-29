import { $authHost } from './index';
import { setData, setTotalCount } from '../reducers/tableReducer';
import { setLoading } from '../reducers/appReducer';

export const request1 = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/firmMedicine/certainFirm', {
        params: { name },
      });

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const request2 = (type, district, clinic) => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/order/certainClinic', {
        params: { type, district, clinic },
      });

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const request3 = (year) => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/firm/afterYear', {
        params: { year },
      });

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const request4 = (date) => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/order/certainDate', {
        params: { date },
      });

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const request5 = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/form/allMedicines');

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const request6 = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/country/allFirms');

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const request7 = (district) => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/clinicDepartment/allClinics', {
        params: { district },
      });

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const difficultRequest1 = (type, district, clinic) => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/order/sumOfOrders', {
        params: { type, district, clinic },
      });

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const difficultRequest2 = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/firm/oldestFirm', {
        params: { name },
      });

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const difficultRequest3 = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/order/numInClinics');

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const difficultRequest4 = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/order/aboveAverage');

      dispatch(setData(data.query));
      dispatch(setTotalCount(data.query.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
