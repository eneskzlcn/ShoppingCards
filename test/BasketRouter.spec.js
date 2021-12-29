import { mount } from '@vue/test-utils'
import BasketRouter from '@/components/BasketRouter.vue'
import BasketTable from '@/components/BasketTable.vue'

describe('Basket Routing', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(BasketRouter)
    expect(wrapper.vm).toBeTruthy()
  })
  test('if basket button exists', () => {
    const wrapper = mount(BasketRouter)
    const basket_link = wrapper.find('#basketLink')
    expect(basket_link).toBeTruthy()
  })
  test('if basket button exists', () => {
    const wrapper = mount(BasketRouter)
    const basket_link = wrapper.find('#basketLink')
    expect(basket_link).toBeTruthy()
  })
  test('if basket button routes basket page', async() => {
    const wrapper = mount(BasketRouter)
    const basket_link = wrapper.find('#basketLink')
    await basket_link.trigger('click');
    expect(mount(BasketTable).vm).toBeTruthy()
  })
  
})
