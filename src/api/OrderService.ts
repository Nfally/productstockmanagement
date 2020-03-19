import Order from "../model/Order";
import {Request, Response} from "express";
import {agg, lookup, match, orderAggregate} from "../appHelpers";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {ObjectId} from "bson";

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
                console.log({ body });
                resp.send(orders);
            });
    },

    getOrderById: async (req: Request, resp: Response) => {
        let _id = req.params.id;
        console.log(typeof (new ObjectId(_id)));
        Order.aggregate(orderAggregate(_id), (error: any, order: any) => {
             return resp.send(order);
         })
    },
    getOrderByReference: async (req: Request, resp: Response) => {
        let reference = req.params.reference;
        Order.aggregate(orderAggregate(reference), (error: any, order: any) => {
            if (order.length == 0)  return resp.status(400).send({'errors': 'Orders not found'});
            return resp.send(order);
        })
    }
};
