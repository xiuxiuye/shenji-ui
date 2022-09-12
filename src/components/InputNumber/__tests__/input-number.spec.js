import { mount } from '@vue/test-utils'
import InputNumber from 'src/components/InputNumber/index.vue'
import Icon from 'src/components/Icon/index.vue'

describe('InputNumber组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(InputNumber)
    expect(wrapper.exists()).toBe(true)
  })

  it('基本使用', () => {
    const wrapper = mount(InputNumber)
    expect(wrapper.find('.sj-input-number > input').exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('clearable属性', () => {
      it('clearable=true', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            clearable: true,
            modelValue: 2
          }
        })
        expect(wrapper.find('.sj-input-number > .sj-input-number-clear').exists()).toBe(true)
      })
      it('clearable=false', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            clearable: false,
            modelValue: 2
          }
        })
        expect(wrapper.find('.sj-input-number > .sj-input-number-clear').exists()).toBe(false)
      })
    })

    describe('size属性', () => {
      it('size="normal"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-input-number-container-size-normal')
      })
      it('size="small"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-input-number-container-size-small')
      })
      it('size="large"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-input-number-container-size-large')
      })
    })

    describe('prefix属性', () => {
      it('prefix="search"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            prefix: 'search'
          }
        })
        expect(wrapper.find('.sj-input-number > .sj-input-number-prefix').exists()).toBe(true)
        expect(wrapper.find('.sj-input-number-prefix > i').classes()).toContain('search')
      })
    })

    describe('suffix属性', () => {
      it('suffix="search"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            suffix: 'search'
          }
        })
        expect(wrapper.find('.sj-input-number > .sj-input-number-suffix').exists()).toBe(true)
        expect(wrapper.find('.sj-input-number-suffix > i').classes()).toContain('search')
      })
    })

    describe('model-value属性', () => {
      it('model-value="2"', () => {
        const err = console.error
        let actualErrorMsg
        console.error = (error) => {
          actualErrorMsg = error.toString()
          err.call(null, error)
        }
        mount(InputNumber, {
          propsData: {
            modelValue: '2'
          }
        })
        const expectErrorMsg = 'Error: 神机：InputNumber的modelValue(v-model)类型错误，需number类型的数据。'
        expect(actualErrorMsg).toBe(expectErrorMsg)
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            disabled: true
          }
        })
        expect(wrapper.classes()).toContain('sj-input-number-container-disabled')
      })
    })

    describe('status属性', () => {
      it('status="success"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            status: 'success'
          }
        })
        expect(wrapper.find('.sj-input-number-status-success').exists()).toBe(true)
      })
      it('status="error"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            status: 'error'
          }
        })
        expect(wrapper.find('.sj-input-number-status-error').exists()).toBe(true)
      })
      it('status="warning"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            status: 'warning'
          }
        })
        expect(wrapper.find('.sj-input-number-status-warning').exists()).toBe(true)
      })
    })

    describe('autofocus属性', () => {
      it('autofocus=true', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            autofocus: true
          }
        })
        expect(wrapper.find('.sj-input-number > input').attributes('autofocus')).toBe('')
      })
    })

    describe('border属性', () => {
      it('border="none"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            borderType: 'none'
          }
        })
        expect(wrapper.find('.sj-input-number-border-none').exists()).toBe(true)
      })
      it('border="block"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            borderType: 'block'
          }
        })
        expect(wrapper.find('.sj-input-number-border-block').exists()).toBe(true)
      })
      it('border="line"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            borderType: 'line'
          }
        })
        expect(wrapper.find('.sj-input-number-border-line').exists()).toBe(true)
      })
    })

    describe('controls属性', () => {
      it('controls=false', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            controls: false
          }
        })
        expect(wrapper.find('.sj-input-number > .sj-input-number-controls').exists()).toBe(false)
      })
    })

    describe('add-icon属性', () => {
      it('add-icon="search"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            addIcon: 'search'
          }
        })
        expect(wrapper.find('.sj-input-number-controls-add > i').classes()).toContain('search')
      })
    })

    describe('suffix属性', () => {
      it('minus-icon="search"', () => {
        const wrapper = mount(InputNumber, {
          propsData: {
            minusIcon: 'search'
          }
        })
        expect(wrapper.find('.sj-input-number-controls-minus > i').classes()).toContain('search')
      })
    })
  })

  describe('Event测试', () => {
    it('clear', () => {
      const wrapper = mount(InputNumber)
      wrapper.vm.$emit('clear')
      expect(wrapper.emitted().clear).toBeTruthy()
    })
    it('focus', () => {
      const wrapper = mount(InputNumber)
      wrapper.vm.$emit('focus')
      expect(wrapper.emitted().focus).toBeTruthy()
    })
    it('blur', () => {
      const wrapper = mount(InputNumber)
      wrapper.vm.$emit('blur')
      expect(wrapper.emitted().blur).toBeTruthy()
    })
    it('change', () => {
      const wrapper = mount(InputNumber)
      wrapper.vm.$emit('change', 10, {})
      expect(wrapper.emitted().change[0]).toEqual([10, {}])
    })
  })

  describe('Slots测试', () => {
    it('prefix', () => {
      const wrapper = mount(InputNumber, {
        slots: {
          prefix: <Icon type="user" />
        }
      })
      expect(wrapper.find('.sj-input-number-prefix > .sj-icon').classes()).toContain('user')
    })
    it('suffix', () => {
      const wrapper = mount(InputNumber, {
        slots: {
          suffix: <Icon type="user" />
        }
      })
      expect(wrapper.find('.sj-input-number-suffix > .sj-icon').classes()).toContain('user')
    })
    it('add-icon', () => {
      const wrapper = mount(InputNumber, {
        slots: {
          "add-icon": <Icon type="user" />
        }
      })
      expect(wrapper.find('.sj-input-number-controls-add > .sj-icon').classes()).toContain('user')
    })
    it('minus-icon', () => {
      const wrapper = mount(InputNumber, {
        slots: {
          "minus-icon": <Icon type="user" />
        }
      })
      expect(wrapper.find('.sj-input-number-controls-minus > .sj-icon').classes()).toContain('user')
    })
  })
})
