<template>
	<div class="wemall-admin-sidebar">
		<el-menu @select="onSelect" :default-active="defaultMenuItemId">
			<el-submenu v-for="item in menu" :index="item.id" :title="item.title">
				<template slot="title">{{item.title}}</template>
				<el-menu-item v-for="menuItem in item.children" :index="menuItem.id">{{menuItem.title}}</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<style>
	.wemall-admin-sidebar {
		width: 220px;
        float: left;	
	}
</style>

<script>
	var idIncrement = 0;

	function getId() {
		return '' + (idIncrement++);
	}

	export default {
        data() {
            return {
            	defaultMenuItemId: '1',
            	menu: [
            		{
            			id    : getId(),
            			title : '平台概况',
            			children: [
            				{
            					id    : getId(),
            					title : '系统首页',
            					url   : '/admin'	
            				},
            				{
            					id    : getId(),
            					title : '用户分析',
            					url   : '/admin/overview/user/analyze'	
            				},
            				{
            					id    : getId(),
            					title : '订单分析',
            					url   : '/admin/overview/order/analyze'	
            				},
            				{
            					id    : getId(),
            					title : '商品分析',
            					url   : '/admin/overview/product/analyze'	
            				}
            			]
            		},
            		{
            			id    : getId(),
            			title : '系统设置',
            			children: [
            				{
            					id    : getId(),
            					title : '商城设置'	
            				},
            				{
            					id    : getId(),
            					title : '地址设置'	
            				},
            				{
            					id    : getId(),
            					title : '微信设置'	
            				},
            				{
            					id    : getId(),
            					title : '微信打印机设置'	
            				},
            				{
            					id    : getId(),
            					title : '短信验证设置'	
            				}
            			]
            		}
            	],
            	menuMap: {}
            };
        },
        mounted: function () {
        	for (var i = 0; i < this.menu.length; i++) {
        		var menuItem = this.menu[i];
        		for (var j = 0; j < menuItem.children.length; j++) {
        			var key = menuItem.children[j].id;
        			this.menuMap[key] = menuItem.children[j];
        		}
        	}
        },
        methods: {
        	onSelect(id) {
        		var data = this.menuMap[id];
        		location.href = data.url;
        	}
        }
    }
</script>