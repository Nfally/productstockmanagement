import * as express from 'express'
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../api/UserService";

const UserRouter = express.Router();

UserRouter.post('/users', createUser);
UserRouter.put('/users/:id', updateUser);
UserRouter.delete('/users/:id', deleteUser);
UserRouter.get('/users', getAllUsers);
UserRouter.get('/users/:id', getUserById);

export default UserRouter
