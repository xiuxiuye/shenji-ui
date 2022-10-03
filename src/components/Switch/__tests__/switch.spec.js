import { mount } from '@vue/test-utils'
import Switch from 'src/components/Switch/index.vue'

describe('Switch组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Switch)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(Switch, {
          propsData: {
            disabled: true
          },
        })
        expect(wrapper.classes()).toContain('sj-switch-disabled')
      })
    })

    describe('icon属性', () => {
      const wrapper = mount(Switch, {
        propsData: {
          icon: 'lock'
        },
      })
      expect(wrapper.find('i').exists()).toBe(true)
      expect(wrapper.find('i').classes()).toContain('lock')
    })

    describe('loading属性', () => {
      it('loading=true', () => {
        const wrapper = mount(Switch, {
          propsData: {
            loading: true
          }
        })
        expect(wrapper.find('.loading-a').exists()).toBe(true)
      })
    })

    describe('size属性', () => {
      it('size="normal"', () => {
        const wrapper = mount(Switch, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-switch-size-normal')
      })

      it('size="small"', () => {
        const wrapper = mount(Switch, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-switch-size-small')
      })

      it('size="large"', () => {
        const wrapper = mount(Switch, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-switch-size-large')
      })
    })

    describe('autofocus属性', () => {
      it('autofocus=true', () => {
        const wrapper = mount(Switch, {
          propsData: {
            autofocus: true
          }
        })
        expect(wrapper.find('.sj-switch').attributes('autofocus')).toBe('true')
      })
    })
    describe('model-value属性', () => {
      it('modelValue=true', () => {
        const wrapper = mount(Switch, {
          propsData: {
            modelValue: true
          }
        })
        expect(wrapper.classes()).toContain('sj-switch-checked')
      })
    })
    describe('round属性', () => {
      it('round=true', () => {
        const wrapper = mount(Switch, {
          propsData: {
            round: false
          }
        })
        expect(wrapper.classes()).toContain('sj-switch-square')
      })
    })
    describe('checkedValue & uncheckedValue属性', () => {
      it('checkedValue="on" & uncheckedValue="off" & modelValue="on"', () => {
        const wrapper = mount(Switch, {
          propsData: {
            modelValue: 'on',
            checkedValue: 'on',
            uncheckedValue: 'off'
          }
        })
        expect(wrapper.classes()).toContain('sj-switch-checked')
      })
      it('checkedValue="on" & uncheckedValue="off" & modelValue=true', () => {
        const wrapper = mount(Switch, {
          propsData: {
            modelValue: true,
            checkedValue: 'on',
            uncheckedValue: 'off'
          }
        })
        expect(wrapper.classes().includes('sj-switch-checked')).toBe(false)
      })
    })
    describe('checkedText & uncheckedText属性', () => {
      it('checkedText="on" & uncheckedText属性="off" & modelValue=true', () => {
        const wrapper = mount(Switch, {
          propsData: {
            checkedText: 'on',
            uncheckedText: 'off'
          }
        })
        expect(wrapper.find('.sj-switch-checked-text').text()).toBe('on')
        expect(wrapper.find('.sj-switch-unchecked-text').text()).toBe('off')
      })
    })
  })

  describe('Event测试', () => {
    it('change', () => {
      const wrapper = mount(Switch)
      wrapper.vm.$emit('change')
      expect(wrapper.emitted().change).toBeTruthy()
    })
  })

  describe('Slots测试', () => {
    it('checked', () => {
      const wrapper = mount(Switch, {
        slots: {
          checked: '123',
          unchecked: '456'
        }
      })
      expect(wrapper.find('.sj-switch-checked-text').text()).toBe('123')
      expect(wrapper.find('.sj-switch-unchecked-text').text()).toBe('456')
    })

    it('icon', () => {
      const wrapper = mount(Switch, {
        slots: {
          icon: <span id="myIcon" style="color: red;">8</span>
        }
      })
      expect(wrapper.find('#myIcon').text()).toBe('8')
    })
  })
})
