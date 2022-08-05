import { mount } from '@vue/test-utils'
import Checkbox from 'src/components/Checkbox/index.vue'
import CheckboxGroup from 'src/components/CheckboxGroup/index.vue'

describe('Checkbox组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(CheckboxGroup)
    expect(wrapper.exists()).toBe(true)
  })

  it('checkbox组件需要设置value', () => {
    const err = console.error
    let actualErrorMsg
    console.error = (error) => {
      actualErrorMsg = error.toString()
      err.call(null, error)
    }
    mount(CheckboxGroup, {
      slots: {
        default: <Checkbox>Checkbox1</Checkbox>
      }
    })
    const expectErrorMsg = 'Error: value is required of checkbox in checkboxGroup'
    expect(actualErrorMsg).toBe(expectErrorMsg)
  })

  describe('Props测试', () => {
    describe('size属性', () => {
      it('size="small"', () => {
        const wrapper = mount(CheckboxGroup, {
          propsData: {
            size: 'small',
          },
          slots: {
            default: <Checkbox value="1">Checkbox1</Checkbox>
          }
        })
        expect(wrapper.find('.sj-checkbox-group > .sj-checkbox').classes()).toContain('sj-checkbox-size-small')
      })
      it('size="normal"', () => {
        const wrapper = mount(CheckboxGroup, {
          propsData: {
            size: 'normal',
          },
          slots: {
            default: <Checkbox value="1">Checkbox1</Checkbox>
          }
        })
        expect(wrapper.find('.sj-checkbox-group > .sj-checkbox').classes()).toContain('sj-checkbox-size-normal')
      })
      it('size="large"', () => {
        const wrapper = mount(CheckboxGroup, {
          propsData: {
            size: 'large',
          },
          slots: {
            default: <Checkbox value="1">Checkbox1</Checkbox>
          }
        })
        expect(wrapper.find('.sj-checkbox-group > .sj-checkbox').classes()).toContain('sj-checkbox-size-large')
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(CheckboxGroup, {
          propsData: {
            disabled: true
          },
          slots: {
            default: <Checkbox value="1">Checkbox1</Checkbox>
          }
        })
        expect(wrapper.find('.sj-checkbox-group > .sj-checkbox').classes()).toContain('sj-checkbox-disabled')
      })
    })

    describe('vertical属性', () => {
      it('vertical=true', () => {
        const wrapper = mount(CheckboxGroup, {
          propsData: {
            vertical: true
          },
          slots: {
            default: <Checkbox value="1">Checkbox1</Checkbox>
          }
        })
        expect(wrapper.classes()).toContain('sj-checkbox-group-vertical')
      })
      it('vertical=false', () => {
        const wrapper = mount(CheckboxGroup, {
          propsData: {
            vertical: false
          },
          slots: {
            default: <Checkbox value="1">Checkbox1</Checkbox>
          }
        })
        expect(wrapper.classes()).toContain('sj-checkbox-group-horizontal')
      })
    })
  })
})
