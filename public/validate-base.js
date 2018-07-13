$(() => {
  var status = {}
  var $submit = $(':submit')
  var $valid = $('[data-valid]')
  $valid.not($submit).on('input', {f () { // 檢查輸入時有誤套用warn樣式名稱
    var $this = $(this)
    var chackName = `check${$this.attr('name')}`
    var result = universal[chackName]($this.val())
    $this[`${result ? 'remove' : 'add'}Class`]('warn')
    status[chackName] = result
    var ary = Object.keys(status)
    $submit[`${$valid.length === ary.length && ary.map(key => status[key]).every(val => val) ? 'remove' : 'add'}Class`]('warn')
  }}.f)
  $('form').submit(e => { // 若有送出按鈕有warn樣式名稱就無法送出
    $submit.hasClass('warn') && (e.stopImmediatePropagation() || e.preventDefault())
  })
})
