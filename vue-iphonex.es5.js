/*!
 * Vue-iPhoneX0.3.0
 * (c) 2017 YongMaple <jyfmaple@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueIphonex = factory());
}(this, (function () { 'use strict';

var $iphonex = {
    listeners: {},
    $on: function $on(event, func) {
        var events = this.listeners[event];
        if (!events) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(func);
    },
    $once: function $once(event, func) {
        var vm = this;
        function on() {
            vm.$off(event, on);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            func.apply(vm, args);
        }
        this.$on(event, on);
    },
    $off: function $off(event, func) {
        var events = this.listeners[event];
        if (!func || !events) {
            this.listeners[event] = [];
            return;
        }
        this.listeners[event] = this.listeners[event].filter(function (i) {
            return i !== func;
        });
    },
    $emit: function $emit(event, context) {
        var events = this.listeners[event];
        if (events && events.length > 0) {
            events.forEach(function (func) {
                func(context);
            });
        }
    }
};
var vueIphonex = function (Vue, options) {
    Vue.prototype.$iphonex = $iphonex;
    Vue.directive("iphonex", {
        bind: function bind(el, binding, vnode) {
            //做绑定的准备工作
            //比如添加事件监听器，或是其他只需要执行一次的复杂操作
            var isX = /iphone/gi.test(navigator.userAgent) && screen.height == 812 && screen.width == 375;
            Vue.nextTick(function () {
                $iphonex.$emit("init", isX);
            });
            if (isX) {
                window.addEventListener('orientationchange', function () {
                    var angle = window.orientation;
                    if (angle != undefined) {
                        if (angle == -90) {
                            $iphonex.$emit('rotate', 'right');
                        } else if (angle == 90) {
                            $iphonex.$emit('rotate', 'left');
                        } else {
                            $iphonex.$emit('rotate', '');
                        }
                    }
                });
            }
        }
    });
};

return vueIphonex;

})));
