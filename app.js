// Import your database client
const {client} = require('./db');  

const express = require('express');
const app = express();
const PORT = 3000;

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

//client.end;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
