<template>
    <div class="container pl-10 pt-10">
      <p class="justify-content-center text-center mb-1" v-if="product_list">{{product_list.length}} items </p>
      <p class="justify-content-center text-center mb-1" v-else>0 items </p>

      <div class = "grid grid-cols-2 gap-auto w-full m-auto"> <!--  -->
          <ProductCard  v-for="item,index in product_list" v-bind:key="index" :product=item :host="host" :index="index" @addToBasket= "addToBasket($event)"  :currencyUnit="currencyUnit"/>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        product_list : [],
        currencyUnit :"",
        host : "",
        
    }
    ,
    methods: {
        addToBasket(index)
        {
            this.$emit('addToBasket',index);
        }
    }
}
</script>