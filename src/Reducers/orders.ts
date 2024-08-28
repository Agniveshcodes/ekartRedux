import { AnyAction } from "redux";
import { produce } from "immer";
import { orders } from "../models/orders";
import { LOAD_ORDERS, ORDER_DETAIL_LOADED, ORDERS_LOADED } from "../Actions/orders";

export type State = {
  loading: boolean;
  orders: { [id: number]: orders };
};

export const initialState: State = {
  loading: false,
  orders: {},
};

function ordersReducer(State = initialState, action: AnyAction): State {
  switch (action.type) {
    case LOAD_ORDERS:
      return produce(State, (draft) => {
        draft.loading = true;
      });
    case ORDERS_LOADED:
      return produce(State, (draft) => {
        draft.loading = false;
        const orderArr = action.payload;

        orderArr.reduce((previous: any, current: orders) => {

          return { ...previous, [current.id]: current };
        }, {});

        draft.orders = orderArr
      });
      case ORDER_DETAIL_LOADED: 
      return produce(State , (draft)=> {
        const order = action.payload

        draft.orders[order.id] = order
      })

    default:
      return State;
  }
}

export default ordersReducer;
