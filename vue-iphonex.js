const $iphonex = {
    listeners: {},
    $on(event, func) {
        const events = this.listeners[event]
        if (!events) {
            this.listeners[event] = []
        }
        this.listeners[event].push(func)
    },
    $once(event, func) {
        const vm = this
        function on(...args) {
            vm.$off(event, on)
            func.apply(vm, args)
        }
        this.$on(event, on)
    },
    $off(event, func) {
        const events = this.listeners[event]
        if (!func || !events) {
            this.listeners[event] = []
            return
        }
        this.listeners[event] = this.listeners[event].filter(i => i !== func)
    },
    $emit(event, context) {
        const events = this.listeners[event]
        if (events && events.length > 0) {
            events.forEach(func => {
                func(context)
            })
        }
    }
}
export default function(Vue, options) {
    Vue.prototype.$iphonex = $iphonex
    Vue.directive("iphonex", {
        bind: function(el, binding, vnode) {
            //做绑定的准备工作
            //比如添加事件监听器，或是其他只需要执行一次的复杂操作
            let isX = /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            Vue.nextTick(() => {
                $iphonex.$emit("init", isX)
            });
            if(isX){
                window.addEventListener('orientationchange',function(){
                    let angle = window.orientation
                    if(angle != undefined) {
                        if(angle == -90){
                            $iphonex.$emit('rotate','right')
                        }else if(angle == 90){
                            $iphonex.$emit('rotate','left')
                        } else {
                            $iphonex.$emit('rotate', '');
                        }
                    }
                })
            }
        }
    })
}
