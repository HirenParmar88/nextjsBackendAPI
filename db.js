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
client.query('delete from users where user_id=4',(err,res)=>{
  if(!err){
    console.log("deleted successfully");
  }else{
    console.log("Error !!");
  }
})

client.end;