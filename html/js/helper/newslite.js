// newslite.js
// ==================================

var util = require('./util');

var newsLiteAPI=(function(){

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

  Interface.include({
    /**
     * h5告知native数据更新结束
     * @method onRefreshComplete
     * @public
     * @param {String} channelid 频道id
     * @param {String} success 页面刷新状态: true - 成功 | false - 失败
     * @return {Null} none
     * @example
     * 	   interface.onRefreshComplete("true");
     * @since 1.0.0
     */
    onRefreshComplete:function(success){
      channelApi.onRefreshComplete(success);
    }

  });

  return Interface;

})();

module.exports = new newsLiteAPI({
  name:"newssdk interface",
  author:"huangjian",
  version:"1.0",
  jsbc:jsBridgeClient,
  nativeCls:"channelModule"
});
