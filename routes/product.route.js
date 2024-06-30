const express= require("express");
const Product=require("../models/product.model");
const router=express.json();
const {getProducts , getProduct}=require('../controller/product.controller');

router.get('/',getProducts);
router.get('/',async );

router.post("/",createProduct);

module.exports=router;