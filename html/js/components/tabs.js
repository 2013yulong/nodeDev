// tabs.js
// =====================================

/**
 * @via https://github.com/twbs/bootstrap/blob/master/js/tab.js
 * @copyright 2011-2014 Twitter, Inc.
 * @license MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

var $ = require('zepto');
var UI = require('./core');

var Tabs = function(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, Tabs.DEFAULTS, options || {});
  this.transitioning = this.activeIndex = null;

  this.refresh();
  this.init();
};


Tabs.DEFAULTS = {
  selector: {
    nav: '> .ui-tabs-nav',
    content: '> .ui-tabs-bd',
    panel: '> .ui-tab-panel'
  },
  activeClass: 'ui-active'
};

Tabs.prototype.refresh = function() {

};

Tabs.prototype.init = function() {

};
