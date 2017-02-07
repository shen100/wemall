import Vue            from 'vue';
import UserAnalyze    from './components/UserAnalyze.vue';
import Element        from 'element-ui'; 
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);

var app = new Vue({
    el: '#app',
    render: h => h(UserAnalyze)
});
