
import client from './../../db.js';

const getAcce= async(req,res)=>{
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    console.log('page and limit :',page, limit)
    const offset=(page-1)*limit;
    try{
      const result=await client.query("select * from accessories limit $1 offset $2",[limit,offset])
      return res.json({
        currentPage: page,
        pageSize: limit,
        code: 200,
        sucess: true,
        totalAccessories:result.rowCount,
        accessories: result.rows
      });
    }catch(err){
      console.error('error !! can not find accessories',err);
      return res.status(500).send('server error !!')
    }
  }

const addAccessories= async (req, res) => {
    const {accessory_name, description, price, product_id }= req.body;
    if(!accessory_name || !description || !price || product_id ){
      //return res.err(400).json({error: "error message !!"})
    }
    try {
      const result = await client.query(
        `INSERT INTO accessories (accessory_name, description, price, product_id ) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [accessory_name, description,price,product_id]
      );
      return res.json({
        code : 200,
        sucess : true,
        data : result.rows,
        total : result.rowCount
      });
    } catch (err) {
      console.error("Error adding accessories:", err);
      return res.status(500).json({ error: err.message });
    }
  }

const updateAccessories= async(req,res)=>{
    const id=req.query.id;
    const{ accessory_name }=req.body;
    if(!id || !accessory_name){
      //
    }
    console.log('id and accessory_name',id,accessory_name);
    try{
      const updateAccessories= await client.query(`UPDATE accessories SET accessory_name=$1 WHERE id=$2`,[accessory_name, id]);
  
      return res.json({ 
        code : 200,
        sucess : true,
        data : updateAccessories.rows,
        total : updateAccessories.rowCount
      });
    }catch(err){
      console.error('error to update assessories...',err);
    }
  }
  
const deleteAccessories= async(req,res)=>{
    console.log('parameter deleted:',req.params);
    const { id } = req.params;
    if(!id){
      //
    }
    try{
      const delAccessories=await client.query(`delete from accessories where id=$1`,[id]);
      return res.json({ 
        code: 200,
        sucess: true,
        data: delAccessories.rows,
        total: delAccessories.rowCount
      })
    }catch(err){
      console.error('accessories not deleted !!',err);
    }
    //return res.status(200).json({ sucess: true })
  }
  
export {getAcce, addAccessories, updateAccessories, deleteAccessories}