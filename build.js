var fs = require('fs')
var path = require('path')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var version = process.env.VERSION || require('./package.json').version

var banner =
  '/*!\n' +
  ' * Vue-iPhoneX' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' YongMaple <jyfmaple@gmail.com>\n' +
  ' * Released under the MIT License.\n' +
  ' */'

rollup.rollup({
    entry: path.resolve(__dirname, 'vue-iphonex.js'),
    plugins: [ babel() ]
})
.then(bundle => {
    return write(path.resolve(__dirname, 'vue-iphonex.es5.js'), bundle.generate({
        format: 'umd',
        banner: banner,
        moduleName: 'VueIphonex'
    }).code)
})
.then(() => {
    console.log('Vue-iPhoneX v' + version + ' builded')
})
.catch(console.log)

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}
