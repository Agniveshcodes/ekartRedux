import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrdersAction, orderLoadedAction } from "./Actions/orders";
import axios from "axios";
import { loadOrdersSelector, ordersLoadedSelector } from "./Selectors/orders";
import Loading from "./Loading";
import { Link } from "react-router-dom";

type OrderListPageProps = {};

const OrderListPage: FC<OrderListPageProps> = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersLoadedSelector);
  const ordersLoading = useSelector(loadOrdersSelector);

  useEffect(() => {
    dispatch(loadOrdersAction());
    axios.get("https://dummyjson.com/carts").then((res) => {
      return dispatch(orderLoadedAction(res.data.carts));
    });
  }, []);

  return (
    <>
      {ordersLoading && <Loading />}
      {orders.map((items) => {
        return (
          <div key={items.id} className="text-xl font-bold">
            <Link to={`/orders/${items.id}`} className="text-indigo-700">
              {" "}
              cart number : {items.id}
            </Link>
            , order total : {items.total} product : {items.totalProducts}
          </div>
        );
      })}
    </>
  );
};

export default OrderListPage;
