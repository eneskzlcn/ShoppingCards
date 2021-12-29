<template>
  <div class="rounded shadow-lg mr-4 border-2 mt-4" id= "cardContainer" @click="addToBasket" style="position:relative" >
      <img class="w-auto m-auto" :src="host+ '/'+product.product_image_source" alt="Product" v-if="product">

      <div class="px-6 py-4" v-if="product">
        <div >
          <div class="font-bold text-xl text-center mb-2" v-if="product" > {{product.product_name}} - {{product.product_color}}</div>
          <p class="text-gray-700 font-bold text-base text-center" >
              {{product.product_category}}
          </p>
        </div>
        <div class="mt-2" >
          <div class="font-bold text-xl mb-2 text-center text-red-500"></div>
          <p class="text-red-500 text-sm text-base mt-5 text-center" >
              {{product.product_price}} {{currencyUnit}} 
          </p>
        </div>
      </div>
  </div>
</template>
<script>
export default {
   props:
   {
     host : "",
     product : {},
     index :""  ,
     currencyUnit:"" 
   },
   methods:
   {
     addToBasket()
     {
       
       this.$emit('addToBasket',this.index);
     }
   }
}
</script>
<style>
p{
  overflow-wrap: break-word;
}
</style>
