
## Install

From npm:

``` sh

$ npm install vue-iphonex --save

```
## Usage

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


# License

[The MIT License](http://opensource.org/licenses/MIT)


![](http://okmneu7zl.bkt.clouddn.com/WechatIMG8.png)
![](http://okmneu7zl.bkt.clouddn.com/WechatIMG6.png)
![](http://okmneu7zl.bkt.clouddn.com/WechatIMG7.png)
