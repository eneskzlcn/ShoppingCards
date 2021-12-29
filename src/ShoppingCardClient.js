import axios from "axios";

export default class ShoppingCardClient
{
    constructor(url)
    {
        if(url == undefined || url == '')   url = process.env.API_BASE_URL; 
        if (url.endsWith("/"))  url = url.substr(0, url.length - 1)
        this.url = url;  
    }
    toPath = (path)=>
    {
        if (!path.startsWith("/")) path = "/" + path
        return this.url + path;
    }
    async getProducts(){
     return axios.get(this.toPath("/products"))
        .then(r => r.data);
    }
    async getProductById (id){
        return axios.get(this.toPath("/products/"+ id))
        .then(r => r.data);
    }
    async getBasketProducts(){
        return axios.get(this.toPath("/basket"))
            .then(r => r.data);
    }
    async addProductToBasket(product){
        return axios.post(this.toPath("/basket"),product)
        .then(r => r.data).then(a => a.count);
    }
    async increaseCountOfProduct(id){
        return axios.get(this.toPath("/basket/"+id+"/increase"))
        .then(r => r.data);
    }
    async decreaseCountOfProduct(id){
        return axios.get(this.toPath("/basket/"+id+"/decrease"))
        .then(r => r.data);
    }
    async removeProductFromBasket(id){
        return axios.delete(this.toPath("/basket/"+id+"/remove"));
    }
    async clearAllBasket(id){
        return await axios.delete(this.toPath("/basket"));
    }
    async getBasketCount(){
        return await axios.get(this.toPath("/basket/count"))
        .then(r=> r.data).then(a => a.count);
    }
}