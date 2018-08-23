// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import ScrollView from '@/scroll_view'

const createCmp = propsData => mount(ScrollView, { propsData })
let wrapper;
let cmp;
beforeEach(() => {
	wrapper = mount(ScrollView);
})
describe('scroll view test', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(ScrollView)

  it('refresh props set false test', () => {
    const cmp = createCmp({ refresh: false });
    expect(cmp.hasProp('refresh', false)).toBeTruthy();
    expect(cmp.contains('.refresh-wrap')).toBe(false);
  })

  it('refresh props set true test', () => {
    const cmp = createCmp({ refresh: false });
    expect(cmp.hasProp('refresh', true)).toBeTruthy();
    expect(cmp.contains('.refresh-wrap')).toBe(true);
  })

})