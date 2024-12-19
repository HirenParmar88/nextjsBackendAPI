//src/middleware/authMiddleware.js

import pkg from 'jsonwebtoken';
const {verify } = pkg;

import { secretKey } from '../utils/constant.js';

function verifyToken(req,res,next){
  const bearerHeader = req.headers.authorization;
  console.log("bearerHeader : ", bearerHeader)
  console.log("token : ", req.headers)
  //next();
  
    if(bearerHeader !== undefined){
      const bearer= bearerHeader.split(" ");
      const token=bearer[1];
      try {
        const data = verify(token, secretKey)
        console.log("token data ", data);
        
        req.id = data.id;
        req.role = data.role;
        console.log("req.role :- ",req.role);
        
        next();
        console.log("next call..")
      } catch (error) {
        res.send({
          code: 404,
          message: 'Token is not valid'
        })
      }
    }else{
      res.send({
        result: 'Token is not valid'
      })
       
    }
  }

  export default verifyToken;