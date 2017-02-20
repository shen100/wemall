<template>
	<div id="app">
		<admin-header />
        <div class="wemall-admin-body">
            <admin-sidebar/>
            <div class="wemall-admin-content">
                <div class="wemall-admin-page-title">新增分类</div>
                <div class="wemall-admin-page-container">
                    <el-row class="wemall-admin-from-box">
                        <el-col :span="leftWidth" class="wemall-admin-from-left">上级分类</el-col>
                        <el-col :span="rightWidth" :offset="offset">
                            <el-input class="wemall-admin-from-right" v-model="parentId" placeholder=""></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="wemall-admin-from-box">
                        <el-col :span="leftWidth" class="wemall-admin-from-left">分类名称</el-col>
                        <el-col :span="rightWidth" :offset="offset">
                            <el-input class="wemall-admin-from-right" v-model="name" placeholder=""></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="wemall-admin-from-box">
                        <el-col :span="leftWidth" class="wemall-admin-from-left">图片</el-col>
                        <el-col :span="rightWidth" :offset="offset">
                            <el-input class="wemall-admin-from-right" v-model="parentId" placeholder=""></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="wemall-admin-from-box">
                        <el-col :span="leftWidth" class="wemall-admin-from-left">排序</el-col>
                        <el-col :span="rightWidth" :offset="offset">
                            <el-input class="wemall-admin-from-right" v-model="order" placeholder=""></el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>

<script>
    import Header  from '../../components/Header.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import config  from '../../config';

    export default {
        data() {
            return {
                parentId: '',
                name: '',
                image: {},
                order: '',
                leftWidth: 3,
                rightWidth: 10,
                offset: 1
            }
        },
        components: {
            'admin-header' : Header,
            'admin-sidebar': Sidebar
        },
    }
</script>