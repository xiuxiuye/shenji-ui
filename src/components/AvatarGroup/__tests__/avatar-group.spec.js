import { mount } from '@vue/test-utils'
import Avatar from 'src/components/Avatar/index.vue'
import AvatarGroup from 'src/components/AvatarGroup/index.vue'

describe('AvatarGroup组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('vertical属性', () => {
      it('vertical=true', () => {
        const wrapper = mount(AvatarGroup, {
          propsData: {
            vertical: true
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-group-vertical')
      })

      it('vertical=false', () => {
        const wrapper = mount(AvatarGroup, {
          propsData: {
            vertical: false
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-group-horizontal')
      })
    })

    describe('tight属性', () => {
      it('tight=true', () => {
        const wrapper = mount(AvatarGroup, {
          propsData: {
            tight: true
          }
        })
        expect(wrapper.classes()).toContain('sj-avatar-group-horizontal-tight')
      })
    })
  })

  describe('Slots测试', () => {
    it('default', () => {
      const wrapper = mount(AvatarGroup, {
        slots: {
          default: <Avatar>123</Avatar>
        }
      })
      expect(wrapper.findComponent(Avatar).text()).toBe('123')
    })
  })
})
