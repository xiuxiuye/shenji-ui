import { mount } from '@vue/test-utils'
import Radio from 'src/components/Radio/index.vue'
import RadioGroup from 'src/components/RadioGroup/index.vue'

describe('RadioGroup组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(RadioGroup)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('size属性', () => {
      it('size="small"', () => {
        const wrapper = mount(RadioGroup, {
          propsData: {
            size: 'small',
          },
          slots: {
            default: <Radio>Radio</Radio>
          }
        })
        expect(wrapper.find('.sj-radio-group > .sj-radio').classes()).toContain('sj-radio-size-small')
      })
      it('size="normal"', () => {
        const wrapper = mount(RadioGroup, {
          propsData: {
            size: 'normal',
          },
          slots: {
            default: <Radio>Radio</Radio>
          }
        })
        expect(wrapper.find('.sj-radio-group > .sj-radio').classes()).toContain('sj-radio-size-normal')
      })
      it('size="large"', () => {
        const wrapper = mount(RadioGroup, {
          propsData: {
            size: 'large',
          },
          slots: {
            default: <Radio>Radio</Radio>
          }
        })
        expect(wrapper.find('.sj-radio-group > .sj-radio').classes()).toContain('sj-radio-size-large')
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(RadioGroup, {
          propsData: {
            disabled: true
          },
          slots: {
            default: <Radio>Radio</Radio>
          }
        })
        expect(wrapper.find('.sj-radio-group > .sj-radio').classes()).toContain('sj-radio-disabled')
      })
    })

    describe('vertical属性', () => {
      it('vertical=true', () => {
        const wrapper = mount(RadioGroup, {
          propsData: {
            vertical: true
          },
          slots: {
            default: <Radio>Radio</Radio>
          }
        })
        expect(wrapper.classes()).toContain('sj-radio-group-vertical')
      })
      it('vertical=false', () => {
        const wrapper = mount(RadioGroup, {
          propsData: {
            vertical: false
          },
          slots: {
            default: <Radio>Radio</Radio>
          }
        })
        expect(wrapper.classes()).toContain('sj-radio-group-horizontal')
      })
    })
  })
})
