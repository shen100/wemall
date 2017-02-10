import Vue            from 'vue';
import ProductAnalyze from './components/ProductAnalyze.vue';
import Element        from 'element-ui'; 
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);

var app = new Vue({
    el: '#app',
    render: h => h(ProductAnalyze)
});