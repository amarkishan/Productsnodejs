//import {productSchema} from "../models/productModel.js";

const { productSchema } = require('../models/productModel.js');




//add product
const addProduct =async(req,res) =>
    {
        const dynamoDB = req.app.get("awsdynamoDB");
        const{productId,name,price,desc,url}= req.body;

        const {error} = productSchema.validate(req.body);
        if(error)
        {
            return res.status(400).json({
                message:"validation failed",
                details:error.details.map((d) => d.message)
            });
        }
        const params = {
            TableName:"Products",
            Item:{
                productId,
                name,
                desc,
                price,
                url
            },
        }

        try{
            

            await dynamoDB.put(params).promise();    
            res.status(201).json({message : "Product added sucessfully",data:params.Item});
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json({message:"Something went wrong"});
        }
    } 


//shows all the products     
const showProducts = async(req,res) =>
    {
        const dynamoDB = req.app.get("awsDynamoDB");
        const params={
            TableName:"Products",
        }
        try
        {
            const data = await dynamoDB.scan(params).promise();
            res.status(201).json(data.Items);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json({meesage:"Something went wrong"});

        }
    }    

   
    //export {addProduct,showProducts};
    module.exports={addProduct,showProducts};