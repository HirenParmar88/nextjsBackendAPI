//import client from "./../../db.js";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

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
        orderBy:{
          id: 'desc',
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
    const {product_name, description, price}= req.body;
    if(!product_name || !description || !price){
      return res.status(400).json({error: "error message !!"})
    }
    try {
      // const user=await prisma.user.findFirst({
      //     where:{
      //         id: req.user.id
      //       },
      //     select:{
      //         id:true,
      //       }
      // })
      const result = await prisma.product.create({
        data:{
          product_name:product_name,
          price:price,
          description: description,
          userId: req.user.id
        }
      })
      return res.json({
        code : 200,
        success : true,
        data : result.rows,
        total : result.rowCount
      });
    } catch (err) {
      console.error("Error adding products:", err);
      return res.status(500).json({ error: err.message });
    }
  }

//app.put /product
const updProduct= async (req,res)=>{
    const id = req.query.id
    const{ product_name, price, description }=req.body;
    if(!product_name || !id || price || description){

      //
    }
    console.log("id and productName ", id, product_name)
    try{
      const updateProduct= await prisma.product.update({
        where:{
          id: parseInt(id)
        },
        data:{
          product_name:product_name,
          price:price,
          description:description
        }
      })
      return res.json({ 
        code : 200,
        success : true,
        data : updateProduct.rows,
        total : updateProduct.rowCount
      });
    }catch(err){
      console.error('error to update products...',err);
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