import { OrderService } from "../api/OrderService";
import Router from 'express'
import auth from "../middlewares/UserMiddlewares";
import errors from "../appHelpers";

const OrderRouter = Router();

// @ts-ignore
OrderRouter.post('/api/orders',[auth, errors.OrderError], OrderService.createOrder);
// @ts-ignore
OrderRouter.put('/api/orders/:id',[auth, errors.OrderError], OrderService.updateOrder);
OrderRouter.delete('/api/orders/:id', OrderService.deleteOrder);
OrderRouter.get('/api/orders', OrderService.getAllOrders);
OrderRouter.get('/api/orders/:id', OrderService.getOrderById);

export default OrderRouter
