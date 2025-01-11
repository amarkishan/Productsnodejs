import productModel from "../models/productModel.js";

const addProduct =async(req,res) =>
    {
        const{name,price,desc,url}= req.body

        try{
            const createProduct = await productModel.create(
                {
                    name:name,
                    desc:desc,
                    price:price,
                    url:url
                });
            res.status(201).json(createProduct);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).josn({message:"Something went wrong"})
        }
    } 
const showProducts = async(req,res) =>
    {
        try
        {
            const prods = await productModel.find();
            res.status(201).json(prods);
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json({meesage:"Something went wrong"});

        }
    }    

    export {addProduct,showProducts};