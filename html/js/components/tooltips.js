// alert.js
// ================================

var $ = require('zepto');
var UI = require('./core');
var animation = UI.support.animate;

var Tooltips = function(element, options) {
  this.$ele = $(element);
  this.$trigger = this.$ele.find('[data-ui-tooltips-trigger]');
  this.$content = this.$ele.find('.ui-tooltips-content');
  this.$close = this.$ele.find('[data-ui-tooltips-close]');

  this.active = this.$ele.hasClass(CLASSES.active) ? true : false;
  this.animating = null;
  this.init();
};

var CLASSES = {
  active: 'ui-tooltips-active'
};

// 初始化
Tooltips.prototype.init = function() {
  this.events();
  //this.toggle();
};

// toggle
Tooltips.prototype.toggle = function() {
  if (this.animating) {
    return;
  }

  this[this.active ? 'close' : 'open']();
};

// 打开
Tooltips.prototype.open = function() {
  var _this = this;

  if (this.active) {
    return;
  }
  this.$ele.addClass(CLASSES.active);

  this.$content
    .removeClass('ui-tooltips-out')
    .addClass('ui-tooltips-in');


  $(document).on('click', function(e) {
    _this.close();
  });
};

// 关闭
Tooltips.prototype.close = function() {
  this.$ele.removeClass(CLASSES.active);

  this.$content
    .removeClass('ui-tooltips-in')
    .addClass('ui-tooltips-out');
};

// 绑定事件
Tooltips.prototype.events = function() {
  var _this = this;

  _this.$trigger.on('click', function(e) {
    e.stopPropagation();
    _this.open();
  });

  _this.$content.on('click', function(e) {
    e.stopPropagation();
  });

  _this.$close.on('click', function() {
    _this.close();
  });

  $(document).on('scroll', function() {
    _this.close();
  });
};

// 添加插件
function plugin(option) {
  return this.each(function() {
    var $this = $(this);
    var data = $this.data('ui.tooltips');
    var options = typeof option === 'object' && option;

    if (!data) {
      $this.data('ui.tooltips', (data = new Tooltips(this, options)));
    }

    if (typeof option == 'string') {
      data[option]();
    }
  });
}

// add Tooltips plugin
$.fn.tooltips = plugin;

// Init
$(function() {
  $('[data-ui-tooltips]').tooltips();
});


Tooltips.VERSION = '1.0.0';

// exports
module.exports = Tooltips;
