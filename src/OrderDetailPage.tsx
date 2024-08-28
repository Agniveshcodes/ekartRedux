import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { orderIdSelector } from "./Selectors/orders"
import axios from "axios"
import { orderDetailLoadedAction } from "./Actions/orders"
import Loading from "./Loading"


type OrderDetailProps = {}


const OrderDetailPage : FC<OrderDetailProps> = () => {

    const params = useParams()
    const orderId = +params.id!

   const ordersMap = useSelector(orderIdSelector)
   const dispatch = useDispatch()

   const order = ordersMap[orderId]

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
            <div className="text-xl"> order no : {order.id} , total price : ${order.total}</div>
        </>
    )
}

export default OrderDetailPage;