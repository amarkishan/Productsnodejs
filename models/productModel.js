
const Joi = require('joi');

const productSchema = Joi.object({
    productId: Joi.string().required(),
    name: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.string().required(), // Price as a string
    url: Joi.string().uri().optional(), // Optional URL with URI validation
});

module.exports = productSchema;

// const productSchema = mongoose.Schema({
//     name:{type:String,required:true},
//     desc:{type:String,required:true},
//     price:{type:String,require:true},
//     url:{type:String}

// })
// export default mongoose.model("Product",productSchema);
