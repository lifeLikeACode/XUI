import Vue from 'vue';
// import Button from '@/components/HelloWorld'
// import xUi from '../package/index.js';
import button from '../../../package/components/button/index';

describe('Button.vue', () => {
	it('should render correct contents', () => {
		const Constructor = Vue.extend(button);
		const vm = new Constructor({
			propsData: {
				loading: true
			}
		}).$mount();
		const useElements = vm.$el.querySelectorAll('use');
		expect(useElements[0].getAttribute('xlink:href')).toEqual('#i-loading');
	});
});
