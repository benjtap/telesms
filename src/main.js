import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import FlashMessage from '@smartweb/vue-flash-message';
import api from './utils/backend'
import crypto from './utils/crypto'
import Vuetify from 'vuetify'
import JQuery from 'jquery'
import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
 
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import DynamicSelect from 'vue-dynamic-select'

//window.$ = JQuery
Vue.config.productionTip = false
Vue.use(FlashMessage);
Vue.use(DynamicSelect)
Vue.prototype.crypto = crypto
Vue.prototype.api = api
Vue.use(VuejsDialog);

Vue.use(Vuetify, {
  icons: 'md',
  rtl: true
})

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
