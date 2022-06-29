import { $host, $authHost } from './index';
import jwt_decode from 'jwt-decode';
import { setUser } from '../reducers/userReducer';
import { setTotalCount } from '../reducers/tableReducer';
import { setUserModal } from '../reducers/appReducer';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await $host.post('api/user/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      const decode = jwt_decode(data.token);
      dispatch(setUser(decode));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const check = () => {
  return async (dispatch) => {
    try {
      const { data } = await $authHost.get('api/user/auth');

      const decode = jwt_decode(data.token);
      dispatch(setUser(decode));
      localStorage.setItem('token', data.token);
    } catch (e) {
      localStorage.removeItem('token');
    }
  };
};

export const createUser = (
  email,
  password,
  role,
  canCreate,
  canEdit,
  canDelete,
  totalCount
) => {
  return async (dispatch) => {
    try {
      const res = await $authHost.post('api/user/registration', {
        email,
        password,
        role,
        canCreate,
        canEdit,
        canDelete,
      });

      if (res.data?.message) {
        alert(res.data?.message);
        return;
      }

      dispatch(setTotalCount(totalCount + 1));
      dispatch(setUserModal(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
