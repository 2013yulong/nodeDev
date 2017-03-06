## 目录
- [通用规则](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#%E9%80%9A%E7%94%A8%E8%A7%84%E5%88%99)
- [通用编码格式](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#%E9%80%9A%E7%94%A8%E7%BC%96%E7%A0%81%E6%A0%BC%E5%BC%8F)
- [通用元数据规则](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#%E9%80%9A%E7%94%A8%E5%85%83%E6%95%B0%E6%8D%AE%E8%A7%84%E5%88%99)
- [HTML 编码规则](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#html-%E7%BC%96%E7%A0%81%E8%A7%84%E5%88%99)
- [HTML 代码格式规则](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#html-%E4%BB%A3%E7%A0%81%E6%A0%BC%E5%BC%8F%E8%A7%84%E5%88%99)
- [CSS 编码规则](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#css-%E7%BC%96%E7%A0%81%E8%A7%84%E5%88%99)
- [CSS 代码格式风格](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#css-%E4%BB%A3%E7%A0%81%E6%A0%BC%E5%BC%8F%E9%A3%8E%E6%A0%BC)
- [CSS 元数据规则](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#css-%E5%85%83%E6%95%B0%E6%8D%AE%E8%A7%84%E5%88%99)
- [参考链接](https://github.com/allmobilize/issues/wiki/AM-HTML-&-CSS-Style-Guide#%E5%8F%82%E8%80%83%E9%93%BE%E6%8E%A5)

---

## 通用规则

### 协议

**省略外链资源协议**

省略外链资源（样式表、脚本、图片及其它媒体资源）URL协议部分（http/https）。其它协议的URL则不省略。

省略协议声明，使URL成为相对地址，防止 [mixed content](https://developer.mozilla.org/en-US/docs/Security/MixedContent) 问题，减少文件字节数。

```javascript
<!-- Recommended -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```

```javascript
<!-- Not recommended -->
<script src="http://www.google.com/js/gweb/analytics/autotrack.js"></script>
```

```css
/* Recommended */
.example {
  background: url(//www.google.com/images/example);
}
```

```css
/* Not recommended */
.example {
  background: url(http://www.google.com/images/example);
}
```

**在同一网站中，推荐使用相对路径链接资源，避免使用层级过深的文件夹，以提高文件查找效率、缩减文件体积**。

---

## 通用编码格式

### 缩进

HTML（包括模板文件） 和 CSS（包括Less等扩展语言）中缩进**两个**空格。

**不要**使用 `Tab` 或者 `Tab`、空格混搭。

```html
<ul>
  <li>Fantastic</li>
  <li>Great</li>
</ul>
```

```css
.example {
  color: blue;
}
```

### 字母大小写
一律使用小写字母。

```html
<!-- Recommended -->
<img src="google.png" alt="Google">

<!-- Not recommended -->
<A HREF="/">Home</A>
```

```css
/* Recommended */
color: #e5e5e5;

/* Not recommended */
color: #E5E5E5;
```

### 删除行尾空格。
行尾空格没有存在必要。

---

## 通用元数据规则

### 文件编码

**使用不带 BOM 的 UTF-8 编码。**

- 在 HTML中指定编码 `<meta charset="utf-8">`；
- 无需指定样式表的编码，它默认为UTF-8；
- 引用外部文件时 `<script charset="">` 标签应指明外链文件编码，以避免不同编码文件混合使用时页面乱码。

### 注释
**根据需要尽可能解释代码。**

用注释来解释代码：它包括什么，它的目的是什么，它能做什么，为什么使用这个解决方案，还是说只是因为偏爱如此呢？

（本规则可选，没必要每份代码都描述的很充分，它会增重HTML和CSS的代码。这取决于该项目的复杂程度。）

### 未完成条目

**用 `TODO` 标记待办事项和活动的条目。**

- 只用 TODO 来强调代办事项， 不要用其他的常见格式，例如 @@ 。
- 附加联系人（用户名或电子邮件列表），用括号括起来，例如 `TODO(contact)` 。
- 可在冒号之后附加活动条目说明等信息，例如 `TODO: 活动条目说明` 。

```html
<!-- TODO(john.doe): revisit centering -->
<center>Test</center>

<!-- TODO: remove optional tags -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```
---

## HTML 编码规则

### 文档类型（DTD）

**请使用 HTML5**：`<!DOCTYPE html>` 。

### HTML 有效性
编写有效的 HTML 代码，能通过[代码校验工具](http://validator.w3.org/nu/)验证。使用符合 HTML5 规范的标签，不允许使用废弃的标签，如 `<font>`、`<center>`等。

- [HTML5 新增标签及废弃标签列表](http://www.w3schools.com/tags/default.asp)
- [HTML5 element list](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list)

```html
<!-- Recommended -->
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test</title>
<article>This is only a test.</article>

<!-- Not recommended -->
<title>Test</title>
<article>This is only a test.\
```

### 语义化

- 根据 HTML 各元素设计的用途使用他们。这事关可访性、重用以及代码效率，例如 `h1-h6`用于标题，`<p>` 用于段落，`<a>`用于链接。
- 使用 HTML5 语义化标签。

```html
<!-- Not recommended -->
<div onclick="goToRecommendations();">All recommendations</div>

<!-- Recommended -->
<a href="recommendations/">All recommendations</a>
```

### 多媒体内容后备方案

**为多媒体提供备选内容**。
- 图片添加 `alt` 属性；视频、音频添加标题和文案说明。
- 备选内容是保障可访性的重要途径。
- 无法立即在CSS里设置的纯装饰图片将 `alt` 属性设置为空：`alt=""`。

```html
<!-- Recommended -->
<img src="spreadsheet.png" alt="Spreadsheet screenshot." />

<!-- Not recommended -->
<img src="spreadsheet.png" />
```

### 关注分离：结构、表现、行为分离。

严格保持结构 （标记），表现 （样式），和行为 （脚本）分离, 并尽量让三者之间的交互保持在最低限度。

- 确保文档和模板只包含HTML结构， 所有表现都放到样式表里，所有行为都放到脚本里。
- 尽量将脚本和样式合并到一个文件，减少外链。

关注分离对于可维护性至关重要，修改 HTML（结构）要比修改样式、脚本花费更多成本。

```html
<!-- Recommended -->
<!DOCTYPE html>
<title>My first CSS-only redesign</title>
<link rel="stylesheet" href="default.css">
<h1>My first CSS-only redesign</h1>
<p>I’ve read about this on a few sites but today I’m actually
  doing it: separating concerns and avoiding anything in the HTML of
  my website that is presentational.</p>
<p>It’s awesome!</p>

<!-- Not recommended -->
<!DOCTYPE html>
<title>HTML sucks</title>
<link rel="stylesheet" href="base.css" media="screen">
<link rel="stylesheet" href="grid.css" media="screen">
<link rel="stylesheet" href="print.css" media="print">
<h1 style="font-size: 1em;">HTML sucks</h1>
<p>I’ve read about this on a few sites but now I’m sure:
  <u>HTML is stupid!!1</u>
<center>I can’t believe there’s no way to control the styling of
  my website without doing everything all over again!</center>
```

### HTML 实体引用

**不要用 HTML 实体引用。**

使用 UTF-8 作为文件编码时，不需要使用HTML实体引用，如`&mdash;`、 `&rdquo;`、`&#x263a;`。

在 HTML 文档中具有特殊含义的字符（如 `<` 和 `&`）例外，控制或不可见字符也例外（如不换行空格）。

```html
<!-- Recommended -->
The currency symbol for the Euro is “€”.

<!-- Not recommended -->
The currency symbol for the Euro is &ldquo;&eur;&rdquo;.
```

### 保留可选标签，保持结构完整性

[HTML5 规范](http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#syntax-tag-omission)定义了一些标签可以省略，以保持代码简洁性。但云适配内部要求保持结构的完整，不省略可省标签，闭合所有元素，以避免不同浏览器环境下不可预知的问题出现。

```html
<!-- Recommended -->
<!DOCTYPE html>
<html>
  <head>
    <title>Spending money, spending bytes</title>
  </head>
  <body>
    <p>Sic.</p>
    <img src="xxx.jpg" alt="xxx" />
  </body>
</html>

<!-- Not Recommended -->
<!DOCTYPE html>
<title>Saving money, saving bytes</title>
<p>Qed.
<img src="xxx" />
```

### `type` 属性
**省略样式表和脚本的 `type` 属性。**

使用css的样式表、使用 JavaScript 的脚本都不需要添加 `type` 属性。HTML5 默认按照 `text/css` 及 `text/javascript` 解析，兼容较老的浏览器。

```html
<!-- Recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">

<!-- Not recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css"
  type="text/css">
```

```html
<!-- Recommended -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
<!-- Not recommended -->

<script src="//www.google.com/js/gweb/analytics/autotrack.js"
  type="text/javascript"></script>
```

---

## HTML 代码格式规则

### 通用格式
**每个块级、列表、表格元素单独占一行，每个子元素都相对父元素缩进。**

```html
<blockquote>
  <p><em>Space</em>, the final frontier.</p>
</blockquote>

<ul>
  <li>Moe</li>
  <li>Larry</li>
  <li>Curly</li>
</ul>

<table>
  <thead>
    <tr>
      <th scope="col">Income</th>
      <th scope="col">Taxes</th>
  </thead>
  <tbody>
    <tr>
      <td>$ 5.00</td>
      <td>$ 4.50</td>
  </tbody>
</table>
```

**纯文本在 HTML 标签结束之前不要换行**。

### HTML 属性值使用双引号

```html
<!-- Not recommended -->
<a class='maia-button maia-button-secondary'>Sign in</a>

<!-- Recommended -->
<a class="maia-button maia-button-secondary">Sign in</a>
```
---

## CSS 编码规则

### CSS 代码有效性。
**尽量使用有效的CSS代码**，最终的结果应该能通过 CSS 校验器校验。

### ID、Class 命名

`TODO： 添加更多命名示例。`

**ID、Class 使用语义化、通用的命名方式。**

- 应该从ID和class的名字上就能看出这元素是干嘛用的（角色、功能、状态），而不是表象（颜色、位置等）或模糊不清的命名。
- 表明、反映元素作用的名字易于理解，而且修改的可能性小。
- 对与同级元素相比没有特殊的意义的元素使用通用的命名。
- 使用功能性或通用的名字可以减少不必要的文件修改。

```css
/* Recommended: specific */
#gallery {}
#login {}
.video {}

/* Recommended: generic */
.aux {}
.alt {}


/* Not recommended: meaningless */
#yee-1901 {}

/* Not recommended: presentational */
.button-green {}
.clear {}
```

### ID、Class 命名风格

**ID和class的名称应尽量简短**，但应注意保留可读、可辨识性。**

```css
/* Recommended */
#nav {} /* 简洁、可辨识的简写 */
.author {} /* 本身比较短，可辨识 */

/* Not recommended */
#navigation {} /* 太长，可以精简 */
.atr {} /* 不可读，无法辨识 */
```

### 避免元素选择器和ID、Class叠加使用

出于[性能考量](http://www.stevesouders.com/blog/2009/06/18/simplifying-css-selectors/)，在没有必要的情况下避免元素选择器叠加ID、Class 使用。

元素选择器和ID、Class混合使用也违反 **关注分离**原则。如果HTML标签修改了，就要再去修改CSS代码，不利于后期维护。

```css
/* Recommended */
#example {}
.error {}

/* Not recommended */
ul#example {}
div.error {}
```

### 使用属性缩写

使用缩写可以提高代码执行效率和易读性。

```css
/* Recommended */
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;

/* Not recommended */
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;
```

### 属性值为 `0` 时省略单位

```css
margin: 0;
padding: 0;
```

### 省略小数点前面的 `0`

```css
font-size: .8rem;
```

### 使用 `rem` 作为字号、长度单位
使用`px`对可防性会造成一定的问题，`em`则随着上下文不断变化，计算较为繁杂。

推荐使用 `rem`，更多细节参见:
- [AM UI 文档](http://docs.yunshipei.com/ui/docs/base)
- [Font sizing with rem](http://snook.ca/archives/html_and_css/font-size-with-rem)

当然，需要 `1px` 级别精准定位的，仍然使用 `px`。

### 简写可简写的十六进制颜色值

```css
/* Recommended */
color: #ebc;

/* Not recommended */
color: #eebbcc;
```

### 根据项目在ID、Class前面加上特定前缀（命名空间）

命名空间可以防止命名冲突，方便维护（查找和替换）。

```css
.adw-help {} /* AdWords */
#maia-note {} /* Maia */
```

### 使用连字符 `-` 作为ID、Class 名称界定符

CSS 中不要驼峰命名法和下划线。

```css
/* Recommended */
#video-id {}
.ads-sample {}

/* Not recommended: does not separate the words “demo” and “image” */
.demoimage {}

/* Not recommended: uses underscore instead of hyphen */
.error_status {}
```
### 尽量避免 Hacks

移动开发针对 IE9 及以上浏览器，移除针对 IE9 以前版本的 Hack。

---

## CSS 代码格式规则

### 属性声明顺序

推荐的样式编写顺序：

1. 显示属性 `display/list-style/position/float/clear`
2. 自身属性（盒模型）`width/height/margin/padding/border`
3. 背景 `background`
4. 行高 `line-height`
5. 文本属性 `color/font/text-decoration/text-align/text-indent/vertical-align/white-space/content`
6. 其他 `cursor/z-index`
7. CSS3属性 `transform/transition/animation/box-shadow/border-radius`

**链接的样式请严格按照如下顺序添加：**
`a:link -> a:visited -> a:hover -> a:active（LoVeHAte）`

大概的顺序如下，基本上前面是布局等涉及到和其他元素关系的，后面是颜色字号等内部样式。

参考：[Mozilla官方推荐CSS书写顺序](http://www.mozilla.org/css/base/content.css) 布局 - 具体元素样式

### 代码块缩进

在花括号（`{}`）之间缩进声明代码。

```css
@media screen, projection {

  html {
    background: #fff;
    color: #444;
  }

}
```

### 声明的最后一行仍然添加分号

代码压缩由部署工具完成，编写源代码时应该保持每一行代码的完整性。

```css
/* Recommended */
.test {
  display: block;
  height: 100px;
}

/* Not recommended */
.test {
  display: block;
  height: 100px /* 这一行没有分号 */
}
```

### 属性名和值之间（冒号后面）用一个空格分隔

这样可以提高代码的可读性。

```css
/* Recommended */
h3 {
  font-weight: bold;
}

/* Not recommended */
h3 {
  font-weight:bold; /* 冒号和值之间没有空格 */
}
```

### 声明块分隔

最后一个选择器和起始花括号在一行，并用一个空格分割。

```css
/* Recommended */
#video {
  margin-top: 1em;
}

/* Not recommended: missing space */
#video{ /* 选择器和花括号中间没有空格 */
  margin-top: 1em;
}

/* Not recommended: unnecessary line break */
#video
{ /* 最后一个选择器和花括号之间换行了 */
  margin-top: 1em;
}
```

### 每个选择符、声明都单独成行

```css
/* Recommended */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}

a:focus,
a:active {
  position: relative;
  top: 1px;
}

/* Not recommended */
a:focus, a:active {
  position: relative; top: 1px;
}
```

### 规则之间使用一空行分隔
```css
html {
  background: #fff;
}

body {
  margin: auto;
  width: 50%;
}
```

### 引号使用

`url()` 不添加引号。属性选择符、属性值使用单引号。

```css
/* Not recommended */
@import url("//www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}

/* Recommended */
@import url(//www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
```

### 字体名称

字体名称请映射成对应的英文名，例如：黑体(SimHei) 、宋体(SimSun) 、微软雅黑(Microsoft Yahei)。

**如果字体名称中有空格，则必须加单引号**。

AM UI base 中定义了三种字体系列，对特定元素都进行了定义，如无特殊需要（自定义字体、font icon），无需再声明 `font-family`。

```
@font-family-sans-serif:  "Helvetica Neue", FreeSans, Arimo, "Droid Sans","Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
@font-family-serif: Georgia, "Times New Roman", Times, serif;
@font-family-monospace: Monaco, Menlo, Consolas, "Courier New", monospace;
```
---

## CSS 元数据规则

### 按组编写注释。
组与组之间空两行；组与组注释之间空一行。

```css
/* Header */

#adw-header {}


/* Footer */

#adw-footer {}


/* Gallery */

.adw-gallery {}
```

## 参考链接

- http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
- http://css-tricks.com/css-style-guides/
- http://24ways.org/2011/front-end-style-guides/
- https://github.com/styleguide/css
- Mozilla官方推荐CSS书写顺序 - http://www.mozilla.org/css/base/content.css
- [Use efficient CSS selectors](https://developers.google.com/speed/docs/best-practices/rendering#UseEfficientCSSSelectors)
- [Writing efficient CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)
