import { mount } from '@vue/test-utils'
import ProductList from '@/components/ProductList.vue'
import ProductCard from '@/components/ProductCard.vue'
import BasketRouter from '@/components/BasketRouter.vue'

describe('ProductList', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ProductList)
    expect(wrapper.vm).toBeTruthy()
  })
  test('if basket button exists', () => {
    
  })
  test('if there is a Product Card (any product) ', async() => {
    const wrapper = mount(ProductList)
    const productCard =  mount(ProductCard)
    expect(productCard.vm).toBeTruthy()
  })
  
  test('if product adding to the basket working', async() => {
      const card_fn = jest.fn();
      const list_fn = jest.fn();
      const wrapper =  mount(ProductList,
        {
            propsData :
                {
                    product_list : [
                      {
                        product_image_source: "asusImage",
                        product_name : "ASUS MG- Laptop",
                        product_price : "10500",
                        product_category: "Technology",
                        product_color: "Gray",
                      },
                      {
                        product_image_source: "iphoneImage",
                        product_name : "iPhone 11",
                        product_price : "10500",
                        product_category: "Technology",
                        product_color: "Turquoise",
                      },
                      {
                        product_image_source: "smartbagImage",
                        product_name : "Smart Bag",
                        product_price : "500",
                        product_category: "Accessory",
                        product_color: "Beige",
                      },
                      {
                        product_image_source: "sonyImage",
                        product_name : "Sony LCD-TV",
                        product_price : "15000",
                        product_category: "Technology",
                        product_color: "Black",
                      },
                      {
                        product_image_source: "tshirtImage",
                        product_name : "T-Shirt",
                        product_price : "50",
                        product_category: "Clothes",
                        product_color: "Black",
                      }
              
                    ], 
                    currencyUnit : "TL",              
                  },
                  methods: {
                    addToBasket : list_fn
                    
                  }
            
        })
    const productCard = mount(ProductCard,
    { propsData: {
            product: {
                product_image_source: "tshirtImage",
                        product_name : "T-Shirt",
                        product_price : "50",
                        product_category: "Clothes",
                        product_color: "Black",
            },
            currencyUnit : "TL"
        },
        methods: {
            addToBasket:card_fn
     
        }
    })
    const cardContainer = await productCard.find('#cardContainer')
    await cardContainer.trigger('click');
    const basket = mount(BasketRouter);
    const basket_count = await basket.find('#basketCountSPN')
    expect(card_fn).toHaveBeenCalled();
    expect(basket_count.isVisible).toBeTruthy();
  })
  
})
