import jwt from 'jsonwebtoken';

const auth = async (req: any, resp: any, next: any) => {
  const token = req.header('x-auth-token');
  if (!token) return resp.status(400).json({msg: 'No token'});
  try {
      const decode: any = await jwt.verify(token, 'secretToken');
      req.user = decode.user;
      next();

  }catch (e) {
      console.error(e.message);
      return resp.status(401).json({msg: 'Token is not valid'});
  }
};

export default auth;
