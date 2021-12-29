import { mount } from '@vue/test-utils'
import BasketTableRow from '@/components/BasketTableRow.vue'

const product_count_pair = {
  product : {   
    product_id:1,
    product_image_source:"",
    product_name:"",
    product_price:"1000",
    product_category:"",
    product_color:"",
   },
  count: 2,
  total_price:2000,
}
const currencyUnit = "TL",total_price = 2000,index = 0

describe('BasketTable', () => {
  test('is a Vue instance rendering correctly', async() => {
    const wrapper = mount(BasketTableRow, {
      propsData:{
        product_count_pair : product_count_pair,
        currencyUnit : currencyUnit,
        total_price : total_price,
        index: index
 
      }
    })
    expect(wrapper.exists()).toBeTruthy()
    const incButton = await wrapper.find('#Inc0'); // Inc  + index 
    expect(incButton.isVisible()).toBe(true)
    const decButton = await wrapper.find('#Dec0'); // Dec + index
    expect(decButton.isVisible()).toBe(true)
    const remButton = await wrapper.find('#Rem0'); // Dec + index
    expect(remButton.isVisible()).toBe(true)
  })
  ,
  test('is increase function works on click', async() => {
    const wrapper = mount(BasketTableRow, {
      propsData:{
        product_count_pair : product_count_pair,
        currencyUnit : currencyUnit,
        total_price : total_price,
        index: index
 
      }
    })
    const incFunc = jest.fn();
    wrapper.setMethods({
      increaseCountOfItem: incFunc
    })
    const incButton = await wrapper.find('#Inc0');
    await incButton.trigger('click');
    expect(incFunc).toHaveBeenCalled();
  }),

  test('is decrease function works on click', async() => {
    const wrapper = mount(BasketTableRow, {
      propsData:{
        product_count_pair : product_count_pair,
        currencyUnit : currencyUnit,
        total_price : total_price,
        index: index
 
      }
    })
    const decFunc = jest.fn();
    wrapper.setMethods({
      decreaseCountOfItem: decFunc
    })
    const decButton = await wrapper.find('#Dec0');
    await decButton.trigger('click');
    expect(decFunc).toHaveBeenCalled();

  }),

  test('is remove function works on click', async() => {
    const wrapper = mount(BasketTableRow, {
      propsData:{
        product_count_pair : product_count_pair,
        currencyUnit : currencyUnit,
        total_price : total_price,
        index: index
 
      }
    })
    const remFunc = jest.fn();
    wrapper.setMethods({
      removeItem: remFunc
    })
    const remButton = await wrapper.find('#Rem0');
    await remButton.trigger('click');
    expect(remFunc).toHaveBeenCalled();
  })
  
})
