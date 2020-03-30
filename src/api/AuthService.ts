import User from "../model/User";
import bcrypt from "bcrypt"
import {Request, Response} from 'express'
import auth from '../middlewares/UserMiddlewares';
import {check, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import {errorsValidation} from "../appHelpers";
export let AuthService = {
    signIn:  async  (req: Request, resp: Response) => {
        errorsValidation(req,resp);
        resp.send('Bonjour');
        const {email, password} = req.body;
        try {
                // @ts-ignore
            const user: User = await User.findOne({ email });
                if (!user) {
                    resp.status(400).json({errors: [{msg: 'Invalid credentials'}]})
                }
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    resp.status(400).json({errors: [{msg: 'User or password invalid'}]})
                }
                const payload = {
                    user: {
                        id: user.id
                    }
                };
                jwt.sign(
                  payload,
                  "secretToken",
                    {expiresIn: 360000},
                    (error, token) => {
                      if (error) throw error;
                      resp.send(token);
                    }
                );
        }catch (e) {
            console.log(e.message);
            resp.status(500).json('Server Error');
        }
    },

    signOut(){
        console.log('signing out.')
    }
};

export default AuthService;
