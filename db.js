//database connections
const { Client } = require('pg');

const client = new Client({
  host:"localhost",
  user:"postgres",
  port:"5432",
  password:"admin123",
  database:"postgres"
})
client.connect();

//Show data

client.query(`select * from public.users`,(err, res)=>{
  if(!err){
    console.log(res.rows);
  }else{
    console.log("not connected db !!");
  }
})


// INSERT data in pg    
/*client.query(`insert into public.users("user_id","username","email","password") values (4,'ravi','ravi12@gmail.com','ravi12')`,(err,res)=>{
  if(!err){
    console.log(res.rows);
  }else{
    console.log("Record not inserted !!");
  }
})*/

//UPDATE data

/*client.query("UPDATE public.users SET username='aaa' WHERE user_id=3", (err, res) => {
  if (!err) {
    console.log("Update successful:", res.rows);  // Log row count for affected rows
  } else {
    console.log("Error:", err.message);  // Log error message for debugging
  }
})*/

//delete data
/*client.query('delete from users where user_id=4',(err,res)=>{
  if(!err){
    console.log("deleted successfully");
  }else{
    console.log("Error !!");
  }

})*/

/*
// Function to insert 100 data in users table
async function insertUser(){
  try{
    await client.query('BEGIN');
    const insertData='INSERT INTO users(username,email,password) VALUES ($1, $2, $3)';
    for(let i=1; i<=100; i++){
      const username=`users ${i}`;
      const email=(Math.random() * 100);
      const password = Math.floor(Math.random()*100);

      await client.query(insertData, [username, email, password]);
    }
  // Commit the transaction
  await client.query('COMMIT');
  console.log('100 records inserted successfully!');
  
  } catch (err) {
    // Rollback in case of an error
    await client.query('ROLLBACK');
    console.error('Error inserting records:', err.message);
  
  } finally {
    await client.end();  // Close the database connection
  }
}
insertUser();
*/

/*
// Function to insert records are product table
async function insertProducts() {
  try {
    await client.query('BEGIN');

    const insertQuery = 'INSERT INTO products (product_name, price, stock_quantity) VALUES ($1, $2, $3)';
    
    // Loop to insert 100 records
    for (let i = 1; i <= 100; i++) {
      const productName = `Product ${i}`;  // Name of the product
      const price = (Math.random() * 100).toFixed(2);  // Random price between 0 and 100
      const stockQuantity = Math.floor(Math.random() * 100);  // Random stock quantity between 0 and 99
      
      await client.query(insertQuery, [productName, price, stockQuantity]);
    }

    // Commit the transaction
    await client.query('COMMIT');
    console.log('100 records inserted successfully!');
    
  } catch (err) {
    // Rollback in case of an error
    await client.query('ROLLBACK');
    console.error('Error inserting records:', err.message);
    
  } finally {
    await client.end();  // Close the database connection
  }
}
insertProducts();
*/

//client.end;

module.exports={client};  //this module are use to ready for another file