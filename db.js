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

//Show data users/products/accessories tables

// client.query(`select * from public.accessories`,(err, res)=>{
//   if(!err){
//     console.log(res.rows);
//   }else{
//     console.log("not connected db !!");
//   }
// })



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
    const insertData='INSERT INTO users(username,email) VALUES ($1, $2)';
    for(let i=1; i<=100; i++){
      const username=`users ${i}`;
      const email=(Math.random() * 100);
      //const password = Math.floor(Math.random()*100);

      await client.query(insertData, [username, email]);
    }
  // Commit the transaction
  await client.query('COMMIT');
  console.log('100 records inserted successfully!');
  
  } catch (err) {
    // Rollback in case of an error
    await client.query('ROLLBACK');
    console.error('Error inserting records:', err.message);
  
  } finally {
    //await client.end();  // Close the database connection
  }
}
insertUser();
*/

/*
// Function to insert records are product table
async function insertProducts() {
  try {
    await client.query('BEGIN');

    const insertQuery = 'INSERT INTO products (product_name, description, price) VALUES ($1, $2, $3)';
    
    // Loop to insert 100 records
    for (let i = 1; i <= 100; i++) {
      const product_name = `Product ${i}`;  // Name of the product
      const price = (Math.random() * 100).toFixed(2);  // Random price between 0 and 100
      const description = Math.floor(Math.random() * 100);  // Random stock quantity between 0 and 99
      
      await client.query(insertQuery, [product_name, description, price]);
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

/*
//insert data in accessories table using for loop and function (Note : this code are run one time !!)
async function insertAccessories(){
  console.log('function calling...')
  try{
      await client.query('BEGIN');
      const insertdata='INSERT INTO accessories(accessory_name, description, price) VALUES ($1, $2, $3)';
      for(let i=1; i<=100; i++){
        const accessory_name=`accessories ${i}`;
        const description=(Math.random()*100);
        //const product_id=(Math.random()*100);
        const price=Math.floor(Math.random()*100);

        await client.query(insertdata,[accessory_name,description,price]);
      }
      await client.query('COMMIT');
      console.log("record inserted successfully ");
  }catch(err){
    await client.query('ROLLBACK');
    console.error('error !!',err.message);
  }finally{
    await client.end();
  }
}
insertAccessories();
*/

//client.end;

module.exports={client};  //this module are use to ready for another file