import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

const auth = {
  // @id = id user from db
  generateToken(id) {
    try {
      const payload = {
        id
      };
      const options = { expiresIn: 60 * 60 * 4 };
      const token = jwt.sign(payload, secret, options);

      return token;
    } catch (error) {
      // @TODO : CHANGE WITH HANDLER
      return console.log(error);
    }
  },
  // middleware de vérification pour les routes connectées
  verifyToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ msg: "No token" });
      }
      // Bearer djizjdijzijdizjdj.zdjiozjdz.ziodjzijdiojz
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ msg: "Token invalide" });
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(500).json('Une erreur est survenue dans le processus de connexion');
    }
  },

};

export default auth;
