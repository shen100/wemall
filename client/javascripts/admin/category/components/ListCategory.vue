<template>
	<div id="app">
		<admin-header />
        <div class="wemall-admin-body">
            <admin-sidebar/>
            <div class="wemall-admin-content">
                <div class="wemall-admin-page-title">商品分类管理</div>
                <div class="wemall-admin-page-container">
                    <div class="wemall-admin-table-top">
                        <el-button 
                            type="primary"
                            @click="buttonClick">新增菜单</el-button>
                    </div>
                    <el-table
                        :data="categories"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="id"
                          label="ID">
                        </el-table-column>
                        <el-table-column
                          prop="parentId"
                          label="上级菜单">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="菜单名称">
                        </el-table-column>
                        <el-table-column
                          label="图片">
                        </el-table-column>
                        <el-table-column
                          prop="order"
                          label="排序">
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态"
                          :formatter="formatStatus">
                        </el-table-column>
                        <el-table-column
                          prop="remark"
                          label="备注">
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template scope="scope">
                              <a :href="'/admin/category/edit/' + scope.row.id" class="el-button el-button--text el-button--small wemall-admin-bg">
                                <span class="wemall-admin-edit-text">编辑</span>
                                <div class="wemall-admin-bg-container wemall-admin-edit-bg">
                                    <img src="/images/edit.png" alt="">
                                </div>
                              </a>
                              <a href="" class="el-button el-button--text el-button--small wemall-admin-bg">
                                <span class="wemall-admin-operation-text">关闭</span>
                                <div class="wemall-admin-bg-container wemall-admin-operation-bg">
                                    <img src="/images/operation.png" alt="">
                                </div>
                              </a>
                          </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
	</div>
</template>

<style>
    .wemall-admin-table-top {
        margin-bottom: 10px;
    }
    .wemall-admin-bg {
        position: relative;
        overflow: hidden;
        width: 28px;
        height: 30px;
        border-radius: 0px !important;
        line-height: 20px !important;
    }
    .wemall-admin-bg-container {
        position: absolute;
        width: 26px;
        height: 23px;
        left: 0;
        top: 7px;
        border-radius: 2px !important;
    }
    .wemall-admin-edit-bg {
        background-color: #20a0ff;
    }
    .wemall-admin-operation-bg {
        background-color: #ea3f16;
    }
    .wemall-admin-bg-container img{
        width: 20px;
        height: 20px;
        top: 2px;
    }
    .wemall-admin-operation-bg img {
        margin-top: 1px;
    }
    .wemall-admin-edit-text, .wemall-admin-operation-text {
        position: absolute;
        left: 0;
        top: 30px;
    }
    .wemall-admin-edit-text, .wemall-admin-bg-container, .wemall-admin-operation-text {
        -webkit-transition: all .3s linear;
        -o-transition: all .3s linear;
        transition: all .3s linear;
    }
    .wemall-admin-bg:hover .wemall-admin-edit-text, .wemall-admin-bg:hover .wemall-admin-operation-text {
        top: 9px;
    }
    .wemall-admin-bg:hover .wemall-admin-bg-container {
        top: -30px;
    }
</style>

<script>
	import Header  from '../../components/Header.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import config  from '../../config';

    const category = config.Constant.category;

    const getNum = (num) => {
        if (typeof num !== 'number') {
            return '';
        }
        if (parseInt(num) === num) {
            return num;
        } else {
            return num.toFixed(2);
        }
    }
    export default {
        data() {
            const categories = jsonData.categories || [];
            return {
                categories
            };
        },
    	components: {
    		'admin-header' : Header,
            'admin-sidebar': Sidebar
    	},
        methods: {
            formatter(row, column) {
                return getNum(row.buyCount / row.browseCount * 100) + '%';
            },
            formatStatus(row, column) {
                return category.status[row.status];
            },
            buttonClick() {
                window.location.href = '/admin/category/create'
            }
        },
        beforeMount() {
            console.log('jsonData', jsonData)
        }
    }
</script>