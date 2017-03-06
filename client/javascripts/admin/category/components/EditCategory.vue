<template>
	<div id="app">
		<admin-header />
        <div class="wemall-admin-body">
            <admin-sidebar/>
            <div class="wemall-admin-content">
                <div class="wemall-admin-page-title">分类编辑</div>
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
                    <el-row class="wemall-admin-from-box">
                        <el-col :span="leftWidth" class="wemall-admin-from-left">状态</el-col>
                        <el-col :span="rightWidth" :offset="offset" class="wemall-admin-from-switch">
                            <el-switch
                                v-model="status"
                                on-text="开启"
                                off-text="关闭">
                            </el-switch>
                        </el-col>
                    </el-row>
                    <el-row class="wemall-admin-from-box">
                        <el-col :span="leftWidth" class="wemall-admin-from-left">备注</el-col>
                        <el-col :span="rightWidth" :offset="offset">
                            <el-input class="wemall-admin-from-right" type="textarea" :row="2" v-model="remark" placeholder=""></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="wemall-admin-from-box">
                        <el-button 
                            type="primary"
                            @click="submit"
                            :loading="loading"
                            class="wemall-admin-button">确定</el-button>
                        <el-button 
                            type="primary"
                            @click="cancel"
                            class="wemall-admin-button">取消</el-button>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .wemall-admin-button {
        width: 100px;
        margin-left: 170px !important;
        margin-top: 20px !important;
        margin-bottom: 30px !important;
    }
    .wemall-admin-from-switch {
        line-height: 36px;
        height: 36px;
    }
</style>

<script>
    import Header  from '../../components/Header.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import config  from '../../config';

    const category = jsonData.category || {};

    export default {
        data() {
            return {
                parentId: category.parentId || 0,
                name: category.name || '',
                image: {},
                id: category.id,
                order: category.order || 0,
                remark: category.remark || '',
                status: (category.status == 1) ? false : true,
                loading: false,
                leftWidth: 3,
                rightWidth: 10,
                offset: 1
            }
        },
        components: {
            'admin-header' : Header,
            'admin-sidebar': Sidebar
        },
        methods: {
            submit() {
                if (this.loading) {
                    return;
                }
                this.loading = true;
                const submitData = {
                    parentId: $.trim(this.parentId),
                    id: this.id,
                    name: $.trim(this.name),
                    order: $.trim(this.order),
                    remark: $.trim(this.remark),
                    status: this.status ? 2 : 1
                };
                
                this.$http.post(config.api.category.create, submitData).then(response => {
                    console.log('success', response);
                    if (response.status === 200 && response.body.errNo === 0) {
                        window.location.href = '/admin/category/list';
                    } else if (response.status === 200) {
                        this.$alert(response.body.msg, '提醒');
                    } else {
                        this.$alert(config.msg.serverErr, '提醒');
                    }
                    this.loading = false;
                }, response => {
                    console.log('error', response);
                    this.loading = false;
                });
            },
            cancel() {
                
            }
        }
    }
</script>