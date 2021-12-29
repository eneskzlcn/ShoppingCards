import axios from "axios";
import path from "path"
import { Matchers ,Pact} from '@pact-foundation/pact'
import HttpStatus from 'http-status-codes'
import httpMethods from 'http-methods-constants'

const { eachLike, like } = Matchers 

const provider = new Pact({
    consumer: 'ShoppingCardClient',
    provider: 'ShoppingCardApi',
    log: path.resolve(process.cwd(),'logs','pact.log'),
    logLevel:"warn",
    dir: path.resolve(process.cwd(),'pacts'),
    spec:2
})
//GET ALL PRODUCTS *
//GET PRODUCT BY ID
//GET BASKET PRODUCTS
//ADD PRODUCT TO BASKET post
//INCREASE COUNT OF A BASKET PRODUCT
//DECREASE COUNT OF A BASKET PRODUCT
//REMOVE BASKET PRODUCT FROM BASKET del
//CLEAR ALL BASKET del
//GET BASKET COUNT
const exampleProduct = {
    product_id : 1,
    product_image_source: "imageurl",
    product_name : "T-Shirt",
    product_price : "50",
    product_category: "Clothes",
    product_color: "Black",
} 
const exampleBasketProduct = {
    product:{
        product_id : 1,
        product_image_source: "imageurl",
        product_name : "T-Shirt",
        product_price : "50",
        product_category: "Clothes",
        product_color: "Black",
    },
    count : 1
}

describe('Shopping Card consumer test',()=>{
    before( () => provider.setup());
    afterEach( () => provider.verify());
    after( () => provider.finalize());

    describe('A request for get all products',()=>{
        it("get all products successfully",async () => {
            await provider.addInteraction({
                state: 'i get products successfully',
                uponReceiving: 'A request for get all products',
                withRequest:{
                    method:httpMethods.GET,
                    path:'/products',
                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: eachLike(
                        exampleProduct
                    )
                },
            });
            await axios.get(provider.mockService.baseUrl+'/products').then(r => r.data)
        });
    });

    describe('A request for get product by id',()=>{
        it("i get product successfully",async () => {
            await provider.addInteraction({
                state: 'i get product successfully',
                uponReceiving: 'A request for get product by id',
                withRequest:{
                    method:httpMethods.GET,
                    path:'/products/1',
                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: like(
                        exampleProduct
                    )
                },
            });
            await axios.get(provider.mockService.baseUrl+'/products/1').then(r => r.data)
        });
    });

    describe('A request for get basket products',()=>{
        it("i get basket products successfully",async () => {
            await provider.addInteraction({
                state: 'i get basket products successfully',
                uponReceiving: 'A request for get basket products',
                withRequest:{
                    method:httpMethods.GET,
                    path:'/basket',
                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: eachLike(
                        exampleBasketProduct
                    )
                },
            });
            await axios.get(provider.mockService.baseUrl+'/basket').then(r => r.data)
        });
    });

    describe('A request for add product to basket products',()=>{
        it("i add product to basket products successfully",async () => {
            await provider.addInteraction({
                state: 'i add product to basket products successfully',
                uponReceiving: 'A request for add product to basket products',
                withRequest:{
                    method:httpMethods.POST,
                    path:'/basket',
                    headers:{'Content-Type':'application/json'},
                    body: exampleProduct
                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{'Content-Type':'application/json'},
                    body: like({
                        count:1
                    })
                },
            });
            await axios.post(provider.mockService.baseUrl+'/basket',exampleProduct)
        });
    });

    describe('A request for increase count of a product in basket by product id',()=>{
        it("i increased count of product successfully by given product id",async () => {
            await provider.addInteraction({
                state: "i increased count of product successfully by given product id",
                uponReceiving: 'A request for increase count of a product in basket by product id',
                withRequest:{
                    method:httpMethods.GET,
                    path:'/basket/1/increase',

                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{'Content-Type':'application/json'},
                    body: like(exampleBasketProduct)
                },
            });
            await axios.get(provider.mockService.baseUrl+'/basket/1/increase')
        });
    });

    describe('A request for decrease count of a product in basket by product id',()=>{
        it("i decreased count of product successfully by given product id",async () => {
            await provider.addInteraction({
                state: "i decreased count of product successfully by given product id",
                uponReceiving: 'A request for decrease count of a product in basket by product id',
                withRequest:{
                    method: httpMethods.GET,
                    path:'/basket/1/decrease',

                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{'Content-Type':'application/json'},
                    body: like(exampleBasketProduct)
                },
            });
            await axios.get(provider.mockService.baseUrl+'/basket/1/decrease')
        });
    });

    describe('A request for remove a product from basket by product id',()=>{
        it("i removed a product successfully from basket products by the products id",async () => {
            await provider.addInteraction({
                state: "i removed a product successfully from basket products by the products id",
                uponReceiving: 'A request for remove a product from basket by product id',
                withRequest:{
                    method:httpMethods.DELETE,
                    path:'/basket/1/remove',

                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{'Content-Type':'application/json'},
                    body: like(exampleBasketProduct)
                },
            });
            await axios.delete(provider.mockService.baseUrl+'/basket/1/remove')
        });
    });

    describe('A request for clear all products in basket',()=>{
        it("i cleared all the products in basket successfully",async () => {
            await provider.addInteraction({
                state: "i cleared all the products in basket successfully",
                uponReceiving: 'A request for clear all products in basket',
                withRequest:{
                    method: httpMethods.DELETE,
                    path: '/basket',

                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{'Content-Type':'application/json'},
                    body: eachLike(exampleBasketProduct)
                },
            });
            await axios.delete(provider.mockService.baseUrl+'/basket')
            
        });
    });

    describe('A request for get count of products in basket',()=>{
        it("i get count of products in basket sucessfully",async () => {
            await provider.addInteraction({
                state: "i get count of products in basket sucessfully",
                uponReceiving: 'A request for get count of products in basket',
                withRequest:{
                    method: httpMethods.GET,
                    path: '/basket/count',

                },
                willRespondWith:{
                    status: HttpStatus.OK,
                    headers:{'Content-Type':'application/json'},
                    body: like({
                        count:1
                    })
                },
            });
            await axios.get(provider.mockService.baseUrl+'/basket/count')
            
        });
    });
})