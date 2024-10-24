
const express = require('express')
const app = express()
let arr=[];

app.use((req,res,next)=>{
  //const d =new Date();
  console.log("middleware Run ");

  //res.send('Time :',d.getTime());
  //console.log("middleware Run ");
  next();
}, (req,res,next)=>{
  //res.send('<h2>middleware fun</h2>')
  next();
})

app.get('/', (req,res)=>{
  //const data={name: "Hiren", Age:"21"}
  //const data=[1,2,3,4,5];

  /*const data={
    name:"hiren",
    city:"bhavnagar"
  }
  res.send(data).json();*/

  res.json({name:"aaa",city:"mahuva"});
})

// app.get('/', function(req, res) {
//   res.send('<h1>Home Page</h1>')
// })

function hiren(req,res,next){
  console.log("GLS University !!");
  req.msg="Hello everyone";

  next();
}
//const midFun=hiren;
app.use(express.json())

//GET Method
app.get('/users', hiren,function(req, res,next){
  //let arr=[];
  // const formData=req.body;
  // console.log(formData);
  
  /*const users = [
    { id: 1, name: 'hiren' },
    { id: 2, name: 'vivek' }
  ];
  res.json(users);*/
  
  res.json(arr);
  
  //res.send(`<h1>users page</h1><p>${req.msg}</p>`)
})

//POST Method
app.post('/users', hiren,function(req, res,next){
  // const formData=req.body;
  // console.log(formData);
  console.log(req.body)

  arr.push(req.body);
  res.json(arr);
  //res.send(`<h1>users page</h1><p>${req.msg}</p>`)
})

//PUT method
app.put('/users/:id', hiren,function(req, res,next){
  //res.send("put method are working")
  console.log(req.params.id)
  arr.push(req.params.id)
  res.json(arr)
})

//DELETE method
app.delete('/users/:id', hiren,function(req,res,next){
  
  res.json(arr)
  //res.send("current user are deleted !!")
})


app.get('/products', function(req, res){
  res.send("<h1>products page</h1>")
})

app.get('/accessories', function(req, res){
  res.send("<h1>accessories page</h1>")
})

//middleware function use

// app.use('/user/:id', (req, res, next) => {
//   console.log('Request Type:', req.method)
//   next()
// })

app.listen(3000,()=>{
  console.log("server are running !!")
})
