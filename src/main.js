import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//动态修改网页的
import '@/mobile/flexible.js'
import { Tabbar, TabbarItem,NavBar,Col,
   Row,Image as VanImage,Cell, CellGroup, Icon,Search,List} from 'vant';


Vue.use(List);
Vue.use(Search)
Vue.use(Icon)
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);
// , Row,Image as VanImage?
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
