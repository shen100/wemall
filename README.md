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
* 持久层: bookshelf
* 数据库: mysql  

## 项目环境搭建
1 **克隆代码**

```
git clone git@git.oschina.net:shen100/wemall.git
```

2 **安装模块**

```
npm install
```
如果安装失败，或速度慢，可尝试阿里的镜像

```
npm install --registry=https://registry.npm.taobao.org
```

3 **配置nginx**  
将文件`local.zhifuted.conf`拷贝到nginx的虚拟主机目录下  
>local.zhifuted.conf所在位置为, 项目目录/nginx/local.zhifuted.conf

4 **创建数据库**  
先创建数据库如`wemall`，再use wemall，然后导入sql目录下的sql文件到数据库  
>注意: 本地开发模式下，数据库是`wemall`，用户是`root`，密码是`test1234`  
>可以在`.env`文件中进行修改
 
5 **运行后台程序**

```
npm start
```

6 **启动静态服务器**

```
npm run staticServ
```

## 项目结构
| 目录或文件     | 子目录     | 功能     |  
|:--------|:--------|:-------:|  
| client  |         |  前端静态目录|
|         | images        |  图片|
|         | javascripts   |  JS代码|
|         | styles        |  样式|
| docs    |         |  文档|
| nginx    |         |  nginx配置|
| server   |         |  后台代码目录|
|          | config        |  配置|
|          | controller        |  控制器|
|          | helpers        |  后端模板引擎的helper|
|          | model        |  数据模型|
|          | route        |  路由|
|          | utils        |  实用工具|
|          | views        |  后端视图|
| sql      |         |  sql文件目录|
| test     |         | 单元测试|
| .babelrc |         | 设置babel转码的规则和插件|
| .env |         | 本地开发使用的环境变量|
| app.js |         | 后台应用服务器入口|
| staticServ.js |         | 静态文件服务器(开发时使用)|
| webpack.config.dev.js     |         | 开发模式webapck的配置|
| webpack.config.prod.js     |         | 产品模式webapck的配置|




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
