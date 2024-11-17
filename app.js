//app.js

// Import your database client
//entry point app.js

import userRoutes from './src/routes/users.js';
import products from './src/routes/products.js';
import accessories from './src/routes/accessories.js';
import cors from 'cors';
import express, { json } from 'express';
const app = express();
const PORT = 5000;

//Route 
app.use(json());
app.use(cors());
// app.use(cors({
//   origin: ['http://127.0.0.1:3000', 'http://localhost:3000']
// }));

//define routes
app.get('/',async (req,res)=>{
  res.send("Surver is running...")
})
app.use('/users', userRoutes)
app.use('/products', products)
app.use('/accessories', accessories)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
