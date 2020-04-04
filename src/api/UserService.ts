import User, {UserSchema} from "../model/User";
import Order from "../model/Order";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {errorsValidation} from "../appHelpers";

export const UserService = {
    createUser: async (req: any, resp: any) => {
        errorsValidation(req,resp);
        console.log('creating new user');
       try {
           let user = await User.findOne({email: req.body.email});
           if (user) {
               resp.status(400).json({msg: "User already exist"});
           }
           const userToCreate: any = new User(req.body);
           const salt = await bcrypt.genSalt(10);
           userToCreate.password = await bcrypt.hash(req.body.password, salt);
           await userToCreate.save();
           const payload = {
               user: {
                   id: userToCreate.id
               }
           };
           jwt.sign(
               payload,
               "secretToken",
               {expiresIn: 36000},
               (error, token) => {
                   if (error) throw error;
                   return resp.json({token});
               }
           )
       } catch (e) {
           console.error(e.message);
           return resp.json({msg: 'Server Error'});
       }

    },

    updateUser: async (req: Request, resp: Response) => {
        errorsValidation(req,resp);
        console.log('updating user');
        const id = req.params.id;
        try {
            const userToReturn = await User.findByIdAndUpdate(id, req.body);
            console.log({ userToReturn });
            return resp.send(userToReturn)
        }catch (e) {
            console.error(e.message);
            return resp.status(500).json({msg: 'Server Error'});
        }
    },

    deleteUser: async (req: Request, resp: Response) => {
        console.log('deleting user');
        const id = req.params.id;
        try {
            const customerToFound = await User.findById(id);
            if (!customerToFound) {
                return resp.send('product not found')
            }
            UserSchema.pre('remove', async function (next) {
                const user = this;
                await Order.deleteMany({ user: id });
                next()
            })
        }catch (e) {
            console.error(e.message);
            return resp.status(500).json({msg: 'Server Error'});
        }
    },

    getAllUsers: async (req: Request, resp: Response) => {
        console.log('getting all users.');
        try {
            await User.find((err, users) => {
                if (err) console.log(err);
                else resp.send(users)
            })
        }catch (e) {

        }
    },

    getUserById: async (req: Request, resp: Response) => {
        console.log('getting product by id');
        try {
            await User.findById(req.params.id, (err, user) => {
                if (err) console.error(err);
                else resp.send(user)
            })
        }catch (e) {
            console.error(e.message);
            return resp.status(500).json({msg: 'Server Error'});
        }

    }
};
