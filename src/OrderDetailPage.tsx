import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { orderIdSelector, orderProductsSelector } from "./Selectors/orders"
import axios from "axios"
import { orderDetailLoadedAction } from "./Actions/orders"
import Loading from "./Loading"
import Product from "./Product"


type OrderDetailProps = {}


const OrderDetailPage : FC<OrderDetailProps> = () => {

    const params = useParams()
    const orderId = +params.id!

   const ordersMap = useSelector(orderIdSelector)
   const orderProductMap = useSelector(orderProductsSelector)

   console.log("orderProductMap" , orderProductMap)

   const dispatch = useDispatch()

   const order = ordersMap[orderId]
   const product = orderProductMap[orderId]

    useEffect(() => {
        if(!ordersMap[orderId]) {
            axios.get("https://dummyjson.com/carts/" + orderId).then((res)=> {
                return dispatch(orderDetailLoadedAction(res.data))
            }) 
        }
    },[orderId , ordersMap])

    if(!order) {
        return <Loading />
    }
  

    return (
        <>
            <div className=" px-2 ">
            <div className="text-xl font-semibold mb-2 "> order no : {order.id} , total price : ${order.total}</div>
            <div className="flex flex-wrap gap-6 w-screen">
            {product.map((items) => {
            return <Product
                key={items.id}
                title={items.title}
                id={items.id}
                price={items.price}
                category={items.category}
                rating={items.rating}
              />
            })}
            </div>
            </div>
        </>
    )
}

export default OrderDetailPage;