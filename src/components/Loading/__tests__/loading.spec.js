import { mount } from '@vue/test-utils'
import Loading from 'src/components/Loading/index.vue'

describe('Loading组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Loading)
    expect(wrapper.exists()).toBe(true)
  })

  it('基本使用', () => {
    const wrapper = mount(Loading)
    expect(wrapper.find('.sj-loading').exists()).toBe(true)
    expect(wrapper.find('.sj-loading-size-normal').exists()).toBe(true)
    expect(wrapper.find('.sj-loading-container').exists()).toBe(false)
  })

  describe('Props测试', () => {
    describe('tips属性', () => {
      it('tips="123"', () => {
        const wrapper = mount(Loading, {
          propsData: {
            tips: '123'
          }
        })
        expect(wrapper.find('.sj-loading > .sj-loading-tips').text()).toBe('123')
      })
    })

    describe('visible属性', () => {
      it('visible=true', () => {
        const wrapper = mount(Loading, {
          propsData: {
            visible: true
          }
        })
        expect(wrapper.find('.sj-loading').exists()).toBe(true)
      })

      it('visible=false', () => {
        const wrapper = mount(Loading, {
          propsData: {
            visible: false
          }
        })
        expect(wrapper.find('.sj-loading').exists()).toBe(false)
      })
    })

    describe('fit属性', () => {
      it('fit=true', () => {
        const wrapper = mount(Loading, {
          propsData: {
            fit: true
          },
          slots: {
            default: <div style="width: 100px; height: 100px;"></div>
          }
        })
        expect(wrapper.classes()).toContain('sj-loading-container-fit')
      })
    })

    describe('size属性', () => {
      it('size="normal"', () => {
        const wrapper = mount(Loading, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-loading-size-normal')
      })

      it('size="small"', () => {
        const wrapper = mount(Loading, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-loading-size-small')
      })

      it('size="large"', () => {
        const wrapper = mount(Loading, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-loading-size-large')
      })

      it('size=64', () => {
        const wrapper = mount(Loading, {
          propsData: {
            size: 64
          }
        })
        const child = wrapper.find('.sj-loading > .sj-loading-bloom')
        expect(child.attributes('style').includes('width: 64px; height: 64px;')).toBe(true)
      })

      it('size="64"', () => {
        const wrapper = mount(Loading, {
          propsData: {
            size: 64
          }
        })
        const child = wrapper.find('.sj-loading > .sj-loading-bloom')
        expect(child.attributes('style').includes('width: 64px; height: 64px;')).toBe(true)
      })

      it('size="64px"', () => {
        const wrapper = mount(Loading, {
          propsData: {
            size: 64
          }
        })
        const child = wrapper.find('.sj-loading > .sj-loading-bloom')
        expect(child.attributes('style').includes('width: 64px; height: 64px;')).toBe(true)
      })
    })
  })

  describe('Slots测试', () => {
    it('default', () => {
      const wrapper = mount(Loading, {
        slots: {
          default: <div class="default-slot" style="width: 100px; height: 100px;">default slot</div>
        }
      })
      expect(wrapper.classes()).toContain('sj-loading-container')
      expect(wrapper.find('.sj-loading-content > .default-slot').text()).toBe('default slot')
    })

    it('loading', () => {
      const wrapper = mount(Loading, {
        slots: {
          loading: <div class="loading-slot" style="width: 100px; height: 100px;">loading slot</div>
        }
      })
      expect(wrapper.find('.sj-loading-container').exists()).toBe(false)
      expect(wrapper.find('.sj-loading > .loading-slot').text()).toBe('loading slot')
    })

    it('tips', () => {
      const wrapper = mount(Loading, {
        slots: {
          tips: <div class="tips-slot" style="width: 100px; height: 100px;">tips slot</div>
        }
      })
      expect(wrapper.find('.sj-loading-container').exists()).toBe(false)
      expect(wrapper.find('.sj-loading > .sj-loading-tips > .tips-slot').text()).toBe('tips slot')
    })
  })
})
