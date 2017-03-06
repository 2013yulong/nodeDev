### History.md
---

### 这是一个SHFramework V1.0 的javascript前端项目模板 ###

### 本工程提供一个项目模板，可减轻开发环境搭建工作和新闻客户端的前端模块功能划分。###

#### 该模块包含如下内容：####
>1. 使用zepto underscore jquery atrtemplate等框架
>1. 使用bridgeLib 用于配合SHFramework的初始化和通信
>1. 使用requirejs amd模块加载器
>1. 使用gulp构建系统
>1. 展示了页面切分和逻辑模块划分（html、css、js），及如何根据实际切换模块。适用团队分工合作
>1. 支持两种应用场景，浏览器，移动app
>1. 支持生产环境，即可将js合并压缩成单个js文件，优化css文件，优化html文件
>1. 后期会逐步引入页面路由技术，页面转换的有限状态机应用等。

## 目录说明 ##

~~~
├── html -------------------- SHFramework 的开发目录
│   ├── attach -------------------- shframework 用于注入的 js 脚本目录，放置客户端需要注入的功能脚本
│   │   └── js
│   │       └── bridgeLib.js
│   ├── bridgeLib.js -------------------- shframework 使用的js基础库，包含 H5 和 native 的连接通信初始化，接口调用模块等
│   ├── manifest -------------------- 项目模块配置信息,包含依赖客户端版本,当前模块版本等,便于升级使用
│   ├── build --------------------  前端项目构建AMD的命令配置模块，基于 r.js，可以分析 js 模块之间的依赖关系
│   │   ├── build.js
│   │   ├── r.js
│   │   ├── run.js
│   │   └── run.sh
│   ├── css -------------------- 前端项目开发中需要用到的css模块，可以拆分成初始化css，页面css和组件css，工程中支持用require.css动态加载
│   │   ├── channel.css
│   │   ├── normalize.css
│   │   └── plugin.css
│   ├── gulpfile.js -------------------- gulp构建工具配置文件
│   ├── gulp.sh -------------------- gulp构建命令调用脚本，可以调用特定的构建命令
│   ├── images --------------------  前端项目开发中需要用到的图片资源
│   │   └── loading.gif
│   ├── modules
│   │   ├── channel  ---- 模块包名，如channel/search等。放置模块的js、html、less等文件
│   │   │   ├── channel.js ---- 模块配置，index.html对应的script引入的入口文件，通常用于配置加载器所需要的资源路径和初始化方法（使用r.js压缩合并后，modules里对应的模块包里的资源会合并到这个里面）
│   │   │   ├── channelDo.js --- 模块功能初始化入口，需要包含一个和模块名+Do方法的模块，作为初始化方法模块（类似java里的main方法）
│   │   │   └── channel.html --- 前端项目开发中需要的模块主入口页面
│   │   ├── article ------------------ 正文内容页
│   │   │   ├── articleDo.js
│   │   │   ├── article.html
│   │   │   ├── article.js
│   │   │   └── video.js
│   │   ├── channelList ------------------ 搜索频道列表页
│   │   │   ├── channelListDo.js
│   │   │   ├── channelList.html
│   │   │   └── channelList.js
│   │   ├── helper ------------------ 通用函数库&接口库
│   │   │   ├── interface.js ----新闻客户端通用接口模块
│   │   │   ├── newslite.js ----newssdk独有接口模块
│   │   │   ├── searchApi.js ----搜索相关接口模块
│   │   │   └── util.js---- 工具库函数
│   │   ├── home --- 首页
│   │   │   ├── homeDo.js
│   │   │   ├── home.html
│   │   │   └── home.js
│   │   ├── live ------------------ 直播预览页
│   │   │   ├── liveDo.js
│   │   │   ├── live.html
│   │   │   └── live.js
│   │   ├── liveonline ------------------ 在线直播页面(只够建liveonline.js)
│   │   │   ├── liveonlineDo.js
│   │   │   ├── liveonline.html
│   │   │   └── liveonline.js
│   │   ├── media ---------------------- 媒体刊物页
│   │   │   ├── mediaDo.js
│   │   │   ├── media.html
│   │   │   └── media.js
│   │   ├── newsList ------------------ 新闻列页(一般频道,不含美图/奇趣,直播)
│   │   │   ├── newsListDo.js
│   │   │   ├── newsList.html
│   │   │   └── newsList.js
│   │   ├── newsLive --- 直播列页
│   │   │   ├── newsLiveDo.js
│   │   │   ├── newsLive.html
│   │   │   └── newsLive.js
│   │   ├── newsPics ------------------ 美图/奇趣列页
│   │   │   ├── newsPicsDo.js
│   │   │   ├── newsPics.html
│   │   │   └── newsPics.js
│   │   ├── pics ------------------ 美图/奇趣预览页
│   │   │   ├── picsDo.js
│   │   │   ├── pics.html
│   │   │   └── pics.js
│   │   ├── search ------------------ 搜索结果页
│   │   │   ├── searchDo.js
│   │   │   ├── search.html
│   │   │   └── search.js
│   │   └── special ------------------ 专题页
│   │       ├── specialDo.js
│   │       ├── special.html
│   │       └── special.js
│   ├── package.json -------------------- gulp构建工具需要加载的资源依赖包
│   └── vendor  ---- SHframework需要调用的lib库根目录
│       ├── api  ---- SHframework提供的api和设备调用功能（设备信息，网络通信，原生UI等）
│       │   ├── device
│       │   │   └── platform.js
│       │   ├── nativeUI
│       │   │   └── widget.js
│       │   └── util
│       ├── core  ---- SHframework的js模块加载器
│       │   └── SHFLoader.js
│       ├── lib  ---- 第三方库js库
│       │   ├── jquery.lazyload.js
│       │   ├── template.js
│       │   ├── underscore.js
│       │   └── zepto.min.js
│       └── plugin  ---- requriejs加载器插件
│           ├── almond.js
│           ├── css-builder.js
│           ├── domReady.js
│           ├── normalize.js
│           ├── require.css.js
│           └── require.text.js
├── README.md  ---- 模块使用说明的markdown
├── target  ---- 构建输出目录
└── test  ---- 单元测试用例目录
~~~

## 项目构建 ##
step 1. sh gulp.sh rjs (进行amd模块合并)
step 2. sh gulp.sh rmin (进行html模板标签替换)
step 3. sh gulp.sh zip  (进行打包并加上时间戳)
step 4. sh gulp.sh send (发送到django服务)

## 项目联调 ##
1. 启用charles
2. 手机代理设置 并连接 adb connect 10.0.117.112
3. 启动服务。=线上：sh gulp.sh onilne
            =测试：sh gulp.sh server
4. chrome-inspector

## newsType和templateType对应关系 ##
http://smc.sohuno.com/wiki/pages/viewpage.action?pageId=8030444

## 搜狐视频播放器SDK ##
http://t.m.tv.sohu.com/mb/foxplayer/playerApi/playerApi.html

## js和native通信接口文档 ##
http://10.0.119.144/h5/shfdoc/output/index.html
