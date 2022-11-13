import { mount } from '@vue/test-utils'
import Card from 'src/components/Card'

describe('Card组件单元测试', () => {
  it('是否是Vue组件实例', () => {
    const wrapper = mount(Card)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Props测试', () => {
    describe('bordered属性', () => {
      it('bordered=true', () => {
        const wrapper = mount(Card, {
          propsData: {
            bordered: true
          }
        })
        expect(wrapper.classes()).toContain('sj-card-bordered')
      })

      it('bordered=false', () => {
        const wrapper = mount(Card, {
          propsData: {
            bordered: false
          }
        })
        expect(wrapper.classes().includes('sj-card-bordered')).toBe(false)
      })
    })

    describe('loading属性', () => {
      it('loading=true', () => {
        const wrapper = mount(Card, {
          propsData: {
            loading: true
          }
        })
        expect(wrapper.find('.sj-card-content-loading').exists()).toBe(true)
      })

      it('loading=false', () => {
        const wrapper = mount(Card, {
          propsData: {
            loading: false
          }
        })
        expect(wrapper.find('.sj-card-content-loading').exists()).toBe(false)
      })
    })

    describe('size属性', () => {
      it('size="normal"', () => {
        const wrapper = mount(Card, {
          propsData: {
            size: 'normal'
          }
        })
        expect(wrapper.classes()).toContain('sj-card-size-normal')
      })

      it('size="small"', () => {
        const wrapper = mount(Card, {
          propsData: {
            size: 'small'
          }
        })
        expect(wrapper.classes()).toContain('sj-card-size-small')
      })

      it('size="large"', () => {
        const wrapper = mount(Card, {
          propsData: {
            size: 'large'
          }
        })
        expect(wrapper.classes()).toContain('sj-card-size-large')
      })
    })

    describe('cover属性', () => {
      it('cover="cover"', () => {
        const wrapper = mount(Card, {
          propsData: {
            cover: 'cover'
          }
        })
        expect(wrapper.find('.sj-card-cover').exists()).toBe(true)
      })
    })

    describe('title属性', () => {
      it('title="Card title"', () => {
        const wrapper = mount(Card, {
          propsData: {
            title: 'Card title'
          }
        })
        expect(wrapper.find('.sj-card-header-title').text()).toBe('Card title')
      })
    })

    describe('icon属性', () => {
      it('icon="user"', () => {
        const wrapper = mount(Card, {
          propsData: {
            title: 'Card title',
            icon: 'user'
          }
        })
        expect(wrapper.find('.sj-card-header-title > .sj-icon').classes()).toContain('user')
      })
    })

    describe('description属性', () => {
      it('description="This is a card description"', () => {
        const wrapper = mount(Card, {
          propsData: {
            title: 'Card title',
            description: 'This is a card description'
          }
        })
        expect(wrapper.find('.sj-card-header-description').text()).toBe('This is a card description')
      })
    })

    describe('shadow属性', () => {
      it('shadow="never"', () => {
        const wrapper = mount(Card, {
          propsData: {
            shadow: 'never'
          }
        })
        expect(wrapper.classes().includes('sj-card-shadow-never')).toBe(false)
      })

      it('shadow="hover"', () => {
        const wrapper = mount(Card, {
          propsData: {
            shadow: 'hover'
          }
        })
        expect(wrapper.classes()).toContain('sj-card-shadow-hover')
      })

      it('shadow="always"', () => {
        const wrapper = mount(Card, {
          propsData: {
            shadow: 'always'
          }
        })
        expect(wrapper.classes()).toContain('sj-card-shadow-always')
      })
    })

    describe('divideble属性', () => {
      it('divideble=true', () => {
        const wrapper = mount(Card, {
          propsData: {
            divideble: true,
            loading: true
          }
        })
        expect(wrapper.classes()).toContain('sj-card-divideble')
        expect(wrapper.find('.sj-card-content').attributes('style').includes('border-top-width: 0;')).toBe(true)
        expect(wrapper.find('.sj-card-content').attributes('style').includes('border-bottom-width: 0;')).toBe(true)
      })
    })

    describe('no-padding属性', () => {
      it('no-padding="header"', () => {
        const wrapper = mount(Card, {
          propsData: {
            noPadding: 'header',
            title: 'Card title'
          }
        })
        expect(wrapper.classes()).toContain('sj-card-header-no-padding')
      })

      it('no-padding="footer"', () => {
        const wrapper = mount(Card, {
          propsData: {
            noPadding: 'footer'
          },
          slots: {
            footer: '123'
          }
        })
        expect(wrapper.classes()).toContain('sj-card-footer-no-padding')
      })

      it('no-padding="content"', () => {
        const wrapper = mount(Card, {
          propsData: {
            noPadding: 'content'
          },
          slots: {
            default: '123'
          }
        })
        expect(wrapper.classes()).toContain('sj-card-content-no-padding')
      })
    })
  })

  describe('Slots测试', () => {
    it('cover', () => {
      const wrapper = mount(Card, {
        slots: {
          cover: '123'
        }
      })
      expect(wrapper.find('.sj-card-cover').text()).toBe('123')
    })

    it('header-extra', () => {
      const wrapper = mount(Card, {
        slots: {
          'header-extra': '123'
        }
      })
      expect(wrapper.find('.sj-card-header-extra').text()).toBe('123')
    })

    it('header-title', () => {
      const wrapper = mount(Card, {
        slots: {
          'header-title': '123'
        }
      })
      expect(wrapper.find('.sj-card-header-title').text()).toBe('123')
    })

    it('header-description', () => {
      const wrapper = mount(Card, {
        slots: {
          'header-title': 'Card title',
          'header-description': '123'
        }
      })
      expect(wrapper.find('.sj-card-header-description').text()).toBe('123')
    })

    it('header', () => {
      const wrapper = mount(Card, {
        slots: {
          header: '123',
        }
      })
      expect(wrapper.find('.sj-card-header').text()).toBe('123')
    })

    it('default', () => {
      const wrapper = mount(Card, {
        slots: {
          default: '123',
        }
      })
      expect(wrapper.find('.sj-card-content').text()).toBe('123')
    })

    it('footer', () => {
      const wrapper = mount(Card, {
        slots: {
          footer: '123',
        }
      })
      expect(wrapper.find('.sj-card-footer').text()).toBe('123')
    })
  })
})
