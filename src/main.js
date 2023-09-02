import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'lib-flexible/flexible'
import VueLazyload from 'vue-lazyload'

import {
  Button,
  Tabbar,
  TabbarItem,
  Search,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Col,
  Row,
  Icon,
  Image as VanImage,
  Loading,
  Lazyload,
  NavBar,
  Cell,
  CellGroup,
  List,
  ActionSheet,
  Slider,
  Form,
  Field,
  Popup,
  Toast
} from 'vant';

// 导入 loading 图片
import loadingImage from './assets/R.gif';
const loadimage = require('./assets/R.gif')

Vue
  .use(VueAxios, axios)
  .use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(Col)
  .use(Row)
  .use(Icon)
  .use(VanImage)
  .use(Loading)
  .use(Lazyload)
  .use(NavBar)
  .use(Cell)
  .use(CellGroup)
  .use(List)
  .use(ActionSheet)
  .use(Slider)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(Toast)
  .use(VueLazyload, {
    preLoad: 1.6,
    // error: errorimage,
    loading: loadimage,
    attempt: 1
  })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
