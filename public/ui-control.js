$(() => {
  $('[data-toggle="tooltip"]').each({f () { // 負責控制tooltip當有warn樣式名稱顯示沒有就關閉
    var showHide = $el => {
      $el.tooltip($el.hasClass('warn') ? 'show' : 'hide')
    }
    var $this = $(this)
    new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.attributeName === 'class' && showHide($this)
      })
    }).observe(this, {attributes: true, characterData: false, childList: false})
    $this.tooltip({ placement: 'right', trigger: 'manual' })
    showHide($this)
  }}.f)
  $('[data-from][data-to]').each({f () { // 產生下拉式選單的數字
    var $this = $(this)
    var i = $this.data('from')
    do {
      $this.append(`<option value="${i}">${i}</option>`)
    } while (i++ < $this.data('to'))
  }}.f)
  var $city = $('.city')
  var $region = $('.region')
  $city.length && $region.length && $.getJSON('data.json', data => { // 產生下拉式選單的縣市區域
    data.city.forEach((a, i) => {
      $city.append(`<option value="${i}">${a}</option>`)
    })
    $city.change(() => {
      $region.empty()
      data.region[$city.val()].forEach((a, i) => {
        $region.append(`<option value="${i}">${a}</option>`)
      })
    })
  })
})
