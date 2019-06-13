 import { createStore } from 'redux';
import {applyMiddleware} from 'redux';
import rootReducer from "../Reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const intialState = {};
const middleware = [thunk];


const store = createStore(

  rootReducer,
  intialState,
  // localStorageMiddleware,
  // reHydrateStore,
  composeWithDevTools(
  applyMiddleware(...middleware),
// window.__REDUX_DEVTOOLS_EXTENSION__ && compose
)
);

export default store;
