import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
        //Add user from payload
        req.user = decoded.id;
        next();
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
  };

  const auth = {
    verifyToken
  };

  export default auth;
