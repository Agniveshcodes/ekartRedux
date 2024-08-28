import { AnyAction } from "redux";
import { produce } from "immer";
import { product } from "../models/product";
import { LOAD_PRODUCTS, PRODUCTS_LOADED } from "../Actions/product";
import { ORDERS_LOADED } from "../Actions/orders";

export type State = {
  product: { [id: number]: product };
  loading: boolean;
};

export const initialState: State = {
  product: {},
  loading: false,
};

function productReducer(State = initialState, action: AnyAction): State {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return produce(State, (draft) => {
        draft.loading = true;
      });
    case PRODUCTS_LOADED:
      return produce(State, (draft) => {
        draft.loading = false;

        const products = action.payload;

        const normalisedProducts = products.reduce(
          (previous: any, current: product) => {
            return {...previous, [current.id]: current };
          },{}
        );

        draft.product = normalisedProducts;
      });
    case ORDERS_LOADED:
      return produce(State, (draft) => {
        const orders = action.payload;

        const products = orders.reduce((previous: product[], current: any) => {
          return [...previous, ...current.products];
        }, []);

        const normalisedProducts = products.reduce(
          (previous: any, current: product) => {
            return { ...previous, [current.id]: current };
          },{}
        );

        draft.product = normalisedProducts;
      });
  }

  return State;
}

export default productReducer;
