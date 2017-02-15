<template>
	<div id="app">
		<admin-header />
        <div class="wemall-admin-body">
            <admin-sidebar/>
            <div class="wemall-admin-content">
                <div class="wemall-admin-page-title">商品管理</div>
                <div class="wemall-admin-page-container">
                    <el-table
                        :data="products"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="name"
                          label="商品名称">
                        </el-table-column>
                        <el-table-column
                          prop="browseCount"
                          label="浏览量">
                        </el-table-column>
                        <el-table-column
                          prop="buyCount"
                          label="购买量">
                        </el-table-column>
                        <el-table-column
                          prop="totalSale"
                          label="销售额">
                        </el-table-column>
                        <el-table-column
                          label="购买率"
                          :formatter="formatter">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
	</div>
</template>

<style></style>

<script>
	import Header  from '../../components/Header.vue';
    import Sidebar from '../../components/Sidebar.vue';

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
            const products = jsonData.products || [];
            return {
                products
            };
        },
    	components: {
    		'admin-header' : Header,
            'admin-sidebar': Sidebar
    	},
        methods: {
            formatter(row, column) {
                return getNum(row.buyCount / row.browseCount * 100) + '%';
            }
        }
    }
</script>