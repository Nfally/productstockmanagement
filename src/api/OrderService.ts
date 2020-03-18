import Order from "../model/Order";
import {Request, Response} from "express";
import {agg, lookup, match, orderAggregate} from "../appHelpers";

export const OrderService = {
    createOrder: (req: Request, resp: Response) => {
        const orderToCreate = new Order(req.body)
        orderToCreate.save((err, order) => {
            if (err) resp.status(400).send(err)
            else resp.send(order)
        })
    },

    updateOrder: (req: Request, resp: Response) => {
        const id = req.params.id;
        if(id) Order.findByIdAndUpdate(id, req.body, (err, order) => {
            if (err) {
                console.error({ err });
                return resp.send('Customer not found')
            }
            return resp.send(order)
        });
        else throw new Error()
    },

    deleteOrder: (req: Request, resp: Response) => {
        const id = req.params.id;
        const orderToFound = Order.findById(id);
        if(!orderToFound) {
            return resp.send('customer not found')
        }
        Order.findByIdAndDelete(id, err => {
            if(err) resp.send(err);
            else resp.send('customer deleted successfully..')
        })
    },

    getAllOrders: async (req: Request, resp: Response) => {
        let orders: any;

        Order.aggregate(agg(['customers', 'users', 'products'], ['_id', "_id", "_id"], ['customer', 'user', 'products']),
            (error: any , body:any) => {
                if (error)  console.log(error);
                orders = body;
                console.log({ body })
                resp.send(orders);
            });
    },

    getOrderById: async (req: Request, resp: Response) => {
        const _id = req.params.id
        console.log({ _id })
        if (!_id) throw new Error('order not found.')
        else Order.findById(_id, (err, order) => {
            if (err) throw new Error('can\'t fetch this order')
            else resp.send(order)
        })
    }
}
