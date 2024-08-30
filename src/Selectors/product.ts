import { createSelector } from "reselect";
import { State } from "../store";

export function productStateSelector (State : State) {
  return State.product
}

export const productLoadingSelector = createSelector(
  productStateSelector ,
  function (productState) {
    return productState.loading
  }
)

export const productIdSelector = createSelector(
  productStateSelector,
  function (orderState) {
    return orderState.product;
  }
);

export const productLoadedSelector = createSelector(
  productIdSelector,
  function (normalisedProducts) {
    return Object.keys(normalisedProducts).map((items) => {
      return normalisedProducts[+items];
    });
  }
);
