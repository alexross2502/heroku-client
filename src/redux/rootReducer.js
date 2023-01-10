import { combineReducers } from "redux";
import modalWindowReducer from "./modalWindowReducer";
import authorizationReducer from "./authorizationReducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rerenderReducer from "./rerenderReducer";
import orderReducer from "./orderReducer";
import modalMastersReducer from "./modalMastersReducer";
import { availableMastersReducer } from "./availableMastersReducer";
import { orderDataReducer } from "./orderDataReducer";
import orderSuccessReducer from "./orderSuccessReducer";

const rootReducer = combineReducers({
  modalWindow: modalWindowReducer,
  authorization: authorizationReducer,
  rerender: rerenderReducer,
  order: orderReducer,
  modalMasters: modalMastersReducer,
  availableMasters: availableMastersReducer,
  orderData: orderDataReducer,
  orderSuccess: orderSuccessReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
