//Prisma Client to add data
import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();

//insert 100 record using for loop
// async function addUser(){
//     try{
//        for(let i=1; i<=100; i++){
//         const name=`user ${i}`;
//         const email=`user ${i}@gmail.com`;
//         await prisma.user.create({
//             data:{
//                 name: name,
//                 email: email,
//             },
//         });
//       }
//       console.log('100 record inserted successfully ...');
//     }catch(err){
//         console.error('Error are occured !!',err)
//     }finally{
//         //await prisma.$disconnect();
//     }
// }
// addUser();

//add product 100 using for loop
// async function addProduct(){
//     try{
//         const user=await prisma.user.findFirst({
//             where:{
//                 id:10
//             },
//             select:{
//                 id:true,
//             }
//         })
//        for(let i=1; i<=100; i++){
//         const product_name=`product ${i}`;
//         const price=255;
//         const description=`product ${i}`;
//         await prisma.product.create({
//             data:{
//                 product_name:product_name,
//                 price:price,
//                 description:description,
//                 userId: user.id
//             },
//         });
//       }
//       console.log('100 record inserted successfully ...');
//     }catch(err){
//         console.error('Error are occured !!',err)
//     }finally{
//         //await prisma.$disconnect();
//     }
// }
// addProduct();

async function addAccessory(){
    try{
        const product=await prisma.product.findFirst({
            where:{
               id:1
            },
            select:{
                id:true,
            }
        })
        if(!product){
            console.log("product not found !!")
        }
       for(let i=1; i<=100; i++){
        const name=`accessory ${i}`;
        await prisma.accessory.create({
            data:{
                name,
                productId:product.id
            },
        });
    }
    console.log('Accessory added successfully !!')
    }catch(err){
        console.log('Error !!',err)
    }
}
addAccessory()

//Find user using pagination

// async function getUsers(page=1, limit=10) {
//     const pageSize=(page - 1)*limit

//     const users=await prisma.user.findMany({})
//     console.log("page and limit",pageSize,limit)
//     console.log("show users: ",users)
// }
// getUsers()

// async function addUser() {
//     const user=await prisma.user.create({
//         data:{
//             email:"jay999@gmail.com",
//             name:"chauhan"
//         }
//     });
//     console.log(user);
// }
// addUser()

// async function addUser1(){
//     const user=await prisma.user.createMany({
//         data:[
//             {name:"aaa", email:"aaa@gmail.com"},
//             {name:"bbb", email:"bbbb@gmail.com"},
//             {name:"ccc", email:"ccccccc@gmail.com"},
//             {name:"ddd", email:"dddddd@gmail.com"},
//             {name:"eee", email:"eeeee@gmail.com"},
//         ]
//     })
//     console.log("Create Many Users :",user)
// }
// addUser1()

// async function findUser(){
//     //const user=await prisma.user.findFirst({});
//     //const user=await prisma.user.findMany({});
//     const user=await prisma.user.findFirstOrThrow({
//         // where:{
//         //     id: 'id'
//         // }
//     });
//     console.log("Find Unique Users : ",user);
// }
// findUser()

// async function updateUser(){
//     const user=await prisma.user.updateMany({
//         where:{
//             id:2
//         },
//         data:{
//             name:"Hiren Parmar",
//             email:"hirenparmar9313@gmail.com"
//         }
//     })
//     console.log(user)
// }
// updateUser()

// async function deleteUser(){
//     console.log("working ...")
//     const userdel=await prisma.user.delete({
//         where:{
//             id:4
//         },
        
//     })
//     console.log("user deleted successfully..",userdel)
// }
// deleteUser()