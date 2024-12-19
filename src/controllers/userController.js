//import client from "./../../db.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken'; //ES7
const {verify,decode,sign} = jwt;
import { secretKey } from '../utils/constant.js';
import CryptoJS from "crypto-js";
import {authSchema,updateSchema} from '../validation/userValidation.js'

//GET User usign Prisma
const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  //console.log("page and limit :", page, limit);

  const offset = (page - 1) * limit;
  try {
    //count tot users
    const totalUsers = await prisma.user.count();

    const result = await prisma.user.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true
      },
      orderBy:{
        id:'asc',
      }
      
    });
    console.log(result);

    return res.json({
      currentPage: page,
      pageSize: limit,
      code: 200,
      success: true,
      totalUsers,
      users: result,
    });
  } catch (err) {
    console.error("Something was wrong !!", err);
    return res.status(500).send("server err");
  }
};

// Add Users Back-End APIs
const addUsers = async (req, res) => {
  console.log(req.body);
  try {
    const body = await authSchema.validateAsync(req.body);
    console.log("validate user Schema :",body);
    const { username, email, password} = req.body;  
    
    const cipherText = CryptoJS.AES.encrypt(body.password,secretKey).toString()   //secretKey is key
    console.log("cipher text", cipherText);
    
    const getUser = await prisma.user.findFirst({
      where: {
        name: body.username
      }     
    })
    if(getUser) {
      return res.status(409).json({
        error: "User already exists"
      })
    }
    const result = await prisma.user.create({
      data: {
        name: body.username,
        email: body.email,
        password: cipherText,
      },
    });
    //console.log("Authenticate users jwt token is :-", token)
    return res.json({
      code: 200,
      success: true,
      data: result.rows,
      total: result.rowCount,
    });
  } catch (err) {
      if(err.isJoi === true){
        res.status(422).json({message:"enter valid details"})
        console.log("enter valid detail of user");
        return;
      }
    console.error("Error adding user:", err);
    return res.status(500).json({ error: err });
  }
};

//Update Users APIs
const upUsers = async (req, res) => {
  console.log('update users ...');
  try {
  //console.log("body data :",req.body);
  const updateValidateUser = await updateSchema.validateAsync(req.body)
  console.log("updated user schema : ",updateValidateUser);
  
    const countUpdate=await prisma.user.count();
    console.log("Total Update :",countUpdate);
    
    const updateUsers = await prisma.user.update({
      where: {
        id: req.id  //req.id  /users?id=219
      }, 
      data: {
        name: updateValidateUser.username,
        email: updateValidateUser.email,
        password: updateValidateUser.password
      },
    });
    console.log("Updated User Details :",updateUsers);
    
    return res.json({
      code: 200,
      success: true,
      data: updateUsers.rows,
      //total: updateUsers.rowCount,
      total: countUpdate,
      message:"users updated.."
    });
  } catch (err) {
    console.error("error to update users  !!", err);
    if(err.isJoi === true){
      res.status(422).json({message:"enter valid details"})
      console.log("enter valid detail to update user");
      return;
    }
    return res.status(500).json({ error: err });
  }
};

//Delete Users APIs
const deleteUsers = async (req, res) => {
  //console.log("body ", req.body)
  console.log("pram", req.params);
  const { id } = req.params;
  if (!id) {
    console.log('id are required !!');
  }
  try {
    const delUsers = await prisma.user.deleteMany({
      where: {
        id: parseInt(id),
      },
    });

    if (delUsers.count === 0) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: 'User not found or already deleted.',
      });
    }

    return res.json({
      code: 200,
      success: true,
      data: delUsers.rows,
      total: delUsers.rowCount,
    });
  } catch (err) {
    console.error("users not deleted !!", err);
  }
  return res.status(200).json({ sucess: true });
};

export { getUsers, addUsers, upUsers, deleteUsers };
