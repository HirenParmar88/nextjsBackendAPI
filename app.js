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

/*
app.get('/users',async(req,res)=>{
  try{
    const getUsers=await client.query('SELECT * FROM users');
    return res.json(getUsers);
  }catch(err){
    console.error('error to get users !!',err);
  }
}); 

app.get('/products',async (req,res)=>{
  try{
    const result= await client.query('SELECT * FROM products');
    return res.json(result);
  }catch(err){
    console.error('error !!!',err);
  }
});

app.get('/accessories',async(req,res)=>{
  try{
    const getAccessories= await client.query('SELECT * FROM accessories');
    return res.json(getAccessories);
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

/*app.post('/users', async (req, res) => {
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
});*/

/*app.post('/products', async (req, res) => {
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
});*/

/*app.post('/accessories', async (req, res) => {
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
});*/


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

//client.end;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
