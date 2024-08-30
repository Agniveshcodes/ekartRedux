import { createSelector } from "reselect";
import { product } from "../models/product";
import { State } from "../store";
import { productIdSelector } from "./product";

export function orderStateSelector(State: State) {
  return State.orders;
}

export const loadOrdersSelector = createSelector(
  orderStateSelector,
  function (orderState) {
    return orderState.loading;
  }
);

export const orderIdSelector = createSelector(
  orderStateSelector,
  function (orderState) {
    return orderState.orders;
  }
);

export const ordersLoadedSelector = createSelector(
  orderIdSelector,
  function (normalisedOrders) {
    return Object.keys(normalisedOrders).map((items) => {
      return normalisedOrders[+items];
    });
  }
);

export const orderProductsSelector = createSelector(
  orderIdSelector,
  productIdSelector,
  function (orderMap, productMap) {
    return Object.keys(orderMap).reduce<{
      [orderId: number]: product[];
    }>((previous, currentOrderId) => {
      const order = orderMap[+currentOrderId];
      const products = order.products.map((pId) => {
        return productMap[pId];
      });
      return { ...previous, [currentOrderId]: products };
    }, {});
  }
);

