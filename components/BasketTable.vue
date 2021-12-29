<template>
    <div class="" >
        <table class="mt-48 ml-14 border-2" v-if="products_count_pairs && products_count_pairs.length != 0">
            <caption> Basket </caption>
            <thead>
                <tr>
                    <th></th> <!-- for image -->
                    <th>Name</th>
                    <th>Color</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Total</th>
                    <th></th><!-- increase | decrease | remove  functions -->
                </tr>
            </thead>
            <tbody v-if="products_count_pairs">
                <BasketTableRow v-for="item,index in products_count_pairs" :host="host" :key="index" :index="index" :product_count_pair="item"
                :currencyUnit="currencyUnit" @increaseCountOfItem="increaseCountOfItem($event)" 
                    @decreaseCountOfItem="decreaseCountOfItem($event)" @removeItem="removeItem($event)"/>
            </tbody>
        </table>
        <div class="d-flex mt-9 text-center rounded border-2" v-if="products_count_pairs && products_count_pairs.length != 0">
            <BasketTableRow  :currencyUnit="currencyUnit" :total_price="basket_total_price" />
        </div>
    </div>
</template>
<script>

export default {
    props: {
        products_count_pairs:null,
        currencyUnit : "",
        basket_total_price: 0,
        host : "",
    },
    methods: {
        increaseCountOfItem(index)
        {
            this.$emit('increaseCountOfItem',index);
        
        },
        removeItem(product_id)
        {
            this.$emit('removeItem',product_id);
        },
        decreaseCountOfItem(index){
            this.$emit('decreaseCountOfItem',index);
        }
    },
}   

</script>

<style scoped>
table{
    display: table;
    justify-content: center;
    align-items: center
}
</style>