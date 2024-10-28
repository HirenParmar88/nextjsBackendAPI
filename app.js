// Import your database client
const {client} = require('./db');  

const express = require('express');
const app = express();
const PORT = 3000;

//Function to create tables
async function createTables(){
    const createUserTable=`
      create table if not exists users(
        id UUID primary key default uuid_generate_v4(),
        username varchar(50) not null unique,
        email varchar(100) not null unique,
        created_at timestamp default current_timestamp
      );
    `;

    const createProductsTable= `
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        product_name VARCHAR(100) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createAccessoriesTable= `
      CREATE TABLE IF NOT EXISTS accessories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        accessory_name VARCHAR(100) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try{
      await client.query(`create extension if not exists "uuid-ossp";`);
      await client.query(createUserTable);  //users
      await client.query(createProductsTable);  //products
      await client.query(createAccessoriesTable); //accessories
      console.log("Tables created successfully..")
    }catch(err){
      console.error('error creating tables',err);
    }finally{
      //client.end(); //it never ended
    }
}
createTables();

//route to get pagination of users
app.get('/users', async(req,res)=>{
  const page=parseInt(req.query.page) || 1;
  const limit=parseInt(req.query.limit) || 10;
  console.log('page and limit :',page,limit)

  const offset=(page - 1)*limit;
  try{
    const result= await client.query("select * from users limit $1 offset $2", [limit, offset])

    return res.json({
      currentPage: page,
      pageSize:limit,
      totalUsers: result.rowCount,
      users: result.rows
    });
  }catch(err){
    console.error("Something was wrong !!",err);
    return res.status(500).send('server err');
  }
});

// Route to get paginated products
app.get('/products', async (req, res) => {
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
      totalProducts: result.rowCount,
      products: result.rows,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).send('Server error');
  }
});

//routes to get paginated accessories
app.get('/accessories', async(req,res)=>{
  const page=parseInt(req.query.page) || 1;
  const limit=parseInt(req.query.limit) || 10;
  console.log('page and limit :',page, limit)
  const offset=(page-1)*limit;
  try{
    const result=await client.query("select * from accessories limit $1 offset $2",[limit,offset])
    return res.json({
      currentPage: page,
      pageSize: limit,
      totalAccessories:result.rowCount,
      accessories: result.rows
    });
  }catch(err){
    console.error('error !! can not find accessories',err);
    return res.status(500).send('server error !!')
  }
});

/*
app.get('/users',async(req,res)=>{
  try{
    const getUsers=await client.query('SELECT * FROM users');
    return res.json({
      code: 200,
      sucess: true,
      data: getUsers.rows,
      total: getUsers.rowCount
    });
  }catch(err){
    console.error('error to get users !!',err);
  }
}); 

app.get('/products',async (req,res)=>{
  try{
    const result= await client.query('SELECT * FROM products');
    return res.json({
      code : 200,
      sucess : true,
      data : result.rows,
      total: result.rowCount
    });
  }catch(err){
    console.error('error !!!',err);
  }
});

app.get('/accessories',async(req,res)=>{
  try{
    const getAccessories= await client.query('SELECT * FROM accessories');
    return res.json({
      code : 200,
      sucess : true,
      data : getAccessories.rows,
      total : getAccessories.rowCount
    });
  }catch(err){
    console.error('error to get accessories !!!',err);
  }
});
*/

//26-10-24 code

/*app.post('/users',(req,res)=>{
  //const addUser=(req.body);
  const client=(req.body);
  console.log('client');
  res.send(client);
});*/

app.use(express.json());

app.post('/users', async (req, res) => {
  const {username, email}= req.body;
  if(!username || !email){
    return res.err(400).json({error: "error message !!"})
  }
  try {
    const result = await client.query(
      `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *;`,
      [username, email]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding user:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.post('/products', async (req, res) => {
  const {product_name, description, price}= req.body;
  if(!product_name || !description || !price){
    return res.err(400).json({error: "error message !!"})
  }
  try {
    const result = await client.query(
      `INSERT INTO products (product_name, description, price) VALUES ($1, $2, $3) RETURNING *;`,
      [product_name, description,price]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding products:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.post('/accessories', async (req, res) => {
  const {accessory_name, description, price, product_id }= req.body;
  if(!accessory_name || !description || !price || product_id ){
    //return res.err(400).json({error: "error message !!"})
  }
  try {
    const result = await client.query(
      `INSERT INTO accessories (accessory_name, description, price, product_id ) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [accessory_name, description,price,product_id]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding accessories:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.put('/users', async(req,res)=>{
  const id = req.query.id
  const{ username }=req.body;
  if(!username || !id){
    //
  }
  console.log("id and user ", id, username)
  try{
    const updateUsers= await client.query(`UPDATE users SET username=$1 WHERE id=$2`,[username, id]);

    return res.json({ });
  }catch(err){
    console.error('error to update users  !!',err);
  }
});

app.put('/products',async (req,res)=>{
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
});

app.put('/accessories',async(req,res)=>{
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
})

app.delete('/users/:id',async (req, res)=> {
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
});

app.delete('/products/:id', async(req,res)=>{
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
})

app.delete('/accessories/:id', async(req,res)=>{
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
})

// client.query(`UPDATE public.users SET username='aaa' WHERE id='0297318f-86db-4e3a-a598-67c28160a289'`, (err, res) => {
//   if (!err) {
//     console.log("Update successful:", res.rows);  // Log row count for affected rows
//   } else {
//     console.log("Error:", err.message);  // Log error message for debugging
//   }
// })

//client.end;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
