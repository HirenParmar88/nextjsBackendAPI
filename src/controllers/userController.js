//import client from "./../../db.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET User usign Prisma

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  console.log("page and limit :", page, limit);

  const offset = (page - 1) * limit;
  try {
    //count tot users
    const totalUsers = await prisma.user.count();

    const result = await prisma.user.findMany({
      skip: offset,
      take: limit,
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

const addUsers = async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: "error message !!" });
  }
  try {
    const result = await prisma.user.create({
      data: {
        name: username,
        email,
      },
    });
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

const upUsers = async (req, res) => {
  const id = req.query.id;
  const { username, email } = req.body;
  if (!username || !id || !email) {
    //
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
      total: countUpdate
    });
  } catch (err) {
    console.error("error to update users  !!", err);
  }
};

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
        //id: parseInt(id),
        id: parseInt(id),
      },
    });

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
