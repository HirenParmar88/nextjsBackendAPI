//import client from "./../../db.js";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
import {authSchemaProduct,updateSchemaProduct} from '../validation/productValidation.js'

//app.get /product
const getProduct=async (req, res) => {
    const page = parseInt(req.query.page) || 1;  // Default to page 1
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 items per page
    //console.log('page and limit ', page , limit)
    
    const offset = (page - 1) * limit;  // Calculate offset
    try {
      const totalProducts= await prisma.product.count();
      const result = await prisma.product.findMany({
        skip:offset,
        take:limit,
        select:{
          id: true,
          product_name: true,
          price: true,
          description: true,
          userId: true
        },
        orderBy:{
          id: 'asc',
        },
      }) // Fetch paginated products
      // Send response
      return res.json({
        currentPage: page,
        pageSize: limit,
        code : 200,
        success : true,
        totalProducts,
        products: result,
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      return res.status(500).send('Server error');
    }
  }

//app.post /product
const addProduct= async (req, res) => {
  console.log("Add product data ", req.body);  
  try {
    const validProduct = await authSchemaProduct.validateAsync(req.body);
    console.log("product test :",validProduct);
    console.log(validProduct.userId);
    
    if (!validProduct.userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
      const result = await prisma.product.create({
        data:{
          product_name: validProduct.product_name,
          price: validProduct.price,
          description: validProduct.description,
          userId: validProduct.userId
        }
      })
      return res.json({
        code : 200,
        success : true,
        data : result.rows,
        total : result.rowCount
      });
    } catch (err) {
      if(err.isJoi === true){
        res.status(422).json({message:"enter valid details"})
        console.log("enter valid detail of products");
        return;
      }
      console.error("Error adding products:", err);
      return res.status(500).json({ error: err });
    }
  }

//app.put /product
const updProduct= async (req,res)=>{
    console.log("update product...");
    const ID =  req.params.id;
    try{
    const updateProductValidate= await updateSchemaProduct.validateAsync(req.body)
    console.log("update product validated :",updateProductValidate);
    console.log("req id :",req.id);
    
     const updateProduct= await prisma.product.update({
        where:{
          id: Number(ID)
        },
        data:{
          product_name: updateProductValidate.product_name,
          price: updateProductValidate.price,
          description: updateProductValidate.description
        }
      })
      console.log("updated product details :",updateProduct);
      
      return res.json({ 
        code : 200,
        success : true,
        data : updateProduct.rows,
        total : updateProduct.rowCount
      });
    }catch(err){
      //console.error('error to update products...',err);
      if(err.isJoi === true){
        res.status(422).json({message:"enter valid details"})
        console.log("enter valid detail of update products");
        return;
      }
      console.error("Error Updating products:", err);
      return res.status(500).json({ error: err });
    }
  }
  
const deleteProducts= async(req,res)=>{
    console.log('parameter',req.params);
    const { id } = req.params;
    if(!id){
      console.log('id is required !!')
    }
    try{
      const delProducts=await prisma.product.deleteMany({
        where:{
          id: parseInt(id),
        }
      })
      if (delProducts.count === 0) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: 'product not found or already deleted.',
        });
      }
      return res.json({ 
        code: 200,
        success: true,
        data: delProducts.rows,
        total: delProducts.rowCount
      })
    }catch(err){
      console.error('products not deleted !!',err);
    }
    return res.status(200).json({ success: true })
  }
  
  export { getProduct, addProduct, updProduct, deleteProducts}