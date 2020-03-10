import Customer from "../model/Customer";
import {Request, Response} from "express";

module.exports = {
    createCustomer: (req: Request, resp: Response) => {
        console.log('creating new customer');
        const customerToCreate = new Customer(req.body);
        customerToCreate.save(err => {
            if (err) resp.status(400).send(err);
            resp.send(customerToCreate)
        })
    },

    updateCustomer: (req: Request, resp: Response) => {
        console.log('updating customer');
        const id = req.params.id;
        if(id) Customer.findByIdAndUpdate(id, req.body, (err, customer) => {
            if (err) {
                console.error({ err });
                return resp.send('Customer not found')
            }
            return resp.send(customer)
        });
        else throw new Error()
    },

    deleteCustomer: (req: Request, resp: Response) => {
        console.log('deleting customer');
        const id = req.params.id;
        const customerToFound = Customer.findById(id);
        if(!customerToFound) {
            return resp.send('customer not found')
        }
        Customer.findByIdAndDelete(id, err => {
            if(err) resp.send(err);
            else resp.send('customer deleted successfully..')
        })
    },

    getAllCustomers: (req: Request, resp: Response) => {
        console.log('getting all customers.');
        Customer.find((err, customers) => {
            if (err) console.log(err);
            else resp.send(customers)
        })
    },

    getCustomerById: (req: Request, resp: Response) => {
        console.log('getting customer by id');
        Customer.findById(req.params.id, (err, customer) => {
            if (err) console.error(err);
            else resp.send(customer)
        })
    }
}
