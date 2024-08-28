import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productLoadedSelector,
  productLoadingSelector,
} from "./Selectors/product";
import { loadProductAction, productsLoadedAction } from "./Actions/product";
import axios from "axios";
import Product from "./Product";
import Loading from "./Loading";

type ProductListProps = {};

const ProductList: FC<ProductListProps> = () => {
  const loading = useSelector(productLoadingSelector);
  const products = useSelector(productLoadedSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductAction());
    axios.get("https://myeasykart.codeyogi.io/products").then((res) => {
      dispatch(productsLoadedAction(res.data.data));
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="bg-gray-50 shadow-lg shadow-gray-400 py-12 rounded-md flex flex-col min-h-screen mx-10 sm:mx-24 md:mx-44 lg:mx-36 ">
        <div className=" gap-3 grid sm:grid-cols-2 mx-auto grid-cols-1 md:grid-cols-2 sm:gap-4 md:gap-2 lg:grid-cols-3 lg:gap-8">
          {products.map((items) => {
            return (
              <Product
                key={items.id}
                title={items.title}
                id={items.id}
                price={items.price}
                category={items.category}
                rating={items.rating}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
