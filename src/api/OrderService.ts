import Order from "../model/Order";
import {Request, Response} from "express";
import User from "../model/User";
import Customer from "../model/Customer";
import Product from "../model/Product";
import {agg, lookup, match, orderAggregate} from "../appHelpers";

export const OrderService = {
    createOrder: (req: Request, resp: Response) => {
        console.log('creating new order')
        const orderToCreate = new Order(req.body)
        orderToCreate.save((err, order) => {
            if (err) resp.status(400).send(err)
            else resp.send(order)
        })
    },

    updateOrder: (req: Request, resp: Response) => {
        console.log('updating order');
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
        console.log('deleting order');
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
        console.log('getting orders.');
        Order.find(async (err, orders) => {
            if (err) console.log(err);
            else {
                const _orders = await orders.map(order => {
                    const _order = Order.aggregate(orderAggregate(), (err: any, order: any) => {
                        if(order) {
                            console.log({ order })
                            const _products = order.products
                            console.log({ _products })
                            return order
                        }
                        else console.log({ err })
                    })
                    resp.send(_order)
                    console.log({ _order })
                })
                console.log({ _orders })
                resp.send(_orders)
            }
        })
    },

    getOrderById: async (req: Request, resp: Response) => {
        console.log('getting order');
        let order: any;
        Order.aggregate(agg(['customers', 'users', 'products'], ['_id', "_id", "_id"]),
            (error: any , body:any) => {
                if (error)  console.log(error);
                order = body;
                console.log({ body })
                resp.send(order);
        });
        // Order.aggregate(orderAggregate(),
        //     (error: any , body:any) => {
        //         if (error)  console.log(error);
        //         order = body;
        //         console.log({ body })
        //         resp.send(order);
        // });
    }
}
