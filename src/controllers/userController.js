//import client from "./../../db.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken'; //ES7
const {verify,decode,sign} = jwt;
import { secretKey } from '../utils/constant.js';
import CryptoJS from "crypto-js";

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
      orderBy:{
        id:'desc',
      }
      
    });
    //console.log(result);

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
  
  const { username, email, password} = req.body;  
  const cipherText = CryptoJS.AES.encrypt(password,secretKey).toString()   //secretKey is key
  console.log("cipher text", cipherText);
  
  if (!username || !email || !password ) {
    console.log('username and password are required')
    return res.status(400).json({ error: "error message !!" });
  }
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        name: username
      }     
    })
    if(getUser) {
      return res.status(409).json({
        error: "User already exists"
      })
    }
    //const token = sign({ username: result.name, role: result.role }, secretKey, { expiresIn: "1hr" })

    const result = await prisma.user.create({
      data: {
        name: username,
        email,
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
    console.error("Error adding user:", err);
    return res.status(500).json({ error: err.message });
  }
};

//Update Users APIs
const upUsers = async (req, res) => {
  const id = req.query.id;
  const { username, email } = req.body;
  if (!username || !id || !email) {
    console.log('is required !!!')
  }
  console.log("id user email", id, username, email);  //email -> Unique
  try {
    const countUpdate=await prisma.user.count();
    const updateUsers = await prisma.user.updateMany({
      where: {
        id: parseInt(id)
      }, 
      data: {
        name: username,
        email: email
      },
    });

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
    // await prisma.user.deleteMany({
    //   where:{
    //     id:parseInt(id),
    //   }
    // });

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
