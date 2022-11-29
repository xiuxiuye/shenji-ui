import { mount } from '@vue/test-utils'
import Menu from 'src/components/Menu'
import MenuItem from 'src/components/MenuItem'

describe('Menu组件单元测试', () => {

  it('基本使用', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: [
          <MenuItem symbol="menu1">菜单一</MenuItem>
        ]
      }
    })
    expect(wrapper.find('.sj-menu-item > .sj-menu-item-content').text()).toBe('菜单一')
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
          <MenuItem>菜单一</MenuItem>
        ]
      }
    })
    const expectErrorMsg = 'Error: 神机：symbol is a required prop for the MenuItem component'
    expect(actualErrorMsg).toBe(expectErrorMsg)
  })

  describe('Props测试', () => {
    describe('icon属性', () => {
      it('icon="user"', () => {
        const wrapper = mount(Menu, {
          propsData: {
            mode: 'inline'
          },
          slots: {
            default: [
              <MenuItem symbol="menu1" icon="user">菜单一</MenuItem>
            ]
          }
        })
        expect(wrapper.find('.sj-menu-item > .sj-menu-item-icon > .user').exists()).toBe(true)
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
              <MenuItem symbol="menu1" disabled>菜单一</MenuItem>
            ]
          }
        })
        expect(wrapper.find('.sj-menu-item-disabled').exists()).toBe(true)
      })
    })
  })
})