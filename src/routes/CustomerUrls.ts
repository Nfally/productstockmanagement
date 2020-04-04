import Router from 'express'
import  { CustomerService } from "../api/CustomerService";
import auth from "../middlewares/UserMiddlewares";
import errors from "../appHelpers";

const CustomerRouter = Router();

// @ts-ignore
CustomerRouter.post('/api/customers',[auth, errors.CustomerError], CustomerService.createCustomer);
// @ts-ignore
CustomerRouter.put('/api/customers/:id',[auth, errors.CustomerError], CustomerService.updateCustomer);
CustomerRouter.delete('/api/customers/:id', CustomerService.deleteCustomer);
CustomerRouter.get('/api/customers', CustomerService.getAllCustomers);
CustomerRouter.get('/api/customers/:id', CustomerService.getCustomerById);

export default CustomerRouter
