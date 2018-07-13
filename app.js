var universal = require('./public/universal')
var express = require('express')
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var sizeOf = require('image-size')
var app = express()
app.use(fileUpload())
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/step1.html', (req, res) => {
  universal.checkEmail(req.body.Email) &&
  universal.checkPassword(req.body.Password) &&
  universal.checkConfirmPassword(req.body.ConfirmPassword) ? (() => {
      res.redirect('/step2.html')
      console.log(req.body)
    })() : res.send('error')
})
app.post('/step2.html', (req, res) => {
  universal.checkPhone(req.body.Phone) &&
  universal.checkAddress(req.body.Address) ? (() => {
      res.redirect('/step3.html')
      console.log(req.body)
    })() : res.send('error')
})
app.post('/step3.html', (req, res) => {
  var uploadFiles = req.files.Photos
  uploadFiles && !Array.isArray(uploadFiles) && (() => { // 一張是物件，多張是陣列(通通改陣列比較方便)
    uploadFiles = [uploadFiles]
  })()
  var files = uploadFiles && uploadFiles.map(file => {
    var size = sizeOf(file.data)
    return { width: size.width, height: size.height }
  })
  var result = false
  uploadFiles && universal.checkImage(files) && (() => {
    uploadFiles.forEach(file => {
      file.mv(`./upload/${file.name}`)
    })
    result = true
  })()
  req.headers['x-requested-with'] === 'XMLHttpRequest' ? (
    res.json(result ? '/step4.html' : '')) : (
    result ? res.redirect('/step4.html') : res.send('error'))
})
app.post('/step4.html', (req, res) => {
  universal.checkCardNumber(req.body.CardNumber) ? (() => {
    res.redirect('/step5.html')
    console.log(req.body)
  })() : res.send('error')
})
app.listen(3000)
