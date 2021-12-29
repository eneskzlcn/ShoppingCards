<template>
<div class="container">
    <BasketTable v-if="product_count_pairs" :host="host" :products_count_pairs="product_count_pairs" :currencyUnit="currencyUnit"  :basket_total_price="total_basket_price"
      @increaseCountOfItem = "increaseCountOfItem($event)" @decreaseCountOfItem="decreaseCountOfItem($event)" @removeItem="removeItem($event)" />
    <p v-else-if="!product_count_pairs && product_count_pairs== 0" id="no-item-found">There is no item in basket</p>
    
    <div class="lower-menu">
      <button class="lower-clear bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" id="clearBasket" @click="clearBasket">Clear Basket</button>
      <a class="lower-return bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/">Return</a>
    </div>
    
</div>
</template>

<script>
import ShoppingCardClient from '../src/ShoppingCardClient.js'

var hostUrl = process.env.API_BASE_URL
const client = new ShoppingCardClient(hostUrl)

export default {
  data()
  {
    return {
      product_count_pairs : null,
      currencyUnit : "TL",
      total_basket_price :0,
      host:hostUrl
    }
  },
  methods:{
      async clearBasket()
      {
        await client.clearAllBasket()
        this.product_count_pairs = await client.getBasketProducts();
        
      },
      async increaseCountOfItem(index)
      {
        this.product_count_pairs[index] = await client.increaseCountOfProduct(this.product_count_pairs[index].product.product_id);
        this.updateBasketTablePrices();
      },
      async decreaseCountOfItem(index)
      {
        this.product_count_pairs[index] = await client.decreaseCountOfProduct(this.product_count_pairs[index].product.product_id);
        this.updateBasketTablePrices();
      },
      async removeItem(product_id)
      {
        await client.removeProductFromBasket(product_id);
        this.product_count_pairs = await client.getBasketProducts();
        this.updateBasketTablePrices();
      },
      updateBasketTablePrices()
      {
        if(!this.product_count_pairs) return;
        this.total_basket_price = 0;
        this.product_count_pairs.forEach(r => {
          let product_unit_price = r.product.product_price;
          let count = r.count;
          let product_total_price = Number.parseInt(r.product.product_price) * Number.parseInt(r.count);
          r.total_price = product_total_price;
          this.total_basket_price += product_total_price;
        })
      },
  },
  async mounted(){
      this.product_count_pairs = await client.getBasketProducts()
      this.currencyUnit =  "TL"
      this.updateBasketTablePrices();
  }
  
}
  
</script>
<style scoped>
.lower-menu {
  display: flex;
  width: 300px;
  height: 100px;
  margin: auto;
  margin-top: 20px;
}
.lower-clear {
  margin: auto;
  float:left;
  padding:10px;
  
}
.lower-return {
  margin: auto;
  padding:10px;
  
}
</style>