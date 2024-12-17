//src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken'; //ES7
const {verify,decode,sign} = jwt;
import { secretKey } from '../utils/constant.js';

function verifyToken(req,res,next){
  const bearerHeader = req.headers.authorization;
  console.log("bearerHeader : ", bearerHeader)
  
    if(bearerHeader !== undefined){
      const bearer= bearerHeader.split(" ");
      const token=bearer[1];
      verify(token,secretKey,(err,authData)=>{
        if(err){
          res.send({result:"invalid token"})
        }else{
          console.log("Auth User :",authData);
          //req.user = authData;
          next();
        }
      })
    }else{
      res.send({
        result: 'Token is not valid'
      })
    }
  }

  export default verifyToken;