var fs = require('fs')
var ary = ['./app.js', './public/ui-control.js', './public/universal.js', './public/validate-base.js', './public/validate-creditcard.js', './public/validate-upload.js']
var total = 0
ary.forEach(a => {
  try {
    var text = fs.readFileSync(a)
    total += text.toString().match(/\n/g).length
  } catch (e) {}
})
console.log(total)
