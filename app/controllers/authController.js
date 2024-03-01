import jwt from 'jsonwebtoken';

const authController = {
  verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'No token. Access denied.' });
    }
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.log(err);
        return res.status(401).json({ message: 'Token Invalide' });
      }
      req.user = decoded;
      console.log('decoded token in req.user =>', req.user);
      next();
    });
  },
};

export default authController;
