<template>
<div >
    <BasketRouter :basket_items_count="basketCount" />
    <ProductList :product_list="products" :currencyUnit="currencyUnit" :host="host" @addToBasket="addItemToBasket($event)" />
</div>
</template>

<script>

import BasketRouter from '../components/BasketRouter.vue'
import ProductList from '../components/ProductList.vue'

import ShoppingCardClient from '../src/ShoppingCardClient.js'
var hostUrl = process.env.API_BASE_URL
const client = new ShoppingCardClient(hostUrl)

export default {
  components: { BasketRouter, ProductList },
  data()
  {
    return {
      basketCount : 0,
      products : [], 
      currencyUnit : "TL",
      host : hostUrl,
    }
    },
    methods: {
      async addItemToBasket(index)
      {
        var itemToAddBasket = this.products[index];
        this.basketCount = await client.addProductToBasket(itemToAddBasket)
      }
  },
  async mounted()
  { 
    this.products =  await client.getProducts()
    this.basketCount =  await client.getBasketCount()
    
  }
}
  
  
</script>
