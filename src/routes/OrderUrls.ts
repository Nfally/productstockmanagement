import * as express from 'express'
import {createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder} from "../api/OrderService";

const OrderRouter = express.Router();

OrderRouter.post('/orders', createOrder)
OrderRouter.put('/orders/:id', updateOrder)
OrderRouter.delete('/orders/:id', deleteOrder)
OrderRouter.get('/orders', getAllOrders)
OrderRouter.get('/orders/:id', getOrderById)

export default OrderRouter
