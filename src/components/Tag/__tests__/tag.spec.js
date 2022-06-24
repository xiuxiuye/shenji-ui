import { mount } from '@vue/test-utils'
import Tag from 'src/components/Tag/index.vue'
import Icon from 'src/components/Icon/index.vue'

describe('Tag组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Tag)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('bordered属性', () => {
      it('bordered=true', () => {
        const wrapper = mount(Tag, {
          propsData: {
            bordered: true
          }
        })
        expect(wrapper.classes()).toContain('sj-tag-bordered')
      })

      it('bordered=false', () => {
        const wrapper = mount(Tag, {
          propsData: {
            bordered: false
          }
        })
        expect(wrapper.classes().includes('sj-tag-bordered')).toBe(false)
      })
    })

    describe('closable属性', () => {
      it('closable=true', () => {
        const wrapper = mount(Tag, {
          propsData: {
            closable: true
          }
        })
        expect(wrapper.find('.sj-tag > .sj-tag-content > .sj-tag-close').classes()).toContain('close')
      })

      it('closable=false', () => {
        const wrapper = mount(Tag, {
          propsData: {
            closable: false
          }
        })
        expect(wrapper.find('.sj-tag > .sj-tag-content > .sj-tag-close').exists()).toBe(false)
      })
    })

    describe('closeIcon属性', () => {
      it('closeIcon="user"', () => {
        const wrapper = mount(Tag, {
          propsData: {
            closable: true,
            closeIcon: 'user'
          }
        })
        expect(wrapper.find('.sj-tag > .sj-tag-content > .sj-tag-close').classes()).toContain('user')
      })
    })

    describe('size属性', () => {
      it('size="small"', () => {
        const wrapper = mount(Tag, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-tag-size-small')
      })

      it('size="normal"', () => {
        const wrapper = mount(Tag, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-tag-size-normal')
      })

      it('size="large"', () => {
        const wrapper = mount(Tag, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-tag-size-large')
      })
    })

    describe('visible属性', () => {
      it('visible=false', () => {
        const wrapper = mount(Tag, {
          propsData: {
            visible: false
          }
        })
        expect(wrapper.find('.sj-tag').exists()).toBe(false)
      })
    })

    describe('color属性', () => {
      it('color="red"', () => {
        const wrapper = mount(Tag, {
          propsData: {
            color: "red"
          }
        })
        expect(wrapper.attributes('style').includes('background-color: red;')).toBe(true)
      })
    })

    describe('textColor属性', () => {
      it('textColor="white"', () => {
        const wrapper = mount(Tag, {
          propsData: {
            textColor: 'white',
            closable: true
          },
          slots: {
            default: '123',
            icon: '123'
          }
        })
        expect(wrapper.attributes('style').includes('color: white;')).toBe(true)
        expect(wrapper.find('.sj-tag > .sj-tag-icon').attributes('style').includes('color: white;')).toBe(true)
        expect(wrapper.find('.sj-tag > .sj-tag-content > .sj-tag-close').attributes('style').includes('color: white;')).toBe(true)
      })
    })

    describe('icon属性', () => {
      it('textColor="white"', () => {
        const wrapper = mount(Tag, {
          propsData: {
            icon: 'user'
          },
        })
        expect(wrapper.find('.sj-tag > .sj-tag-icon > .sj-icon').classes()).toContain('user')
      })
    })

    describe('bordered属性', () => {
      it('bordered=true', () => {
        const wrapper = mount(Tag, {
          propsData: {
            bordered: true
          },
        })
        expect(wrapper.classes()).toContain('sj-tag-bordered')
      })
    })

    describe('borderColor属性', () => {
      it('borderColor="blue"', () => {
        const wrapper = mount(Tag, {
          propsData: {
            borderColor: 'blue'
          },
        })
        expect(wrapper.attributes('style').includes('border-color: blue;')).toBe(true)
      })
    })

    describe('type属性', () => {
      const tyeps = ['normal', 'info', 'success', 'error', 'warning']
      tyeps.forEach(type => {
        it(`type="${type}"`, () => {
          const wrapper = mount(Tag, {
            propsData: {
              type,
            },
          })
          expect(wrapper.classes()).toContain(`sj-tag-type-${type}`)
        })
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(Tag, {
          propsData: {
            disabled: true
          },
        })
        expect(wrapper.classes()).toContain('sj-tag-disabled')
      })
    })

    describe('round属性', () => {
      it('round=true', () => {
        const wrapper = mount(Tag, {
          propsData: {
            round: true
          },
        })
        expect(wrapper.classes()).toContain('sj-tag-size-normal-round')
      })
    })
  })

  describe('Slots测试', () => {
    it('default', () => {
      const wrapper = mount(Tag, {
        slots: {
          default: '123'
        }
      })
      expect(wrapper.find('.sj-tag > .sj-tag-content').text()).toBe('123')
    })

    it('icon', () => {
      const wrapper = mount(Tag, {
        slots: {
          default: '123',
          icon: '456'
        }
      })
      expect(wrapper.find('.sj-tag > .sj-tag-icon').text()).toBe('456')
    })
  })
})
