import { UserService } from "../api/UserService";
import Router from 'express'

const UserRouter = Router();

UserRouter.post('/api/users', UserService.createUser);
UserRouter.put('/api/users/:id', UserService.updateUser);
UserRouter.delete('/api/users/:id', UserService.deleteUser);
UserRouter.get('/api/users', UserService.getAllUsers);
UserRouter.get('/api/users/:id', UserService.getUserById);

export default UserRouter
