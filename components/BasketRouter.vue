<template>
    <div class="basket">
        <a href="http://localhost:3000/basket" class="text-center" id = "basketLink">
          <img src="@/static/basketicon.png" class="w-10 h-10">
          <span class="count text-xs rounded-full border-1 border-black bg-yellow-400" v-if= "basket_items_count > 0" id="basketCountSPN">{{basket_items_count}}</span>
        </a>
      </div>

</template>
<script>
export default {
    props: {
        basket_items_count : 0
    }
}
</script>
<style scoped>
a {
  float:right;
  
}
.basket {
  position: relative;
  margin-top: 5px;
  margin-right: 10px;
}
.count{
  position: absolute;
  display: flex;
  width : 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
  right: 1px;
  top:37px;
}
</style>