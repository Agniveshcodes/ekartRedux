import { State } from "../store";

export function productLoadingSelector(state: State) {
  return state.product.loading;
}

export function productLoadedSelector(state: State) {
  const normalisedProducts = state.product.product;

  const productArr = Object.keys(normalisedProducts).map((pid) => {
    return normalisedProducts[+pid];
  });

  return productArr;
}
