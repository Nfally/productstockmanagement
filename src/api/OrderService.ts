import Order from "../model/Order";
import {Request, Response} from "express";
import {errorsValidation} from "../appHelpers";

export const OrderService = {
    createOrder: (req: Request, resp: Response) => {
        errorsValidation(req,resp);
        const orderToCreate = new Order(req.body);
        orderToCreate.save((err, order) => {
            if (err) resp.status(400).send(err);
            else resp.send(order)
        })
    },

    updateOrder: (req: Request, resp: Response) => {
        errorsValidation(req,resp);
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
        try {
            const order = await Order.find().
            populate('user', ['-password']).
            populate('customer', ['-__v']).
            populate('products', ['-__v']);
            console.log(order);
            resp.json(order);
        }catch (e) {
            console.error(e.message);
            return resp.status(500).send('Server Error');
        }
    },

    getOrderById: async (req: Request, resp: Response) => {
        try {
            const order = await Order.findOne({'_id': req.params.id}).
            populate('user', ['-password', '-__v']).
            populate('customer', ['-__v']).
            populate('products', ['-__v']);
            console.log(order);
            resp.json(order);
        }catch (e) {
            console.error(e.message);
            return resp.status(500).send('Server Error');
        }
    }
};
