# 微商城

## 技术选型
### 前端
* web服务器: nginx
* 后台渲染: node.js
* M站框架集: vue, vuex, vue-router
* M站UI组件库: vux
* 后台管理框架集: react, redux, react-router-redux
* 后台管理UI组件库: antd
* 数据可视化: echarts
* 富文本编辑器: ueditor
* 打包工具: webpack
* 构建工具: gulp  

### 后台
* 框架: iris
* 模板引擎: handlebars
* 持久层: gorm
* 数据库: mysql  

## 项目环境搭建
1 **克隆代码**

```
git clone https://github.com/shen100/wemall.git
``` 

如果安装失败，或速度慢，可尝试阿里的镜像

```
npm install --registry=https://registry.npm.taobao.org
```

2 **配置nginx**  
将文件`dev.wemall.com.conf`拷贝到nginx的虚拟主机目录下  
>dev.wemall.com.conf所在位置为, wemall/nginx/dev.wemall.com.conf

3 **配置hosts**    
127.0.0.1 dev.wemall.com  
 
4 **创建数据库**  
先创建数据库如`wemall`，再use wemall，然后导入`wemall/sql/wemall.sql` 
>注意: 本地开发模式下，数据库是`wemall`，用户是`root`，密码是`test1234`  
>可以通过`wemall/configuration.json`配置文件进行修改  

5 **安装模块**  
进入`wemall/nodejs`目录，运行命令
  
```
npm install
``` 
  
6 **启动静态文件服务器**  
进入`wemall/nodejs`目录，运行命令

```
npm start
```

7 **运行go程序**  
进入`wemall`目录下，运行

```
go run main.go
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
|          | model        |  数据模型|
|          | utils        |  实用工具|
|          | views        |  后端视图|
| sql      |         |  sql文件目录|
| test     |         | 单元测试|
| main.go     |         | 后台程序入口|
| staticServ.js |         | 静态文件服务器(开发时使用)|
| webpack.config.js     |         | 开发模式下webapck的配置|
| webpack.config.prod.js     |         | 产品模式下webapck的配置|




