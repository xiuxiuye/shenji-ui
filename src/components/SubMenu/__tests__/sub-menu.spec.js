import { mount } from '@vue/test-utils'
import Menu from 'src/components/Menu'
import MenuItem from 'src/components/MenuItem'
import SubMenu from 'src/components/SubMenu'

describe('Menu组件单元测试', () => {

  it('基本使用', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: [
          <SubMenu symbol="submenu1">
            <MenuItem symbol="menu1">菜单一</MenuItem>
          </SubMenu>
        ]
      }
    })
    expect(wrapper.find('.sj-sub-menu').exists()).toBe(true)
  })

  it('不传symbol', () => {
    const err = console.error
    let actualErrorMsg
    console.error = (error) => {
      actualErrorMsg = error.toString()
      err.call(null, error)
    }
    mount(Menu, {
      slots: {
        default: [
          <SubMenu>
            <MenuItem symbol="menu1">菜单一</MenuItem>
          </SubMenu>
        ]
      }
    })
    const expectErrorMsg = 'Error: 神机：symbol is a required prop for the SubMenu component'
    expect(actualErrorMsg).toBe(expectErrorMsg)
  })

  describe('Props测试', () => {
    describe('title属性', () => {
      it('title="子菜单一"', () => {
        const wrapper = mount(Menu, {
          propsData: {
            mode: 'inline'
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1" title="子菜单一">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>
            ]
          }
        })
        expect(wrapper.find('.sj-sub-menu > .sj-sub-menu-header > .sj-sub-menu-title').text()).toBe('子菜单一')
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
              <SubMenu symbol="submenu1" title="子菜单一" icon="user">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>
            ]
          }
        })
        expect(wrapper.find('.sj-sub-menu > .sj-sub-menu-header > .sj-sub-menu-icon > .user').exists()).toBe(true)
      })
    })

    describe('expandedIcon属性', () => {
      it('expandedIcon="user"', () => {
        const wrapper = mount(Menu, {
          propsData: {
            mode: 'inline'
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1" title="子菜单一" expanded-icon="user">
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>
            ]
          }
        })
        expect(wrapper.find('.sj-sub-menu > .sj-sub-menu-header > .sj-sub-menu-expand-icon > .user').exists()).toBe(true)
      })
    })

    describe('disabled属性', () => {
      it('disabled=true', () => {
        const wrapper = mount(Menu, {
          propsData: {
            mode: 'inline'
          },
          slots: {
            default: [
              <SubMenu symbol="submenu1" title="子菜单一" disabled>
                <MenuItem symbol="menu1">菜单一</MenuItem>
              </SubMenu>
            ]
          }
        })
        expect(wrapper.find('.sj-sub-menu-disabled').exists()).toBe(true)
      })
    })
  })

  describe('Slots测试', () => {
    it('title', () => {
      const wrapper = mount(SubMenu, {
        propsData: {
          symbol: 'submenu1',
          title: '子菜单一',
        },
        slots: {
          title: '自定义subTitle',
          default: <MenuItem symbol="menu1">菜单一</MenuItem>
        }
      })
      expect(wrapper.find('.sj-sub-menu > .sj-sub-menu-header > .sj-sub-menu-title').text()).toBe('自定义subTitle')
    })
  })

  describe('Slots测试', () => {
    it('expandedIcon', () => {
      const wrapper = mount(SubMenu, {
        propsData: {
          symbol: 'submenu1',
          title: '子菜单一',
        },
        slots: {
          "expanded-icon": '自定义expandedIcon',
          default: <MenuItem symbol="menu1">菜单一</MenuItem>
        }
      })
      expect(wrapper.find('.sj-sub-menu > .sj-sub-menu-header > .sj-sub-menu-expand-icon').text()).toBe('自定义expandedIcon')
    })
  })
})