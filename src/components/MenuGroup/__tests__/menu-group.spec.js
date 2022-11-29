import { mount } from '@vue/test-utils'
import Menu from 'src/components/Menu'
import MenuItem from 'src/components/MenuItem'
import MenuGroup from 'src/components/MenuGroup'

describe('Menu组件单元测试', () => {
  describe('Props测试', () => {
    describe('title属性', () => {
      it('title="子菜单一"', () => {
        const wrapper = mount(Menu, {
          propsData: {
            mode: 'inline'
          },
          slots: {
            default: [
              <MenuGroup title="分组一">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </MenuGroup>
            ]
          }
        })
        expect(wrapper.find('.sj-menu-group > .sj-menu-group-header > .sj-menu-group-title').text()).toBe('分组一')
      })
    })

    describe('icon属性', () => {
      it('icon="user"', () => {
        const wrapper = mount(Menu, {
          propsData: {
            mode: 'inline'
          },
          slots: {
            default: [
              <MenuGroup title="分组一" icon="user">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </MenuGroup>
            ]
          }
        })
        expect(wrapper.find('.sj-menu-group > .sj-menu-group-header > .sj-menu-group-icon > .user').exists()).toBe(true)
      })
    })
  })

  describe('Slots测试', () => {
    it('title', () => {
      const wrapper = mount(MenuGroup, {
        propsData: {
          title: '分组一',
        },
        slots: {
          title: '自定义分组1',
          default: <MenuItem symbol="menu1">菜单一</MenuItem>
        }
      })
      expect(wrapper.find('.sj-menu-group > .sj-menu-group-header > .sj-menu-group-title').text()).toBe('自定义分组1')
    })
  })
})