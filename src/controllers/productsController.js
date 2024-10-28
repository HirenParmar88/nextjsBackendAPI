import client from "./../../db.js";

//app.get /product
const getProduct=async (req, res) => {
    const page = parseInt(req.query.page) || 1;  // Default to page 1
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 items per page
    console.log('page and limit ', page , limit)
    
    const offset = (page - 1) * limit;  // Calculate offset
    try {
      const result = await client.query("select * from products limit $1 offset $2", [limit, offset]) // Fetch paginated products
      // Send response
      return res.json({
        currentPage: page,
        pageSize: limit,
        code : 200,
        sucess : true,
        totalProducts: result.rowCount,
        products: result.rows,
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
      return res.err(400).json({error: "error message !!"})
    }
    try {
      const result = await client.query(
        `INSERT INTO products (product_name, description, price) VALUES ($1, $2, $3) RETURNING *;`,
        [product_name, description,price]
      );
      return res.json({
        code : 200,
        sucess : true,
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
    const{ product_name }=req.body;
    if(!product_name || !id){
      //
    }
    console.log("id and productName ", id, product_name)
    try{
      const updateProduct= await client.query(`UPDATE products SET product_name=$1 WHERE id=$2`,[product_name, id]);
  
      return res.json({ 
        code : 200,
        sucess : true,
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
      //
    }
    try{
      const delProducts=await client.query(`delete from products where id=$1`,[id]);
      return res.json({ 
        code: 200,
        sucess: true,
        data: delProducts.rows,
        total: delProducts.rowCount
      })
    }catch(err){
      console.error('products not deleted !!',err);
    }
    return res.status(200).json({ sucess: true })
  }
  export { getProduct, addProduct, updProduct, deleteProducts}