import { mount } from '@vue/test-utils'
import basket from '@/pages/basket.vue'

var product_count_pairs = [
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
}]
const currencyUnit = "TL",basket_total_price = 2000
const fillProducts = () => {
  product_count_pairs = [
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
  }]}
const setLocalStorage  = (productCountPairs) =>{ window.localStorage.setItem('basketItems',JSON.stringify(productCountPairs))}
const clearLocalStorage = () => {window.localStorage.clear();}
const updateProductsWithLocalStorage = () => {product_count_pairs = JSON.parse(window.localStorage.getItem('basketItems') )}
describe('basket', () => {

  beforeEach(() => {
    fillProducts();
    clearLocalStorage();
    setLocalStorage(product_count_pairs);
  });
  test('is a Vue instance rendering correctly', () => {
    const wrapper = mount(basket)

    expect(wrapper.exists()).toBeTruthy();
    
  });

  test('is product_count_pairs taking successfully from local storage on mount', () => {
    const wrapper = mount(basket)
    expect(wrapper.vm.product_count_pairs.length).toEqual(1);
  });


  test('if the clear basket button runs clear func successfully', async() => {
    const wrapper = mount(basket)
    const clearFunc = jest.fn().mockImplementation(function() {
        product_count_pairs = null;
        clearLocalStorage();
    })
    wrapper.setMethods({
      clearBasket : clearFunc
    })
    const clearButton = await wrapper.find('#clearBasket')
    expect(clearButton.isVisible()).toBeTruthy();
    await clearButton.trigger('click');
    expect(JSON.parse(window.localStorage.getItem('basketItems'))).not.toBeTruthy();
  });



  
  

})
