// Import your database client
//entry point app.js

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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
