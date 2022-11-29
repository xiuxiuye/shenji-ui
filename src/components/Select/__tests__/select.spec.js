import { mount } from '@vue/test-utils'
import Select from 'src/components/Select'

const options = [
  { label: 'label1', value: 'label1', label1: 'label11', value1: 'label11' },
  { label: 'label2', value: 'label2', label1: 'label21', value1: 'label21' },
  { label: 'label3', value: 'label3', label1: 'label31', value1: 'label31' },
  { label: 'label4', value: 'label4', label1: 'label41', value1: 'label41' },
  { label: 'label5', value: 'label5', label1: 'label51', value1: 'label51' }
]

describe('Select组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Select)
    expect(wrapper.exists()).toBe(true)
  })

  it('基本使用', () => {
    const wrapper = mount(Select, {
      props: {
        options: []
      }
    })
    expect(wrapper.find('.sj-select').exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('size属性', () => {
      it('size="normal"', () => {
        const wrapper = mount(Select)
        expect(wrapper.classes()).toContain('sj-select-size-normal')
      })
      it('size="small"', () => {
        const wrapper = mount(Select, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-select-size-small')
      })
      it('size="large"', () => {
        const wrapper = mount(Select, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-select-size-large')
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(Select, {
          propsData: {
            disabled: true
          }
        })
        expect(wrapper.classes()).toContain('sj-select-disabled')
        expect(wrapper.find('.sj-select-disabled-mask').exists()).toBe(true)
      })
    })

    describe('autofocus属性', () => {
      it('autofocus=true', () => {
        const wrapper = mount(Select, {
          propsData: {
            autofocus: true
          }
        })
        expect(wrapper.find('.sj-select-selector').attributes('autofocus')).toBe('true')
      })
    })

    describe('model-value属性', () => {
      it('model-value="label1"', () => {
        const wrapper = mount(Select, {
          propsData: {
            options,
            modelValue: "label1"
          }
        })
        expect(wrapper.find('.sj-select-selector .sj-select-content-item > span').text()).toBe('label1')
      })
    })

    describe('clearable属性', () => {
      it('clearable=true', () => {
        const wrapper = mount(Select, {
          propsData: {
            clearable: true,
            options,
            modelValue: "label1"
          }
        })
        expect(wrapper.find('.sj-select > .sj-select-selector > .sj-select-clear').exists()).toBe(true)
      })

      it('clearable=true', () => {
        const wrapper = mount(Select, {
          propsData: {
            clearable: true,
            options,
            modelValue: ""
          }
        })
        expect(wrapper.find('.sj-select > .sj-select-selector > .sj-select-clear').exists()).toBe(false)
      })
    })

    describe('clear-icon属性', () => {
      it('clear-icon="user"', () => {
        const wrapper = mount(Select, {
          propsData: {
            clearable: true,
            options,
            modelValue: "label1",
            clearIcon: 'user'
          }
        })
        expect(wrapper.find('.sj-select > .sj-select-selector > .sj-select-clear > .user').exists()).toBe(true)
      })
    })

    describe('loading属性', () => {
      it('loading=true', () => {
        const wrapper = mount(Select, {
          propsData: {
            options,
            modelValue: "label1",
            loading: true
          }
        })
        expect(wrapper.find('.sj-select > .sj-select-selector > .sj-select-loading-icon').exists()).toBe(true)
      })
    })

    describe('loading-icon属性', () => {
      it('loading-icon="user"', () => {
        const wrapper = mount(Select, {
          propsData: {
            options,
            modelValue: "label1",
            loading: true,
            loadingIcon: 'user'
          }
        })
        expect(wrapper.find('.sj-select > .sj-select-selector > .sj-select-loading-icon > .user').exists()).toBe(true)
      })
    })

    describe('loading-icon-visible属性', () => {
      it('loading-icon-visible=true', () => {
        const wrapper = mount(Select, {
          propsData: {
            options,
            modelValue: "label1",
            loading: true,
            loadingIconVisible: false
          }
        })
        expect(wrapper.find('.sj-select > .sj-select-selector > .sj-select-loading-icon').exists()).toBe(false)
      })
    })

    describe('round属性', () => {
      it('round=true', () => {
        const wrapper = mount(Select, {
          propsData: {
            round: true,
            size: 'small',
            options
          }
        })
        expect(wrapper.classes()).toContain('sj-select-small-round')
      })
    })

    describe('filterable属性', () => {
      it('filterable=true', () => {
        const wrapper = mount(Select, {
          propsData: {
            filterable: true,
            options
          }
        })
        expect(wrapper.find('.sj-select > .sj-select-selector > .sj-select-content > .sj-select-filter').exists()).toBe(true)
      })
    })

    describe('label-field属性', () => {
      it('label-field="label1"', () => {
        const wrapper = mount(Select, {
          propsData: {
            options,
            modelValue: "label1",
            labelField: "label1"
          }
        })
        expect(wrapper.find('.sj-select-selector .sj-select-content-item > span').text()).toBe('label11')
      })
    })

    describe('placeholder属性', () => {
      it('placeholder="123"', () => {
        const wrapper = mount(Select, {
          propsData: {
            options,
            placeholder: "123"
          }
        })
        expect(wrapper.find('.sj-select-selector .sj-select-placeholder').text()).toBe('123')
      })
    })

    describe('status属性', () => {
      it('status="success"', () => {
        const wrapper = mount(Select, {
          propsData: {
            status: 'success'
          }
        })
        expect(wrapper.classes()).toContain('sj-select-status-success')
      })
      it('status="error"', () => {
        const wrapper = mount(Select, {
          propsData: {
            status: 'error'
          }
        })
        expect(wrapper.classes()).toContain('sj-select-status-error')
      })
      it('status="warning"', () => {
        const wrapper = mount(Select, {
          propsData: {
            status: 'warning'
          }
        })
        expect(wrapper.classes()).toContain('sj-select-status-warning')
      })
    })

    describe('arrow属性', () => {
      it('arrow="user"', () => {
        const wrapper = mount(Select, {
          propsData: {
            arrow: 'user'
          }
        })
        expect(wrapper.find('.sj-select-selector > .sj-select-arrow > .user').exists()).toBe(true)
      })
    })

    describe('border-type属性', () => {
      it('border-type="none"', () => {
        const wrapper = mount(Select, {
          propsData: {
            borderType: 'none'
          }
        })
        expect(wrapper.classes()).toContain('sj-select-border-none')
      })
      it('border-type="block"', () => {
        const wrapper = mount(Select, {
          propsData: {
            borderType: 'block'
          }
        })
        expect(wrapper.classes()).toContain('sj-select-border-block')
      })
      it('border-type="line"', () => {
        const wrapper = mount(Select, {
          propsData: {
            borderType: 'line'
          }
        })
        expect(wrapper.classes()).toContain('sj-select-border-line')
      })
    })
  })

  describe('Event测试', () => {
    it('clear', () => {
      const wrapper = mount(Select)
      wrapper.vm.$emit('clear')
      expect(wrapper.emitted().clear).toBeTruthy()
    })
    it('focus', () => {
      const wrapper = mount(Select)
      wrapper.vm.$emit('focus')
      expect(wrapper.emitted().focus).toBeTruthy()
    })
    it('blur', () => {
      const wrapper = mount(Select)
      wrapper.vm.$emit('blur')
      expect(wrapper.emitted().blur).toBeTruthy()
    })
    it('change', () => {
      const wrapper = mount(Select)
      wrapper.vm.$emit('change', '123')
      expect(wrapper.emitted().change[0]).toEqual(['123'])
    })
  })
})
