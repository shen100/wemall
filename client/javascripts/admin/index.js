import Vue            from 'vue';
import Index          from './overview/components/Index.vue';
import Element        from 'element-ui'; 
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);

var app = new Vue({
    el: '#app',
    render: h => h(Index)
});
