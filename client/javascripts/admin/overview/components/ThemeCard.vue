<template>
	<div class="theme-card-container">
		<div class="theme-card-inner">
			<div class="theme-card-inner-num">{{cardNum}}</div>
			<div class="theme-card-inner-title">{{cardTitle}}</div>
		</div>
		<img :src="imageUrl" class="theme-card-icon"></img>
		<a :href="linkUrl" class="theme-card-link">
			<span class="theme-card-link-label">更多详情<i class="el-icon-caret-right"></i></span>
		</a>
	</div>
</template>

<script>
	export default {
		name: 'ThemeCard',
		props: {
			cardNum: {
				type: Number,
				default: 0
			},
			cardTitle: {
				type: String,
				default: ''
			},
			imageUrl: {
				type: String,
				default: ''
			},
			linkUrl: {
				type: String,
				default: '#'
			}
		}
	}
</script>

<style>
	.theme-card-container {
		height: 130px;
    	width: 24%;
    	min-width: 220px;
    	margin-right: 10px;
		position: relative;
		background-color: #e7edf7;
		border-radius: 10px;
		color: #1296db;
		-webkit-transition: all .3s linear;
		-o-transition: all .3s linear;
		transition: all .3s linear;
	}
	.theme-card-container:hover .theme-card-link {
		height: 35px;
		line-height: 35px;
	}
	.theme-card-container:hover .theme-card-icon {
		height: 70px;
		width: 70px;
		top: 10px;
	}
	.theme-card-container:hover .theme-card-inner {
		margin-left: 10px;
	}
	.theme-card-container .theme-card-icon {
		width: 60px; 
		height: 60px;
		position: absolute;
		right: 10px;
    	top: 20px;
    	-webkit-transition: all .3s linear;
		-o-transition: all .3s linear;
		transition: all .3s linear;
	}
	.theme-card-inner {
		margin-top: 10px;
		padding: 10px;
		-webkit-transition: all .3s linear;
		-o-transition: all .3s linear;
		transition: all .3s linear;
	}
	.theme-card-inner-num {
		font-weight: bold;
		font-size: 30px;
	}
	.theme-card-inner-title {
		font-weight: bold;
		font-size: 18px;
	}
	.theme-card-link {
		background-color: rgba(33,33,33,0.5);
		height: 30px;
		text-align: center;
		display: block;
		text-decoration: none;
		line-height: 30px;
		border-bottom-right-radius: 10px;
	    border-bottom-left-radius: 10px;
	    position: absolute;
	    bottom: 0;
	    width: 100%;
	    -webkit-transition: all .3s linear;
		-o-transition: all .3s linear;
		transition: all .3s linear;
	}
	.theme-card-link-label {
		font-size: 14px;
		color: #fff;
	}	
</style>