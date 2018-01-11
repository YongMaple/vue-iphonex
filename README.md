
## 安装

npm安装:

``` sh

$ npm install vue-iphonex --save

```
## 使用

``` javascript
//main.js

import VueIphonex from 'vue-iphonex'

Vue.use(VueIphonex)
```

```html
<div id="root" v-iphonex>
        <div class="playground">
            <div :class="['left',fringeDirection == 'left' ? 'fringe_left' : '']"></div>
            <div :class="['right',fringeDirection == 'right' ? 'fringe_right' : '']"></div>
            <div :class="['bottom',isIphonex && !fringeDirection ? 'x_bottom' : '']"></div>
        </div>
    </div>
    <script>
        Vue.use(VueIphonex)
        new Vue({
            el: '#root',
            data(){
                return {
                    isIphonex: false,
                    fringeDirection: ''
                }
            },
            mounted: function() {
                let _this = this
                this.$iphonex.$on('init', (v) => {
                    _this.isIphonex = v
                })
                this.$iphonex.$on('rotate',(v)=>{
                    _this.fringeDirection = v
                })
            }
        })
    </script>
```
> 注意加上`v-iphonex`指令
> 使用`this.$iphonex.$on`监听`init`和`rotate`事件
> `init`事件会返回`Boolean`类型，`true`表示是iPhoneX
> `rotate`事件会返回`String`类型，分别为`left`：刘海在左，`right`：刘海在右，`''`空字符串为垂直方向

## License

[The MIT License](http://opensource.org/licenses/MIT)


## 效果图
### 是iPhoneX时，为底部添加34px

![](http://okmneu7zl.bkt.clouddn.com/iVBORw0KGgoAAAANSUhEUgAABX0AAArsCAYAAACMnVrPAAAABGdBTUEAALGPC:xhBQAAQABJREFUeAHsvQe8bUd937uMaUIVdQmV-2.png)
### 是iPhoneX且刘海在左时，为左边添加44px
![](http://okmneu7zl.bkt.clouddn.com/iVBORw0KGgoAAAANSUhEUgAABX0AAArsCAYAAACMnVrPAAAABGdBTUEAALGPC:xhBQAAQABJREFUeAHsvQe8bUd937uMaUIVdQmV-3.png)
### 是iPhoneX且刘海在右时，为右边添加44px
![](http://okmneu7zl.bkt.clouddn.com/iVBORw0KGgoAAAANSUhEUgAABX0AAArsCAYAAACMnVrPAAAABGdBTUEAALGPC:xhBQAAQABJREFUeAHsvQe8bUd937uMaUIVdQmV-5.png)
