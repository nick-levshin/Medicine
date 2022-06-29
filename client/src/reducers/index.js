import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import appReducer from './appReducer';
import tableReducer from './tableReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  table: tableReducer,
  modal: modalReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
