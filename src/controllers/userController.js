import client from "./../../db.js";

const getUsers = async(req,res)=>{
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    console.log('page and limit :',page,limit)
  
    const offset=(page - 1)*limit;
    try{
      const result= await client.query("select * from users limit $1 offset $2", [limit, offset])
  
      return res.json({
        currentPage: page,
        pageSize:limit,
        code : 200,
        sucess : true,
        totalUsers: result.rowCount,
        users: result.rows
      });
    }catch(err){
      console.error("Something was wrong !!",err);
      return res.status(500).send('server err');
    }
  }

const addUsers = async (req, res) => {
    const {username, email}= req.body;
    if(!username || !email){
      return res.err(400).json({error: "error message !!"})
    }
    try {
      const result = await client.query(
        `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *;`,
        [username, email]
      );
      return res.json({
        code : 200,
        sucess : true,
        data : result.rows,
        total : result.rowCount
      });
    } catch (err) {
      console.error("Error adding user:", err);
      return res.status(500).json({ error: err.message });
    }
  }
  
const upUsers=async(req,res)=>{
    const id = req.query.id
    const{ username }=req.body;
    if(!username || !id){
      //
    }
    console.log("id and user ", id, username)
    try{
      const updateUsers= await client.query(`UPDATE users SET username=$1 WHERE id=$2`,[username, id]);
  
      return res.json({
        code : 200,
        sucess : true,
        data : updateUsers.rows,
        total : updateUsers.rowCount
       });
    }catch(err){
      console.error('error to update users  !!',err);
    }
  }

const deleteUsers=async (req, res)=> {
    //console.log("body ", req.body)
    console.log('pram', req.params)
    const { id }=req.params;
    if(!id){
      //
    }
    try{
      const delUsers=await client.query(`delete from users where id=$1`,[id]);
      return res.json({ 
        code: 200,
        sucess: true,
        data: delUsers.rows,
        total: delUsers.rowCount
      })
    }catch(err){
      console.error('users not deleted !!',err);
    }
    return res.status(200).json({ sucess: true })
  }

export  { getUsers, addUsers, upUsers, deleteUsers }