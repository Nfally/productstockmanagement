import Order from "../model/Order";
import {Request, Response} from "express";
import User from "../model/User";
import Customer from "../model/Customer";
import Product from "../model/Product";

export const OrderService = {
    createOrder: (req: Request, resp: Response) => {
        console.log('creating new order');
        const orderToCreate = new Order(req.body);
        orderToCreate.save(err => {
            if (err) resp.status(400).send(err);
            resp.send(orderToCreate)
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
        console.log('getting all orders.');
        Order.find((err, orders) => {
            if (err) console.log(err);
            else resp.send(orders)
        })
    },

    getOrderById: async (req: Request, resp: Response) => {
        console.log('getting order by id');
        const user = await User.findById(req.body.user)
        const customer = await Customer.findById(req.body.customer)
        const products = await Product.find()

        Order.findById(req.params.id, (err, order) => {
            if (err) console.error(err);
            else {
                const o = new Order({
                    user: user,
                    customer: customer,
                    products: products
                })
                resp.send(o)
            }
        })
    }
}

// module.exports = OrderService
