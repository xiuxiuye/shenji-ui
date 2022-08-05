import { mount } from '@vue/test-utils'
import Checkbox from 'src/components/Checkbox/index.vue'

describe('Checkbox组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('size属性', () => {
      it('size="small"', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-checkbox-size-small')
      })
      it('size="normal"', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-checkbox-size-normal')
      })
      it('size="large"', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-checkbox-size-large')
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            disabled: true
          }
        })
        expect(wrapper.classes()).toContain('sj-checkbox-disabled')
      })
    })

    describe('autofocus属性', () => {
      it('autofocus=true', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            autofocus: true
          }
        })
        expect(wrapper.find('.sj-checkbox > .sj-checkbox-input').attributes('autofocus')).toBe('')
      })
    })

    describe('model-value属性', () => {
      it('model-value=true', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            modelValue: true
          }
        })
        expect(wrapper.find('.sj-checkbox-box-checked').exists()).toBe(true)
      })
      it('model-value=true', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            modelValue: false
          }
        })
        expect(wrapper.find('.sj-checkbox-box-checked').exists()).toBe(false)
      })
    })

    describe('indeterminate属性', () => {
      it('indeterminate=true', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            modelValue: true,
            indeterminate: true
          }
        })
        expect(wrapper.find('.sj-checkbox-box-checked-partial').exists()).toBe(true)
      })
      it('indeterminate=true', () => {
        const wrapper = mount(Checkbox, {
          propsData: {
            modelValue: true,
            indeterminate: false
          }
        })
        expect(wrapper.find('.sj-checkbox-box-checked-all').exists()).toBe(true)
      })
    })
  })

  describe('Slots测试', () => {
    it('default', () => {
      const wrapper = mount(Checkbox, {
        slots: {
          default: '123'
        }
      })
      expect(wrapper.find('.sj-checkbox-label').text()).toBe('123')
    })
  })
})
