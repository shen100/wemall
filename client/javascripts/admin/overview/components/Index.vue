<template>
    <div id="app">
        <admin-header/>
        <div class="wemall-admin-body">
            <admin-sidebar/>
            <div class="wemall-admin-content">
                <div class="wemall-page-card-container">
                    <admin-card
                        v-for="item in cardItems"
                        :cardTitle="item.cardTitle"
                        :cardNum="item.cardNum"
                        :imageUrl="item.imageUrl"
                    />
                </div>
                <div class="wemall-admin-info">
                    <p class="wemall-admin-info-title">系统公告</p>
                    <p class="wemall-admin-info-content">暂无消息</p>
                </div>
                <div class="wemall-admin-info">
                    <p class="wemall-admin-info-title">系统信息</p>
                    <p class="wemall-admin-info-content">
                        <span class="wemall-admin-info-item">程序名程：</span>
                        <span>{{wemall.name}}</span>
                    </p>
                    <p class="wemall-admin-info-content">
                        <span class="wemall-admin-info-item">当前版本：</span>
                        <span>{{wemall.version}}</span>
                    </p>
                    <p class="wemall-admin-info-content">
                        <span class="wemall-admin-info-item">最新版本：</span>
                        <span>{{wemall.latestVer}}</span>
                    </p>
                    <p class="wemall-admin-info-content">
                        <span class="wemall-admin-info-item">官方网址：</span>
                        <span>{{wemall.officialUrl}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .wemall-page-card-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
</style>

<script>
    import Header     from '../../components/Header.vue';
    import Sidebar    from '../../components/Sidebar.vue';
    import ThemeCard  from './ThemeCard.vue';

    export default {
        data() {
            let wemall = jsonData.wemall || {};
            return {
                cardItems: [
                    {
                        cardTitle: '今日订单',
                        cardNum  : jsonData.todayOrder,
                        imageUrl : '/images/cart.png'
                    }, {
                        cardTitle: '今日销售额',
                        cardNum  : jsonData.todaySale,
                        imageUrl : '/images/dollar.png'
                    }, {
                        cardTitle: '总用户数',
                        cardNum  : jsonData.totalOrder,
                        imageUrl : '/images/account-filling.png'
                    }, {
                        cardTitle: '总订单数',
                        cardNum  : jsonData.totalSale,
                        imageUrl : '/images/trade.png'
                    }
                ],
                wemall: {
                    latestVer: wemall.latestVer || '',
                    name: wemall.name || '',
                    officialUrl: wemall.officialUrl || '',
                    version: wemall.version || ''
                }
            };
        },
        components: {
            'admin-header'  : Header,
            'admin-sidebar' : Sidebar,
            'admin-card'    : ThemeCard
        }
    }
</script>





