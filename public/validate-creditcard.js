$(() => {
  $('[name="CardNumber"]').on('input', {f () { // 檢查信用卡類型
    $('.visa, .master').hide()
    var cardType = universal.checkCardNumber(this.value)
    cardType && $(`.${cardType}`).show()
  }}.f).on('keyup', {f (e) { // 當輸入四個數字後就控一格
    var n = e.keyCode
    this.value.length < 19 && ((n >= 48 && n <= 57) || (n >= 96 && n <= 105)) && (() => {
      this.value = this.value.replace(/\s/g, '')
      this.value = this.value.replace(/(\d{4})/g, '$1 ')
    })()
  }}.f)
})
