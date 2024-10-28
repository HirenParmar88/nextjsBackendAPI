// Import your database client
//entry point app.js

import client from './db.js';  

import userRoutes from './src/routes/users.js';
import products from './src/routes/products.js';
import accessories from './src/routes/accessories.js'

import express, { json } from 'express';
const app = express();
const PORT = 3000;

//Route 
app.use(json());

//define routes
app.use('/users', userRoutes)
app.use('/products', products)
app.use('/accessories', accessories)

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
