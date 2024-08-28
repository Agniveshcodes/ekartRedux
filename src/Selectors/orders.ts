import { State } from "../store";

export function loadOrdersSelector(State: State) {
  return State.orders.loading;
}

export function ordersLoadedSelector(State: State) {
  const normalisedOrders = State.orders.orders;

  const ordersArr = Object.keys(normalisedOrders).map((items) => {
    return normalisedOrders[+items];
  });

  return ordersArr;
}

export function orderIdSelector(State: State) {
  return State.orders.orders;
}
