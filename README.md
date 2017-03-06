## news sdk
---

### 环境

```
- 首先确保你正确安装 Node.js ，运行下面的命令，确保 node 和 npm 的正确安装。
node -v
npm -v

- 然后在本项目根目录，安装本项目的依赖

npm install 或者使用 cnpm
- mac 下
sudo npm install

此过程可能需要经过漫长的等待...
```

### cmd 命令说明
```
$ npm start                 // 开发环境，运行时
$ npm run build             // 生产环境，压缩编译
$ npm run build:debug       // 生产环境，不压缩混淆，方便 debug
$ npm run build:browser     // 生产环境，浏览器端打包，替换一下 cdn 路径用于外链使用
$ npm run create            // 开发环境，生成新的页面，命令行有提示信息，自动添加 scss 模块和 js 模块的打包
```

#### 开发环境
```
终端输入
npm start
gulp 会进入自动监听和编译的状态...
随时注意终端的变化和错误的提示。
```

#### 生产环境
```
终端输入
npm run build
```

### 目录文件说明

```
├── app   									 整体项目入口
├── dist										 部署文件
├── newssdk-h5.zip					 部署文件压缩包
├── gulpfile.babel.js				 自动构建文件
├── node_modules						 NodeJs modules
├── package.json						 NodeJs 依赖 JSON
├── webpack								   webpack 配置文件
├── .editorconfig 					 编辑器配置插件
├── .eslintrc 							 eslint.js 代码质量和检查工具配置
├── .eslintignore 					 eslint.js 忽略配置
├── HISTORY.md               历史修改记录
├── README.md								 说明文档
└── .gitignore 					 		 git 忽略配置
```

### app 目录说明

```
.app/
├── .build									 临时构建目录
├── scss										 scss 目录
├── images									 图片资源
├── js											 JS 资源
└── modules                  页面modules
```

### 优化

#### CSS

- 使用 less / sass 预编译器处理，postcss 后处理器处理
- 图片压缩
- icon 自动合并 CSS Sprite, 或者考虑使用 font-icon

#### JS

- JS 使用 webpack UMD 格式打包
- JS 模板引擎，目前是 artTemplate, 后期可以使用 react 或者 vue
- Promise

## 资料
- http://codeguide.bootcss.com/
- http://alloyteam.github.io/Spirit/modules/Standard/index.html

### 可能会新增的 lib
- https://modernizr.com/
- http://hammerjs.github.io/
- http://iscrolljs.com/

#### UI 框架
- http://amazeui.org
- http://gmu.baidu.com/
- http://frozenui.github.io/
- http://75team.github.io/novaUI/
- http://hotelued.qunar.com/oniui/index.html#!/widgets
- https://github.com/thoughtbit/it-note/issues/20
- http://m.sui.taobao.org/components/

#### 优化
- 剔除目前 NewsSDK 中冗余 CSS
- 减少首屏渲染时间
- 考虑图片使用 webp 格式 http://www.uisdc.com/image-format-webp-introduction
- 通用组件
- 图片懒加载
- http://cn.vuejs.org/

### 私有 meta 标签设置
- https://www.janecc.com/uc-qq-brower-meta.html

### 修改代码
- 不要让业务代码乱了心扉
- 端外短链接适配
- 通用的提取 URL 参数
