$(() => {
  var $img = $('.img')
  var $msg = $('.msg')
  var $form = $('form')
  var addedFile = []
  var showImage = list => {
    $img.find('img').removeAttr('src')
    list.forEach((a, i) => {
      $img.eq(i).find('img').attr('src', URL.createObjectURL(a))
    })
    $(':submit')[list.length === 3 ? 'removeClass' : 'addClass']('warn')
  }
  $('[type="file"]').change({f () {
    var selectFile = [].slice.call(this.files)
    $form[0].reset()
    $msg.val('')
    addedFile.length + selectFile.length <= 3 ? (() => {
      var task = []
      selectFile.forEach(file => {
        task.push(new Promise((resolve, reject) => {
          var img = new Image()
          img.onload = {f () {
            resolve({ width: this.width, height: this.height })
          }}.f
          img.onerror = e => {
            reject(e.type)
          }
          img.src = URL.createObjectURL(file)
        }))
      })
      Promise.all(task).then(result => {
        universal.checkImage(result) ? (() => {
          selectFile.forEach(file => {
            addedFile.push(file)
          })
          showImage(addedFile)
        })() : $msg.val('尺寸超過150x150')
      }, () => {
        $msg.val('檔案格式錯誤')
      })
    })() : $msg.val('選取超過3張')
  }}.f)
  $img.click({f () {
    $msg.val('')
    addedFile.splice($img.index(this), 1)
    showImage(addedFile)
  }}.f)
  $form.submit(e => {
    var formData = new FormData()
    addedFile.forEach(file => {
      formData.append('Photos', file)
    })
    $.ajax({
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false
    }).done(url => {
      url ? location.href = url : alert('error')
    })
    e.preventDefault()
  })
})
