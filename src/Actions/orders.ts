import { orders } from "../models/orders";
import { ActionCreator } from "./ActionCreator";

export const LOAD_ORDERS = "LOAD_ORDERS";

export const loadOrdersAction: ActionCreator<undefined> = () => ({
  type: LOAD_ORDERS,
  payload: undefined,
});

export const ORDERS_LOADED = "ORDERS_LOADED";

export const orderLoadedAction: ActionCreator<orders[]> = (orders : orders[]) => ({
  type: ORDERS_LOADED,
  payload: orders,
});

export const ORDER_DETAIL_LOADED = "ORDER_DETAIL_LOADED"

export const orderDetailLoadedAction : ActionCreator<orders> = (order : orders) => ({
    type : ORDER_DETAIL_LOADED ,
    payload : order
})