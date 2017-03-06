// interface.js
// ==============================================

var jsKit = require('jsKit');
var util = require('./util');

var Interface = (function () {

  //构建一个Interface类,继承自基础类
  util.Klass().sub(Interface);

  //构造函数
  function Interface() {
    /**
     * 映射客户端类的名称 <strong>(必选)</strong>
     * @property nativeCls
     * @type string
     * @since 1.0.0
     * @default "channelModule"
     * @public
     */

    /**
     * jsBridgeClient通信对象 <strong>(必选)</strong>
     * @property jsbc
     * @type string
     * @since 1.0.0
     * @default jsBridgeClient
     * @public
     */

    /**
     * 模块信息描述 <strong>(可选)</strong>
     * @property name
     * @type string
     * @since 1.0.0
     * @public
     */

    /**
     * 模块版本 <strong>(可选)</strong>
     * @property verison
     * @type int
     * @since 1.0.0
     * @public
     */

    /**
     * 模块作者 <strong>(可选)</strong>
     * @property author
     * @type string
     * @since 1.0.0
     * @public
     */

    Interface.__super__.constructor.apply(this, arguments);
  }


  return Interface;
})();

if (typeof(channelModule)=="undefined") {
  var channelModule={};
  //console.log('I am H5ClientApp');
}

channelModule.start = (new Interface({
  name: "newssdk interface",
  author: "newsh5app",
  version: "2.0",
  jsbc: jsBridgeClient,
  nativeCls: "channelModule"
})).start;


module.exports = channelModule;
