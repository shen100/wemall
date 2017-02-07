<template>
    <div id="app">
        <admin-header/>
        <div>
            <admin-sidebar/>
            <div class="wemall-admin-content">
                
            </div>
        </div>
    </div>
</template>

<style>
   
</style>

<script>
    import Header     from '../../components/Header.vue';
    import Sidebar    from '../../components/Sidebar.vue';

    export default {
        data() {
            return {
                
            };
        },
        components: {
            'admin-header'  : Header,
            'admin-sidebar' : Sidebar
        }
    }
</script>





