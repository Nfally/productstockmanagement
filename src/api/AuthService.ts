import User from "../model/User";
import bcrypt from "bcrypt"
import {Request, Response} from 'express'

export let AuthService = {
    signIn: async (req: Request, resp: Response) => {
        const email = req.body.email
        const pwd = req.body.password

        const user = User.findOne({ email })
        if (!user) {
            throw new Error('unable to log in')
        }

        // @ts-ignore
        const isMatch = await bcrypt.compare(pwd, user.password)
        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return user
    },

    signOut(){
        console.log('signing out.')
    }
}
