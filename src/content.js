(function(_window) {
  var controlButtons = document.querySelectorAll('#control_panel .pull-left a')
  var port = chrome.runtime.connect({ name: 'content' });
  port.onMessage.addListener(function(message) {
    switch (message.action) {
      case 'CLICK_INIT':
        getAndResponseSentance()
        break;
      case 'CLICK_NEXT':
        controlButtons[2].click()
        setTimeout(getAndResponseSentance, 500)
        break;
      case 'CLICK_PREV':
        controlButtons[0].click()
        setTimeout(getAndResponseSentance, 500)
        break;
      case 'CLICK_REPEAT':
        document.querySelector('.repeat_one').click()
        break;
    }
  });

  function getChinese () {
    return document.querySelector('#caption_block .zh-Hant span')
      .innerText || ''
  }

  function getEnglish () {
    return document.querySelector('#caption_block .en.lang > span')
      .innerText
      .replace(/<span>|<\/span>/g, '')
  }

  function getAndResponseSentance () {
    const payload = {
      action: 'RESPONSE_SENTANCE',
      chinese: getChinese(),
      english: getEnglish()
    }
    console.log('getAndResponseSentance', payload)
    port.postMessage(payload)
  }

})(window)
