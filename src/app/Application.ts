
import request from "./core/request";
// import Vue from 'vue'
// import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
const Vue = (globalThis as any).Vue;
const Element = (globalThis as any).ELEMENT
export default class Application {

  constructor(root: string) {
    Vue.config.productionTip = false;
    Vue.use(Element)
    const vm = new Vue({
      el: root,
      data() {
        return {
          msg: 'hello vue'
        }
      },
      async created() {
        const data = await request('https://www.baidu.com')
        console.log('data====', data)

      }
    });
  }
}
