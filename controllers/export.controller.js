let cart=require("../modules/cart/cart.repo")
let order=require("../modules/order/order.repo")
let product=require("../modules/product/product.repo")
let review=require("../modules/review/review.repo")
let user=require("../modules/user/user.repo")
let wishlist=require("../modules/wishlist/wishlist.repo")

const createCsvWriter = require('csv-writer').createObjectCsvWriter
let path=require("path")
const fs=require("fs")

exports.exportCarts=async(req,res)=>{
     
    try{
    let result=await cart.list()
    let data=JSON.parse(JSON.stringify(result.data))
    const csvWriter = createCsvWriter({
        path: 'carts.csv',
        header: [
            {id: '_id', title: 'ID'},
            {id: 'products', title: 'products'},
            {id: 'total', title: 'products'},
            {id: 'user', title: 'products'},
            {id: 'store', title: 'products'},
           
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
            res.download(path.join(__dirname,"../carts.csv"),()=>{
            console.log("file download successfully")
            fs.unlinkSync("./carts.csv")
            })
        });
    }catch(err){
     console.log("err.message"+err.message)
     res.status(500).json({error:"Unexpected eror"})
    }
}

exports.exportOrders=async(req,res)=>{
     
    try{
    let result=await order.list()
    let data=JSON.parse(JSON.stringify(result.data))
    const csvWriter = createCsvWriter({
        path: 'orders.csv',
        header: [
            {id: '_id', title: 'ID'},
            {id: 'user', title: 'user'},
            {id: 'store', title: 'user'},
            {id: 'products', title: 'user'},
            {id: 'total', title: 'user'},
            {id: 'startDate', title: 'user'},
            {id: 'status', title: 'user'},
           
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
            res.download(path.join(__dirname,"../orders.csv"),()=>{
            console.log("file download successfully")
            fs.unlinkSync("./orders.csv")
            })
        });
    }catch(err){
     console.log("err.message"+err.message)
     res.status(500).json({error:"Unexpected eror"})
    }
}

exports.exportProducts=async(req,res)=>{
     
    try{
    let result=await product.list()
    let data=JSON.parse(JSON.stringify(result.products))
    const csvWriter = createCsvWriter({
        path: 'products.csv',
        header: [
            {id: '_id', title: 'ID'},
            {id: 'name', title: 'name'},
            {id: 'price', title: 'name'},
            {id: 'description', title: 'name'},
            {id: 'image', title: 'name'},
            {id: 'category_name', title: 'name'},
            {id: 'availability', title: 'name'},
            {id: 'rate', title: 'name'},
            {id: 'numOfReviews', title: 'name'},
            {id: 'store', title: 'name'},
           
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
            res.download(path.join(__dirname,"../products.csv"),()=>{
            console.log("file download successfully")
            fs.unlinkSync("./products.csv")
            })
        });
    }catch(err){
     console.log("err.message"+err.message)
     res.status(500).json({error:"Unexpected eror"})
    }
}

exports.exportReviews=async(req,res)=>{
     
    try{
    let result=await review.list()
    let data=JSON.parse(JSON.stringify(result.reviews))
    const csvWriter = createCsvWriter({
        path: 'reviews.csv',
        header: [
            {id: '_id', title: 'ID'},
            {id: 'title', title: 'title'},
            {id: 'content', title: 'title'},
            {id: 'created_at', title: 'title'},
            {id: 'user', title: 'title'},
            {id: 'product', title: 'title'},
            {id: 'rating', title: 'title'},
           
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
            res.download(path.join(__dirname,"../reviews.csv"),()=>{
            console.log("file download successfully")
            fs.unlinkSync("./reviews.csv")
            })
        });
    }catch(err){
     console.log("err.message"+err.message)
     res.status(500).json({error:"Unexpected eror"})
    }
}

exports.exportUsers=async(req,res)=>{
     
    try{
    let result=await user.list()
    let data=JSON.parse(JSON.stringify(result.data))
    const csvWriter = createCsvWriter({
        path: 'users.csv',
        header: [
            {id: '_id', title: 'ID'},
            {id: 'Name', title: 'Name'},
            {id: 'Email', title: 'Name'},
            {id: 'Password', title: 'Name'},
            {id: 'Address', title: 'Name'},
            {id: 'phone', title: 'Name'},
            {id: 'image', title: 'Name'},
            {id: 'role', title: 'Name'}
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
            res.download(path.join(__dirname,"../users.csv"),()=>{
            console.log("file download successfully")
            fs.unlinkSync("./users.csv")
            })
        });
    }catch(err){
     console.log("err.message"+err.message)
     res.status(500).json({error:"Unexpected eror"})
    }
}


exports.exportWishlists=async(req,res)=>{
     
    try{
    let result=await wishlist.list()
    let data=JSON.parse(JSON.stringify(result.data))
    const csvWriter = createCsvWriter({
        path: 'wishlists.csv',
        header: [
            {id: '_id', title: 'ID'},
            {id: 'user', title: 'user'},
            {id: 'products', title: 'user'},
            {id: 'dateAdded', title: 'user'},
           
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
            res.download(path.join(__dirname,"../wishlists.csv"),()=>{
            console.log("file download successfully")
            fs.unlinkSync("./wishlists.csv")
            })
        });
    }catch(err){
     console.log("err.message"+err.message)
     res.status(500).json({error:"Unexpected eror"})
    }
}

