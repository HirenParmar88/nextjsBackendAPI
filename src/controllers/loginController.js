// src/controller/loginController.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken'; //ES7
const {verify,decode,sign} = jwt;
import { secretKey } from '../utils/constant.js';
import CryptoJS from "crypto-js";

//GET Apis 
const login=async(req,res)=>{
    try {
    const { username, password} = req.body; //destructuring
    console.log('log in APIS ..',req.body)

    //console.log(username, password)
    if (!username || !password) {
        console.log("Username and password are required.");
        return res.status(400).json({
            code: 400,
            success: false,
            message: 'Username and password are required.',
        });
    }
        const result = await prisma.user.findFirst({
            where:{
                name: username,
                //password: password
            }
        });
        //console.log("result", result);
        if (!result) {
            console.log("User not found.");
            return res.status(400).json({
                code: 400,
                success: false,
                message: 'Invalid username or password',
            });
        }
        // decrypt password
        const plaintext = CryptoJS.AES.decrypt(result.password ,secretKey).toString(CryptoJS.enc.Utf8)
        console.log(plaintext);
        
        //console.log(result);
        if(password === plaintext){
            const token = sign({ id: result.id, username: result.name, role: result.role }, secretKey, { expiresIn: "5hr" })
            const user = await prisma.user.update({
                where: {
                    id: result.id
                },
                data: {
                    jwtToken: token
                }
            })  
            console.log("Authenticate users jwt token is :-", token,user)
            return res.json({
                code: 200,
                success: true,
                user,
                message: 'Login successfully'
              });
              
        }else{
            //console.log("unauthorized users !!")
            return res.json({
                code: 400,
                success: false,
                message: 'Invalid username or password'
              });  
        }
       
      } catch (err) {
        console.error("Something was wrong !!", err);
        return res.status(500).send("server err");
      }
}

export default login;
