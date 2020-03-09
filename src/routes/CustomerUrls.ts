import * as express from 'express'
import {createCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer} from "../api/CustomerService";

const CustomerRouter = express.Router();

CustomerRouter.post('/customers', createCustomer)
CustomerRouter.put('/customers/:id', updateCustomer)
CustomerRouter.delete('/customers/:id', deleteCustomer)
CustomerRouter.get('/customers', getAllCustomers)
CustomerRouter.get('/customers/:id', getCustomerById)

export default CustomerRouter
