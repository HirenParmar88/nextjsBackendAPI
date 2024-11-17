
//import client from './../../db.js';
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

const getAccessories= async(req,res)=>{
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;

    //console.log('page and limit :',page, limit)
    const offset=(page-1)*limit;
    try{
      const totalAccessories=await prisma.accessory.count();
      const result=await prisma.accessory.findMany({
        skip:offset,
        take:limit,
        orderBy: {
          createdAt: 'desc'
        }
      })
      //console.log(result)
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
      console.log('accessories name and product id is required !!')
    }
    try {
      const result = await prisma.accessory.create({
        data:{
          name:accessory_name,
          productId:parseInt(product_id)
        }
      })
      console.log(result)
      
      return res.json({
        code : 200,
        success : true,
        message: 'accessory added'
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
      console.log('id is required !!')
    }
    try{
      const delAccessories=await prisma.accessory.deleteMany({
        where:{
          id
        }
      });
      if (delAccessories.count === 0) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: 'Accessories not found or already deleted.',
        });
      }
      return res.json({ 
        code: 200,
        success: true,
        message: "accessory deleted"
      })
    }catch(err){
      console.error('accessories not deleted !!',err);
    }
  }
  
export {getAccessories, addAccessories, updateAccessories, deleteAccessories}