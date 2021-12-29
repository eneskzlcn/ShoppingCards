import { mount } from '@vue/test-utils'
import BasketTable from '@/components/BasketTable.vue'
import BasketTableRow from '@/components/BasketTableRow.vue'


const product_count_pairs = [
{
  product : {   
    product_id:1,
    product_image_source:"",
    product_name:"",
    product_price:"1000",
    product_category:"",
    product_color:"",
   },
  count: 2,
  total_price:2000
}]
const currencyUnit = "TL",basket_total_price = 2000

describe('BasketTable', () => {
  test('is a Vue instance rendering correctly', async() => {
    const wrapper = mount(BasketTable, {
      propsData:{
        product_count_pairs : product_count_pairs,
        currencyUnit : currencyUnit,
        basket_total_price : basket_total_price,
      }
    })

    expect(wrapper.exists()).toBeTruthy();
    
  })
  ,
  test('is emits increase function', async() => {
    const wrapper = mount(BasketTable, {
      propsData:{
        product_count_pairs : product_count_pairs,
        currencyUnit : currencyUnit,
        basket_total_price : basket_total_price,
      }
    })
    // Wait until $emits have been handled
    wrapper.vm.$emit('increaseCountOfItem',0);

    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted().increaseCountOfItem).toBeTruthy()
  })
  ,
  test('is emits decrease function', async() => {
    const wrapper = mount(BasketTable, {
      propsData:{
        product_count_pairs : product_count_pairs,
        currencyUnit : currencyUnit,
        basket_total_price : basket_total_price,
      }
    })
    // Wait until $emits have been handled
    wrapper.vm.$emit('decreaseCountOfItem',0);

    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted().decreaseCountOfItem).toBeTruthy()
  })
,
  test('is emits remove function', async() => {
    const wrapper = mount(BasketTable, {
      propsData:{
        product_count_pairs : product_count_pairs,
        currencyUnit : currencyUnit,
        basket_total_price : basket_total_price,
      }
    })
    // Wait until $emits have been handled
    wrapper.vm.$emit('removeItem',0);

    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted().removeItem).toBeTruthy()
  })
  
})
