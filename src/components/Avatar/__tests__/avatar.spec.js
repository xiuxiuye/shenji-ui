import { mount } from '@vue/test-utils'
import Avatar from 'src/components/Avatar'
import Icon from 'src/components/Icon'

describe('Avatar组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('bordered属性', () => {
      it('bordered=true', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            bordered: true
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-bordered')
      })

      it('bordered=false', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            bordered: false
          }
        })
        expect(wrapper.classes().includes('sj-avatar-bordered')).toBe(false)
      })
    })

    describe('border-color属性', () => {
      it('border-color="red"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            borderColor: 'red'
          }
        })
        expect(wrapper.attributes('style').includes('border-color: red;')).toBe(true)
      })
    })

    describe('color属性', () => {
      it('color="red"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            color: 'red'
          }
        })
        expect(wrapper.attributes('style').includes('background-color: red;')).toBe(true)
      })
    })

    describe('size属性', () => {
      it('size="small"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-size-small')
      })

      it('size="normal"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-size-normal')
      })

      it('size="large"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-size-large')
      })

      it('size=48', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            size: 48
          }
        })
        expect(wrapper.attributes('style').includes('width: 48px; height: 48px;')).toBe(true)
      })

      it('size="48"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            size: "48"
          }
        })
        expect(wrapper.attributes('style').includes('width: 48px; height: 48px;')).toBe(true)
      })

      it('size="48px"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            size: "48px"
          }
        })
        expect(wrapper.attributes('style').includes('width: 48px; height: 48px;')).toBe(true)
      })
    })

    describe('alt属性', () => {
      it('alt="图片加载失败"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            alt: '图片加载失败'
          }
        })
        expect(wrapper.find('img').attributes('alt')).toBe('图片加载失败')
      })
    })
  
    describe('object-fit属性', () => {
      it('object-fit="cover"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            objectFit: 'cover',
          }
        })
        expect(wrapper.find('img').attributes('style').includes('object-fit: cover;')).toBe(true)
      })
    })
  
    describe('src属性', () => {
      it('src="123"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            src: '123',
          }
        })
        expect(wrapper.find('img').attributes('src')).toBe('123')
      })
    })

    describe('shape属性', () => {
      it('shape="circle"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            shape: 'circle'
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-shape-circle')
      })

      it('shape="square"', () => {
        const wrapper = mount(Avatar, {
          propsData: {
            shape: 'square'
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-shape-square')
      })
    })
  })

  describe('Slots测试', () => {
    it('default', () => {
      const wrapper = mount(Avatar, {
        slots: {
          default: '123'
        }
      })
      expect(wrapper.find('.sj-avatar-text-content').text()).toBe('123')
    })

    it('icon', () => {
      const wrapper = mount(Avatar, {
        slots: {
          default: '123',
          icon: <Icon type="user" />
        }
      })
      expect(wrapper.findComponent(Icon).classes()).toContain('user')
      expect(wrapper.find('.sj-avatar-text-content').exists()).toBe(false)
    })
  })
})
