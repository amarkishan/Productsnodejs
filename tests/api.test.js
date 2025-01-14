import app from '../index.js';
import  request from 'supertest';
import productModel  from '../models/productModel.js';



describe('API Tests',() => {

    beforeEach(async() => {
        await productModel.deleteMany({});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });




describe('POST /api/products/add', ()=>
{
    it('Should  create a new product',async() =>
    {
        const productData = {
            name:'Test Product',
            price: "99.99",
            desc: 'This is a test product',
            url: 'http://example.com/image.jpg'
        }

        const response = await request(app)
        .post('/products/add')
        .send(productData);
        
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(productData.name);
        expect(response.body.price).toBe(productData.price);
        expect(response.body.desc).toBe(productData.desc);
        expect(response.body.url).toBe(productData.url);
        

        

    });

    it('database error',async() =>
    {
        jest.spyOn(productModel,'create').mockRejectedValue(new Error('Database error'));
    
       const productData={
        name: 'Test Product',
        price: 99.99,
        desc: 'This is a test product',
        url: 'http://example.com/image.jpg'
       }; 

       const response = await request(app)
        .post('/products/add')
        .send(productData);
    
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message','Something went wrong')
    
    });

   

});

});
