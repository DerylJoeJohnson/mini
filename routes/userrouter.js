var express=require('express');
const router=express.Router();
var path=require('path');

var mongoose=require("mongoose");
var bodyparser=require("body-parser");
var url="mongodb://localhost/plant";
router.use(bodyparser.urlencoded({extended:true}));

var prd=require("../model/productmodel");
var car=require("../model/cartmodel");

router.get('/',function(req,res){
    res.render("userhome");
})

// router.get('/usercart',function(req,res){
//     res.render("usercart");
// })
router.get('/usercart/:pid',function(req,res){
    var productid=req.params.pid;
})

router.get('/usershop',function(req,res){
    prd.find({},function(err,data){
        if(err)
        throw err;
        else{
            res.render("usershop",{product:data});
        }
    })
})

router.post("/cartaction",function(req,res){

    var c=new cart();
    c.pid=req.body.pid;
    c.pname=req.body.pname;
    c.category=req.body.category;
    c.rate=req.body.rate;
    c.image = req.file.filename;
    var store=req.params.pid;
    c.save(function(err){
        if(err) throw err
        else
        {
            res.redirect("/usercart");
        }
    });
    
})

router.use(express.static(path.join(__dirname,"../public")));
module.exports=router;