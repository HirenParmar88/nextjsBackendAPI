
//import client from './../../db.js';
import { PrismaClient } from "@prisma/client";
import {authSchemaAccessories, updateSchemaAccessories} from '../validation/accessoriesValidation.js'
import { error } from "console";
const prisma=new PrismaClient();

// Get Accessories
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

// Add Assessories
const addAccessories= async (req, res) => {
  console.log("aaaaa");
  try {
    console.log("body data :",req.body);
    const validAccessories = await authSchemaAccessories.validateAsync(req.body)
    console.log("Accessories Test : ",validAccessories)
    console.log('ss');
    console.log(validAccessories.product_id);
  
    if(!validAccessories.product_id ){
      console.log('product id is required !!')
    }
      const result = await prisma.accessory.create({
        data:{
          name: validAccessories.accessory_name,
          productId: validAccessories.product_id
        }
      })
      console.log(result)
      
      return res.json({
        code : 200,
        success : true,
        message: 'accessory added success.'
      });
    } catch (err) {
      console.error("Error adding accessories:", err);
      return res.status(500).json({ error: err.details[0].message });
    }
  }

// Update Product
const updateAccessories= async(req,res)=>{
  console.log("update accessories ..");
  const AccessoryID=req.params.id;
  console.log("req.params.id :- ",AccessoryID);
  try{
    const validatedAccessories = await updateSchemaAccessories.validateAsync(req.body)
    console.log("updated Accessories :-", validatedAccessories);
    //console.log(req.id);
    console.log("sssssss");
  
      const updateAccessories= await prisma.accessory.update({
        where:{
          id: AccessoryID
        },
        data:{
          name: validatedAccessories.accessory_name,
          //productId:product_id,
        }
      })
      console.log("Updated Accessories :",updateAccessories);
      
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

//delete accessories
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