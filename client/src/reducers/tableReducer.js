const SET_MODEL = 'SET_MODEL';
const SET_DATA = 'SET_DATA';
const SET_LIMIT = 'SET_LIMIT';
const SET_PAGE = 'SET_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const ADD_CHOSEN = 'ADD_CHOSEN';
const REMOVE_CHOSEN = 'REMOVE_CHOSEN';
const CLEAR_CHOSEN = 'CLEAR_CHOSEN';
const REMOVE_DATA = 'REMOVE_DATA';

const defaultState = {
  model: 'order',
  data: [],
  limit: 10,
  page: 1,
  totalCount: 0,
  chosen: [],
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_MODEL:
      return {
        ...state,
        model: action.payload,
      };

    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload,
      };

    case ADD_CHOSEN:
      return {
        ...state,
        chosen: [...state.chosen, action.payload],
      };

    case REMOVE_CHOSEN:
      return {
        ...state,
        chosen: [...state.chosen.filter((item) => item !== action.payload)],
      };

    case CLEAR_CHOSEN:
      return {
        ...state,
        chosen: [],
      };

    case REMOVE_DATA:
      return {
        ...state,
        data: [...state.data.filter((item) => item.id !== action.payload)],
      };

    default:
      return state;
  }
}

export const setModel = (model) => ({
  type: SET_MODEL,
  payload: model,
});

export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setTotalCount = (count) => ({
  type: SET_TOTAL_COUNT,
  payload: count,
});

export const addChosen = (entry) => ({
  type: ADD_CHOSEN,
  payload: entry,
});

export const removeChosen = (entry) => ({
  type: REMOVE_CHOSEN,
  payload: entry,
});

export const clearChosen = () => ({
  type: CLEAR_CHOSEN,
});

export const removeData = (id) => ({
  type: REMOVE_DATA,
  payload: id,
});
