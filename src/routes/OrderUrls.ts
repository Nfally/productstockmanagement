import Router from 'express'
import * as OrderService from "../api/OrderService";

const OrderRouter = Router();

OrderRouter.post('/api/orders', OrderService.createOrder)
OrderRouter.put('/api/orders/:id', OrderService.updateOrder)
OrderRouter.delete('/api/orders/:id', OrderService.deleteOrder)
OrderRouter.get('/api/orders', OrderService.getAllOrders)
OrderRouter.get('/api/orders/:id', OrderService.getOrderById)

export default OrderRouter
