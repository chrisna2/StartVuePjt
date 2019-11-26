import Vue from 'vue'
import App from './App.vue'

//부트스트렙 프로젝트에 인포트
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//tab 컴포넌트
import Tabs from 'vue-tabs-component';

Vue.use(BootstrapVue);
Vue.use(Tabs);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
