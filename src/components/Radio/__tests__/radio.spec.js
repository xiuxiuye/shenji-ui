import { mount } from '@vue/test-utils'
import Radio from 'src/components/Radio/index.vue'

describe('Radio组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Radio)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('size属性', () => {
      it('size="small"', () => {
        const wrapper = mount(Radio, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-radio-size-small')
      })
      it('size="normal"', () => {
        const wrapper = mount(Radio, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-radio-size-normal')
      })
      it('size="large"', () => {
        const wrapper = mount(Radio, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-radio-size-large')
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(Radio, {
          propsData: {
            disabled: true
          }
        })
        expect(wrapper.classes()).toContain('sj-radio-disabled')
      })
    })

    describe('autofocus属性', () => {
      it('autofocus=true', () => {
        const wrapper = mount(Radio, {
          propsData: {
            autofocus: true
          }
        })
        expect(wrapper.find('.sj-radio > .sj-radio-input').attributes('autofocus')).toBe('')
      })
    })

    describe('model-value属性', () => {
      it('model-value=true', () => {
        const wrapper = mount(Radio, {
          propsData: {
            modelValue: true
          }
        })
        expect(wrapper.find('.sj-radio-box-checked').exists()).toBe(true)
      })
      it('model-value=false', () => {
        const wrapper = mount(Radio, {
          propsData: {
            modelValue: false
          }
        })
        expect(wrapper.find('.sj-radio-box-checked').exists()).toBe(false)
      })
    })

    describe('value属性', () => {
      it('value="Max"', () => {
        const wrapper = mount(Radio, {
          propsData: {
            value: 'Max'
          }
        })
        expect(wrapper.find('.sj-radio > .sj-radio-input').attributes('value')).toBe('Max')
      })
    })

    describe('name属性', () => {
      it('name="sex"', () => {
        const wrapper = mount(Radio, {
          propsData: {
            name: 'sex'
          }
        })
        expect(wrapper.find('.sj-radio > .sj-radio-input').attributes('name')).toBe('sex')
      })
    })
  })

  describe('Slots测试', () => {
    it('default', () => {
      const wrapper = mount(Radio, {
        slots: {
          default: '123'
        }
      })
      expect(wrapper.find('.sj-radio-label').text()).toBe('123')
    })
  })
})
