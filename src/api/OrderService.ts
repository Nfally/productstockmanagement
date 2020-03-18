import Order from "../model/Order";
import {Request, Response} from "express";
import User from "../model/User";
import Customer from "../model/Customer";
import Product from "../model/Product";
import {lookup, match, orderAggregate} from "../appHelpers";

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
        Order.find((err, orders) => {
            if (err) console.log(err);
            else resp.send(orders)
        })
    },

    getOrderById: async (req: Request, resp: Response) => {
        // console.log('getting order by id');
        const body = req.body;
        console.log({ req });
        const user = await User.findById(req.body.user);
        // let cust = await match(Customer, req.body.customer, '_id');
        let order: any;
        Order.aggregate(orderAggregate(),
            (error: any , body:any) => {
                if (error)  console.log(error);
                order = body;
                resp.send(order);

            });
        // Order.aggregate(orderAggregate( 'products', 'products', '_id', 'products'),
        //     (error: any , body:any) => {
        //         if (error)  console.log(error);
        //         products = body;
        //
        //     });
        // return resp.send(
        //     {
        //           user: user,
        //          customer,
        //          products
        //     }
        // );
        //
        // try {
        //     customer = await lookup('customer', '_id', '_id', 'orders')
        // } catch (err) {
        //     throw new Error(`something went wrong: ${err}`)
        // }

        // products = await match(Product, req.body.products, '_id');
        // try {
        //     products = await lookup('product', '_id', '_id', 'products')
        // } catch (err) {
        //     console.log({ err })
        //     throw new Error(err)
        // }
        // products = Product.aggregate([
        //     {
        //         $match: {
        //             field: {
        //                 $in: '_id'
        //             }
        //         }
        //     }
        // ])

        //
        // const _order = Order.findById(req.params.id, (err, order) => {
        //     if (err) console.error(err);
        //     else {
        //         // const o = new Order({
        //         //     user: user,
        //         //     customer: customer,
        //         //     products: products
        //         // })
        //         // resp.send(o)
        //         //resp.send(order)
        //     }
        // });
        //
        // // products = lookup('Order', 'products', '_id', 'products')
        // // console.log({ products })
        //
        // console.log({
        //     _order
        // })
    }
}
