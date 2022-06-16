import { combineReducers } from "redux";
import modalWindowReducer from "./modalWindowReducer";
import authorizationReducer from "./authorizationReducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rerenderReducer from "./rerenderReducer";
import orderReducer from "./orderReducer";
import modalMastersReducer from "./modalMastersReducer";

const rootReducer = combineReducers({
  modalWindow: modalWindowReducer,
  authorization: authorizationReducer,
  rerender: rerenderReducer,
  order: orderReducer,
  modalMasters: modalMastersReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
