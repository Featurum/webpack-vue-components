import Vue from 'vue'
import component from './component/header.vue'

new Vue({
	mode: 'history',
  	el: '#header',
  	components: { component },
  	template: '<component/>'
})
