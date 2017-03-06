import Vue            from 'vue';
import VueResource 	  from 'vue-resource';
import CreateCategory from './components/CreateCategory.vue';
import Element        from 'element-ui'; 
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);
Vue.use(VueResource);

var app = new Vue({
    el: '#app',
    render: h => h(CreateCategory)
});