import Router from 'express'
import AuthService from "../api/AuthService";
import errors from "../appHelpers";
const AuthRouter = Router();

AuthRouter.post('/api/auth', errors.AuthError, AuthService.signIn);

export default AuthRouter;

