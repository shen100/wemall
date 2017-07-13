# 微商城

## 项目截图
### 微信小程序
<img src="http://res.cloudinary.com/dcemaqxcp/image/upload/c_scale,q_40,w_640/v1495726849/D55DF2778A92A721C4B5A509AE7ACD96_lkz2g8.jpg" width="320" alt=""/>

## 项目环境搭建
* **克隆代码**

```
git clone https://github.com/shen100/wemall.git
``` 

* **修改配置文件**  
进入wemall目录，将`configuration.dev.json`改名为`configuration.json`, 再找到`UploadImgDir`，填写图片上传目录为 `{项目目录}/upload/img`, 举例：C:\dev\src\wemall\upload\img (Windows系统）或 /dev/src/wemall/upload/img (Mac OS X 或Linux系统)
  
```
{
  "go": {
    "UploadImgDir": "" /*图片上传的目录*/
  }
}
```  

* **配置nginx**  
将`wemall/nginx/dev.wemall.com.conf`文件拷贝到nginx的虚拟主机目录下, 再将`wemall/nginx/server.key`和`wemall/nginx/server.crt`拷贝到某个目录下，然后修改nginx的虚拟主机目录下的`dev.wemall.com.conf`文件中`server.key`和`server.crt`的路径  

* **配置hosts**    
127.0.0.1 dev.wemall.com  
 
* **创建数据库**  
先创建数据库如`wemall`，再use wemall，然后导入`wemall/sql/wemall.sql` 
>注意: 本地开发模式下，数据库是`wemall`，用户是`root`，密码是`test1234`  
>可以通过`wemall/configuration.json`配置文件进行修改  

* **安装node.js第三方模块**  
进入`wemall/nodejs`目录，运行命令
  
```
npm install
``` 

如果安装失败，或速度慢，可尝试阿里的镜像

```
npm install --registry=https://registry.npm.taobao.org
```

* **启动node.js程序**  
进入`wemall/nodejs`目录，运行命令

```
npm start
```

再开一个新的命令行窗口， 运行命令

```
npm run staticServ
```

* **运行go程序**  
进入`wemall`目录，`将configuration.dev.json`改名`为configuration.json`, 运行

```
go run main.go
```

* **运行微信小程序**   
进入`wemall/weixin`目录，`将config.dev.js`改名`为config.js`, 然后通过`微信web开发者工具`来运行小程序  

* **访问网站后台**  
在浏览器地址栏中输入https://dev.wemall.com/admin  

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
* web框架: iris
* 路由: httprouter
* 持久层框架: gorm
* 数据库: mysql 

### go依赖的第三方库

| 库 | 说明              |
|:---------|:-----------------------|
| gopkg.in/kataras/iris.v6   | iris web框架   |
| github.com/jinzhu/gorm     | gorm 持久层框架 |
| github.com/satori/go.uuid  | uuid生成工具    |

## 项目结构
| 目录或文件 | 说明     |  
|:---------|:-------:|
| docs     |  文档|
| config                 |  配置|
| controller             |  控制器|
| model                  |  数据模型|
| utils                  |  实用工具|
| nginx    |  nginx配置及证书|
| nodejs   |  前端项目目录|
| sql      |  sql文件目录|
| weixin   | 微信小程序项目目录 |
| configuration.dev.json  | 项目配置文件 |
| main.go  | go主程序入口|

## 技术交流  
qq群: 32550512  

## 最后
求star，star就是继续下去的动力  

## License
[GPL](https://github.com/shen100/wemall/blob/master/LICENSE "")      
Copyright (c) 2013-present, shen100