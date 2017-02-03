# 微信商城

## 技术选型
### 前端
* 前端框架: vue
* UI库: element-ui
* 数据可视化: echarts
* 富文本编辑器: ueditor
* 打包工具: webpack
* 构建工具: gulp

### 后端
* web服务器: nginx
* 后台: node.js
* 框架: express
* 模板引擎: handlebars
* 持久层: sequelize
* 数据库: mysql
* 第三方模块  

| 模块     | 功能     |  
|:--------|:-------:|  
| node-schedule  |     |  
| lodash |   |  
| nodemailer |   |  
| moment |   |  
| shelljs |   |  


## 项目环境搭建
1 克隆代码

```
git clone git@git.oschina.net:shen100/wemall.git
```

2 安装模块

```
npm install
```
如果安装失败，或速度慢，可尝试阿里的镜像

```
npm install --registry=https://registry.npm.taobao.org
```

3 配置nginx

将文件`local.zhifuted.conf`拷贝到nginx的配置文件目录下  
>local.zhifuted.conf所在位置为, 项目目录/nginx/local.zhifuted.conf
  
4 运行后台程序

```
npm start
```

5 启动静态服务器

```
npm run staticServ
```
## 前端开发规范
### 代码规范

### 样式规范

## 后端开发规范

## 测试

### 单元测试
mocha  
### 集成测试
phantomjs, casperjs  
### 功能测试

## 日志
log4js

## 部署
系统: centos  
容器: docker  
进程管理器: pm2
## 监控
