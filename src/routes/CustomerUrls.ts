import Router from 'express'
import  { CustomerService } from "../api/CustomerService";

const CustomerRouter = Router();

CustomerRouter.post('/api/customers', CustomerService.createCustomer)
CustomerRouter.put('/api/customers/:id', CustomerService.updateCustomer)
CustomerRouter.delete('/api/customers/:id', CustomerService.deleteCustomer)
CustomerRouter.get('/api/customers', CustomerService.getAllCustomers)
CustomerRouter.get('/api/customers/:id', CustomerService.getCustomerById)

export default CustomerRouter
