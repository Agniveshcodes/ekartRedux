import { product } from "../models/product";
import { ActionCreator } from "./ActionCreator";

export const LOAD_PRODUCTS = "LOAD_PRODUCTS";

export const loadProductAction: ActionCreator<undefined> = () => ({
  type: LOAD_PRODUCTS,
  payload: undefined,
});

export const PRODUCTS_LOADED = "PRODUCTS_LOADED";

export const productsLoadedAction: ActionCreator<product[]> = (
  products: product[]
) => ({
  type: PRODUCTS_LOADED,
  payload: products,
});
