import { $authHost } from './index';
import {
  removeChosen,
  removeData,
  setTotalCount,
} from '../reducers/tableReducer';
import { setLoading } from '../reducers/appReducer';

export const deleteEntries = (model, chosen, totalCount) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await chosen.forEach(async (element) => {
        await $authHost.delete('api/' + model + '/' + element);
        dispatch(removeData(element));
        dispatch(removeChosen(element));
      });

      dispatch(setTotalCount(totalCount - chosen.length));
      dispatch(setLoading(false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
