import Vue            from 'vue';
import ListCategory    from './components/ListCategory.vue';
import Element        from 'element-ui'; 
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);

var app = new Vue({
    el: '#app',
    render: h => h(ListCategory)
});