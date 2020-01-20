import Vue from 'vue'
import component from './component/menu.vue'

new Vue({
	mode: 'history',
  	el: '.component1',
  	components: { component },
  	template: '<component/>'
})


new Vue({
	mode: 'history',
  	el: '.component2',
  	components: { component },
  	template: '<component/>'
})
