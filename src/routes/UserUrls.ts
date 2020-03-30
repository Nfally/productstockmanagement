import { UserService } from "../api/UserService";
import Router from 'express'
import errors from "../appHelpers";
import auth from "../middlewares/UserMiddlewares";

const UserRouter = Router();

UserRouter.post('/api/users', errors.UsersErrors, UserService.createUser);
UserRouter.put('/api/users/:id',errors.UsersErrors,  UserService.updateUser);
UserRouter.delete('/api/users/:id',auth, UserService.deleteUser);
UserRouter.get('/api/users',auth, UserService.getAllUsers);
UserRouter.get('/api/users/:id',auth, UserService.getUserById);

export default UserRouter
