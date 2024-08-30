import { AnyAction } from "redux";
import { produce } from "immer";
import { orders } from "../models/orders";
import {
  LOAD_ORDERS,
  ORDER_DETAIL_LOADED,
  ORDERS_LOADED,
} from "../Actions/orders";
import { normalize, schema } from "normalizr";

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

        const productEntity = new schema.Entity("products");
        const orderEntity = new schema.Entity("orders", {
          products: [productEntity],
        });

        const normalised = normalize(orderArr, [orderEntity]);

        draft.orders = normalised.entities.orders!;
      });
    case ORDER_DETAIL_LOADED:
      return produce(State, (draft) => {
        const order = action.payload;

        const productEntity = new schema.Entity("products");
        const orderEntity = new schema.Entity("orders", {
          products: [productEntity],
        });

        const normalised = normalize(order, [orderEntity]);

        draft.orders[order.id] = normalised.entities.orders![order.id];
      });

    default:
      return State;
  }
}

export default ordersReducer;
