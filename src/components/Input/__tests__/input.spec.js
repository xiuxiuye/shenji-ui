import { mount } from '@vue/test-utils'
import Input from 'src/components/Input/index.vue'
import Icon from 'src/components/Icon/index.vue'
import Button from 'src/components/Button/index.vue'

describe('Input组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Input)
    expect(wrapper.exists()).toBe(true)
  })

  it('基本使用', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('.sj-input > input').attributes('type')).toBe('text')
  })

  describe('Props测试', () => {
    describe('clearable属性', () => {
      it('clearable=true', () => {
        const wrapper = mount(Input, {
          propsData: {
            clearable: true,
            modelValue: '123'
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-clear').exists()).toBe(true)
      })
      it('clearable=false', () => {
        const wrapper = mount(Input, {
          propsData: {
            clearable: false,
            modelValue: '123'
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-clear').exists()).toBe(false)
      })
    })

    describe('size属性', () => {
      it('size="normal"', () => {
        const wrapper = mount(Input, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-input-container-size-normal')
      })
      it('size="small"', () => {
        const wrapper = mount(Input, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-input-container-size-small')
      })
      it('size="large"', () => {
        const wrapper = mount(Input, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-input-container-size-large')
      })
    })

    describe('round属性', () => {
      it('round=true', () => {
        const wrapper = mount(Input, {
          propsData: {
            round: true,
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-input-container-size-small-round')
      })
    })

    describe('prefix属性', () => {
      it('prefix="search"', () => {
        const wrapper = mount(Input, {
          propsData: {
            prefix: 'search'
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-prefix').exists()).toBe(true)
        expect(wrapper.find('.sj-input-prefix > i').classes()).toContain('search')
      })
    })

    describe('suffix属性', () => {
      it('suffix="search"', () => {
        const wrapper = mount(Input, {
          propsData: {
            suffix: 'search'
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-suffix').exists()).toBe(true)
        expect(wrapper.find('.sj-input-suffix > i').classes()).toContain('search')
      })
    })

    describe('search属性', () => {
      it('search=true', () => {
        const wrapper = mount(Input, {
          propsData: {
            search: true
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-search-icon').exists()).toBe(true)
      })
    })

    describe('show-search属性', () => {
      it('show-search=false', () => {
        const wrapper = mount(Input, {
          propsData: {
            showSearch: false
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-search-icon').exists()).toBe(false)
      })
    })

    describe('search-button属性', () => {
      it('search-button=true', () => {
        const wrapper = mount(Input, {
          propsData: {
            search: true,
            searchButton: true
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-search-icon').exists()).toBe(false)
        expect(wrapper.find('.sj-button > i').classes()).toContain('search')
      })
    })

    describe('search-button-text属性', () => {
      it('search-button-text="123"', () => {
        const wrapper = mount(Input, {
          propsData: {
            search: true,
            searchButton: true,
            searchButtonText: '123'
          }
        })
        expect(wrapper.find('.sj-button').text()).toContain('123')
      })
    })

    describe('loading属性', () => {
      it('loading=true', () => {
        const wrapper = mount(Input, {
          propsData: {
            search: true,
            loading: true
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-search-icon').classes()).toContain('loading-a')
      })
    })

    describe('password属性', () => {
      it('password=true', () => {
        const wrapper = mount(Input, {
          propsData: {
            password: true
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-password').classes()).toContain('eye-close')
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(Input, {
          propsData: {
            disabled: true
          }
        })
        expect(wrapper.classes()).toContain('sj-input-container-disabled')
      })
    })

    describe('show-length属性', () => {
      it('show-length=10', () => {
        const wrapper = mount(Input, {
          propsData: {
            showLength: true
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-length').exists()).toBe(true)
      })
    })

    describe('max-length属性', () => {
      it('max-length=10', () => {
        const wrapper = mount(Input, {
          propsData: {
            showLength: true,
            maxLength: 10
          }
        })
        expect(wrapper.find('.sj-input > .sj-input-length').text().includes('/ 10')).toBe(true)
      })
    })

    describe('status属性', () => {
      it('status="success"', () => {
        const wrapper = mount(Input, {
          propsData: {
            status: 'success'
          }
        })
        expect(wrapper.find('.sj-input-status-success').exists()).toBe(true)
      })
      it('status="error"', () => {
        const wrapper = mount(Input, {
          propsData: {
            status: 'error'
          }
        })
        expect(wrapper.find('.sj-input-status-error').exists()).toBe(true)
      })
      it('status="warning"', () => {
        const wrapper = mount(Input, {
          propsData: {
            status: 'warning'
          }
        })
        expect(wrapper.find('.sj-input-status-warning').exists()).toBe(true)
      })
    })

    describe('autofocus属性', () => {
      it('autofocus=true', () => {
        const wrapper = mount(Input, {
          propsData: {
            autofocus: true
          }
        })
        expect(wrapper.find('.sj-input > input').attributes('autofocus')).toBe('')
      })
    })

    describe('border-type属性', () => {
      it('border-type="none"', () => {
        const wrapper = mount(Input, {
          propsData: {
            borderType: 'none'
          }
        })
        expect(wrapper.find('.sj-input-border-none').exists()).toBe(true)
      })
      it('border-type="block"', () => {
        const wrapper = mount(Input, {
          propsData: {
            borderType: 'block'
          }
        })
        expect(wrapper.find('.sj-input-border-block').exists()).toBe(true)
      })
      it('border-type="line"', () => {
        const wrapper = mount(Input, {
          propsData: {
            borderType: 'line'
          }
        })
        expect(wrapper.find('.sj-input-border-line').exists()).toBe(true)
      })
    })
  })

  describe('Event测试', () => {
    it('clear', () => {
      const wrapper = mount(Input)
      wrapper.vm.$emit('clear')
      expect(wrapper.emitted().clear).toBeTruthy()
    })
    it('search', () => {
      const wrapper = mount(Input)
      wrapper.vm.$emit('search', '123', {})
      expect(wrapper.emitted().search[0]).toEqual(['123', {}])
    })
    it('focus', () => {
      const wrapper = mount(Input)
      wrapper.vm.$emit('focus')
      expect(wrapper.emitted().focus).toBeTruthy()
    })
    it('blur', () => {
      const wrapper = mount(Input)
      wrapper.vm.$emit('blur')
      expect(wrapper.emitted().blur).toBeTruthy()
    })
    it('change', () => {
      const wrapper = mount(Input)
      wrapper.vm.$emit('change', '123', {})
      expect(wrapper.emitted().change[0]).toEqual(['123', {}])
    })
    it('input', () => {
      const wrapper = mount(Input)
      wrapper.vm.$emit('input', '123', {})
      expect(wrapper.emitted().input[0]).toEqual(['123', {}])
    })
  })

  describe('Slots测试', () => {
    it('prefix', () => {
      const wrapper = mount(Input, {
        slots: {
          prefix: <Icon type="user" />
        }
      })
      expect(wrapper.find('.sj-input-prefix > .sj-icon').classes()).toContain('user')
    })
    it('suffix', () => {
      const wrapper = mount(Input, {
        slots: {
          suffix: <Icon type="user" />
        }
      })
      expect(wrapper.find('.sj-input-suffix > .sj-icon').classes()).toContain('user')
    })
    it('search-button', () => {
      const wrapper = mount(Input, {
        propsData: {
          search: true,
          searchButton: true
        },
        slots: {
          'search-button': <Button>My Search</Button>
        }
      })
      expect(wrapper.find('.sj-button').text()).toBe('My Search')
    })
  })
})
