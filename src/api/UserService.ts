import User, {UserSchema} from "../model/User";
import {Request, Response} from "express";
import Order from "../model/Order";

export const UserService = {
    createUser: (req: Request, resp: Response) => {
        console.log('creating new user');
        const userToCreate = new User(req.body);
        userToCreate.save(err => {
            if (err) resp.status(400).send(err);
            resp.send(userToCreate)
        })
    },

    updateUser: async (req: Request, resp: Response) => {
        console.log('updating user');
        const id = req.params.id;
        const userToReturn = await User.findByIdAndUpdate(id, req.body)
        console.log({ userToReturn })
        return resp.send(userToReturn)
    },

    deleteUser: async (req: Request, resp: Response) => {
        console.log('deleting user');
        const id = req.params.id;
        const customerToFound = await User.findById(id);
        if (!customerToFound) {
            return resp.send('product not found')
        }
        // User.findByIdAndDelete(id, err => {
        //     if (err) resp.send(err);
        //     else resp.send('user deleted successfully..')
        // })
        UserSchema.pre('remove', async function (next) {
            const user = this
            await Order.deleteMany({ user: id })
            next()
        })
    },

    getAllUsers: (req: Request, resp: Response) => {
        console.log('getting all users.');
        User.find((err, users) => {
            if (err) console.log(err);
            else resp.send(users)
        })
    },

    getUserById: (req: Request, resp: Response) => {
        console.log('getting product by id');
        User.findById(req.params.id, (err, user) => {
            if (err) console.error(err);
            else resp.send(user)
        })
    }
}

// module.exports = UserService
