
//import client from './../../db.js';
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

const getAcce= async(req,res)=>{
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    console.log('page and limit :',page, limit)
    const offset=(page-1)*limit;
    try{
      const totalAccessories=await prisma.accessory.count();
      const result=await prisma.accessory.findMany({
        skip:offset,
        take:limit,
      })
      return res.json({
        currentPage: page,
        pageSize: limit,
        code: 200,
        success: true,
        totalAccessories,
        accessories: result
      });
    }catch(err){
      console.error('error !! can not find accessories',err);
      return res.status(500).send('server error !!')
    }
  }

const addAccessories= async (req, res) => {
    const {accessory_name, product_id }= req.body;
    if(!accessory_name || product_id ){
      //return res.err(400).json({error: "error message !!"})
    }
    try {
      const result = await prisma.accessory.create({
        data:{
          name:accessory_name,
          productId:product_id,
        }
      })
      return res.json({
        code : 200,
        success : true,
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
    if(!id || !accessory_name ){
      //
    }
    console.log('id and accessory_name',id,accessory_name);
    try{
      const updateAccessories= await prisma.accessory.update({
        where:{
          id,
        },
        data:{
          name:accessory_name,
          //productId:product_id,
        }
      })
      return res.json({ 
        code : 200,
        success : true,
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
      const delAccessories=await prisma.accessory.delete({
        where:{
          id
        }
      })
      return res.json({ 
        code: 200,
        success: true,
        data: delAccessories.rows,
        total: delAccessories.rowCount
      })
    }catch(err){
      console.error('accessories not deleted !!',err);
    }
    //return res.status(200).json({ success: true })
  }
  
export {getAcce, addAccessories, updateAccessories, deleteAccessories}