# 微信商城

## 技术选型
### 前端
* 主站框架集: vue, vuex, vue-router
* 后台管理框架集: react, redux, react-router-redux
* 主站UI组件库: vux
* 后台管理UI组件库: antd
* 数据可视化: echarts
* 富文本编辑器: ueditor
* 打包工具: webpack
* 构建工具: gulp  

### 后台
* web服务器: nginx
* 静态文件服务器: node.js(本地开发时使用)
* 框架: iris
* 模板引擎: handlebars
* 持久层: gorm
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
将文件`dev.wemall.com.conf`拷贝到nginx的虚拟主机目录下  
>dev.wemall.com.conf所在位置为, 项目目录/nginx/dev.wemall.com.conf

4 **配置hosts**    
127.0.0.1 dev.wemall.com  
 
5 **创建数据库**  
先创建数据库如`wemall`，再use wemall，然后导入sql目录下的sql文件到数据库  
>注意: 本地开发模式下，数据库是`wemall`，用户是`root`，密码是`test1234`  
 
6 **启动静态文件服务器**  

```
npm start
```

7 **运行后台程序**  
进入项目目录下，运行`go run main.go`  

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
|          | model        |  数据模型|
|          | utils        |  实用工具|
|          | views        |  后端视图|
| sql      |         |  sql文件目录|
| test     |         | 单元测试|
| main.go     |         | 后台程序入口|
| staticServ.js |         | 静态文件服务器(开发时使用)|
| webpack.config.js     |         | 开发模式下webapck的配置|
| webpack.config.prod.js     |         | 产品模式下webapck的配置|




