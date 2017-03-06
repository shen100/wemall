import Vue            from 'vue';
import VueResource 	  from 'vue-resource';
import EditCategory    from './components/EditCategory.vue';
import Element        from 'element-ui'; 
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);
Vue.use(VueResource);

var app = new Vue({
    el: '#app',
    render: h => h(EditCategory)
});