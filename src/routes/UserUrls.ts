import Router from 'express'
import * as UserService from "../api/UserService";

const UserRouter = Router();

UserRouter.post('/api/users', UserService.createUser);
UserRouter.put('/api/users/:id', UserService.updateUser);
UserRouter.delete('/api/users/:id', UserService.deleteUser);
UserRouter.get('/api/users', UserService.getAllUsers);
UserRouter.get('/api/users/:id', UserService.getUserById);

export default UserRouter
