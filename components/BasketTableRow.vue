<template>
    <tr v-if="product_count_pair" class="text-center align-middle">
        <td><img :src="host +'/' +product_count_pair.product.product_image_source" ></td> <!-- little icon of product -->
        <td v-if="product_count_pair.product.product_name">{{product_count_pair.product.product_name}}</td> <!--  product name    -->
        <td v-if="product_count_pair.product.product_color">{{product_count_pair.product.product_color}}</td><!--   product color    -->
        <td v-if="product_count_pair.product.product_category">{{product_count_pair.product.product_category}}</td><!--   product category    -->
        <td >{{product_count_pair.product.product_price}} </td><!--   product price    -->
        <td class="count"> {{product_count_pair.count}}</td><!--   product count    -->
        <td> {{ product_count_pair.total_price }} {{currencyUnit}}</td> 
        <td class="td-buttons">
            <button class = "bg-green-100 hover:bg-green-500 rounded shadow mr-2" :id="'Inc'+index"  type = "button" @click="increaseCountOfItem">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
                </svg>
            </button> 
            <button class = "bg-red-300 hover:bg-red-500  rounded shadow mr-2" :id="'Dec'+index"  type="button" @click="decreaseCountOfItem"> 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
                </svg>
            </button> 
            <button class = "bg-gray-300 hover:bg-gray-500 rounded shadow  mr-2" type = "button" :id="'Rem'+index" @click="removeItem">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>
        </td>
        
        
    </tr>
    <tr v-else class="">
        <td>Total Price:</td>
        <td>{{total_price}} {{currencyUnit}}</td>
    </tr>
</template>
<script>

export default {
    props: {
        product_count_pair : null,
        currencyUnit : "",
        total_price : "",
        index : 0,
        host : ""
    },
    methods: {
        increaseCountOfItem()
        {
            this.$emit('increaseCountOfItem',this.index)
        },
        decreaseCountOfItem(){
            let count = this.product_count_pair.count 
            if(count <= 1)
            {
                this.removeItem();
                return;
            }
            this.$emit('decreaseCountOfItem',this.index);
        },
        removeItem()
        {
            this.$emit('removeItem',this.product_count_pair.product.product_id);
        }

    },
}   
</script>

<style scoped>
tr td{
    width:5%;
}
td img{
    width:30%;
}

</style>