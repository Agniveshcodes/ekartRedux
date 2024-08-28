import { combineReducers, createStore } from "redux";
import productReducer from "./Reducers/product";
import ordersReducer from "./Reducers/orders";

const reducer = combineReducers({
    product : productReducer,
    orders : ordersReducer
})

export type State = ReturnType<typeof reducer>

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
