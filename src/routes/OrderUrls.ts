import { OrderService } from "../api/OrderService";
import Router from 'express'

const OrderRouter = Router();

OrderRouter.post('/api/orders', OrderService.createOrder);
OrderRouter.put('/api/orders/:id', OrderService.updateOrder);
OrderRouter.delete('/api/orders/:id', OrderService.deleteOrder);
OrderRouter.get('/api/orders', OrderService.getAllOrders);
OrderRouter.get('/api/orders/:reference', OrderService.getOrderByReference);

export default OrderRouter
