import { mount } from '@vue/test-utils'
import Menu from 'src/components/Menu'
import MenuItem from 'src/components/MenuItem'
import SubMenu from 'src/components/SubMenu'

describe('Menu组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Menu)
    expect(wrapper.exists()).toBe(true)
  })

  it('基本使用', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: <MenuItem symbol="menu1">菜单一</MenuItem>
      }
    })
    expect(wrapper.find('.sj-menu').exists()).toBe(true)
    expect(wrapper.find('.sj-menu-item > .sj-menu-item-content').text()).toBe('菜单一')
  })

  describe('Props测试', () => {
    describe('mode属性', () => {
      it('mode="inline"', () => {
        const wrapper = mount(Menu, {
          props: {
            mode: 'inline'
          },
          slots: {
            default: <MenuItem symbol="menu1">菜单一</MenuItem>
          }
        })
        expect(wrapper.find('.sj-menu-inline').exists()).toBe(true)
      })
      it('mode="vertical"', () => {
        const wrapper = mount(Menu, {
          props: {
            mode: 'vertical'
          },
          slots: {
            default: <MenuItem symbol="menu1">菜单一</MenuItem>
          }
        })
        expect(wrapper.find('.sj-menu-vertical').exists()).toBe(true)
      })
      it('mode="horizontal"', () => {
        const wrapper = mount(Menu, {
          props: {
            mode: 'horizontal',
            activeItem: 'menu2'
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>,
              <MenuItem symbol="menu2">菜单二</MenuItem>
            ]
          }
        })
        expect(wrapper.find('.sj-menu-horizontal').exists()).toBe(true)
        expect(wrapper.find('.sj-sub-menu > .sj-sub-menu-horizontal-header').exists()).toBe(true)
        expect(wrapper.find('.sj-menu > .sj-menu-item-horizontal-active').exists()).toBe(true)
      })
    })

    describe('activeItem属性', () => {
      it('activeItem="menu2"', () => {
        const wrapper = mount(Menu, {
          props: {
            activeItem: 'menu2'
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>,
              <MenuItem symbol="menu2">菜单二</MenuItem>
            ]
          }
        })
        expect(wrapper.find('.sj-menu-item-active > .sj-menu-item-content').text()).toBe('菜单二')
      })

      it('activeItem="menu1"', () => {
        const wrapper = mount(Menu, {
          props: {
            activeItem: 'menu1',
            expandedSubMenus: ['submenu1']
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>,
              <MenuItem symbol="menu2">菜单二</MenuItem>
            ]
          }
        })
        expect(wrapper.find('.sj-menu-item-active > .sj-menu-item-content').text()).toBe('菜单一')
      })
    })

    describe('expandedSubMenus属性', () => {
      it('expandedSubMenus="[\'submenu1\']"', () => {
        const wrapper = mount(Menu, {
          props: {
            expandedSubMenus: ['submenu1']
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>,
            ]
          }
        })
        expect(wrapper.find('.sj-sub-menu .sj-sub-menu-body').exists()).toBe(true)
      })
    })

    describe('theme属性', () => {
      it('theme="light"', () => {
        const wrapper = mount(Menu, {
          props: {
            theme: 'light'
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>,
            ]
          }
        })
        expect(wrapper.classes()).toContain('sj-menu-light')
      })
      it('theme="dark"', () => {
        const wrapper = mount(Menu, {
          props: {
            theme: 'dark'
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>,
            ]
          }
        })
        expect(wrapper.classes()).toContain('sj-menu-dark')
      })
    })
  })

  describe('Event测试', () => {
    it('click', () => {
      const wrapper = mount(Menu)
      wrapper.vm.$emit('click', 'menu1')
      expect(wrapper.emitted().click[0]).toEqual(['menu1'])
    })
    it('expand', () => {
      const wrapper = mount(Menu)
      wrapper.vm.$emit('expand', ['submenu1', 'submenu2'])
      expect(wrapper.emitted().expand[0]).toEqual([['submenu1', 'submenu2']])
    })
  })
})