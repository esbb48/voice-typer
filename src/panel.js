(function() {
  var port = chrome.extension.connect({ name: 'panel' });
  port.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.action) {
      case 'RESPONSE_SENTANCE':
        initForm(message.english, message.chinese)
        break;
      default:
        break;
    }
  });

  function initForm(en, cn) {
    if (!en || en.length === 0) return
    var inputArea = document.getElementById('input-area')
    document.getElementById('en-text').innerText = en
    document.getElementById('cn-text').innerText = cn
    inputArea.innerHTML = ''
    var result = en
      .replace(/(\,|\!|\.|\?|")/g, ' $1 ')
      .split(/\s/)
    var elm = null;

    for (i=0; i < result.length; i++) {
      if (result[i].length <= 1) {
        inputArea.append(result[i])
      } else {
        elm = document.createElement("input");
        elm.setAttribute("type", "text");
        elm.setAttribute("data-answer", result[i].toLowerCase());
        inputArea.append(elm)
      }
    }
  }

  function notifyAction(action) {
    port.postMessage({ action: action});
  }

  function onSubmit(e) {
    e.preventDefault();
    var inputElms = document.querySelectorAll('#input-area input')
    var isMatch = false
    for (i=0; i < inputElms.length; i++) {
      isMatch = inputElms[i].value.toLowerCase() === inputElms[i].getAttribute('data-answer')
      inputElms[i].className= isMatch ? "input success" : "input error"
    }
  }

  function switchTip(textId) {
    var textElm = document.getElementById(textId)
    textElm.className = textElm.className === ''
      ? 'hidden'
      : ''
   }

  window.onload = function(){
    document
      .getElementById('init-btn')
      .addEventListener('click', notifyAction.bind(null, 'CLICK_INIT'))

    document
      .getElementById('prev-btn')
      .addEventListener('click', notifyAction.bind(null, 'CLICK_PREV'))

    document
      .getElementById('next-btn')
      .addEventListener('click', notifyAction.bind(null, 'CLICK_NEXT'))

    document
      .getElementById('repeat-btn')
      .addEventListener('click', notifyAction.bind(null, 'CLICK_REPEAT'))

    document
      .getElementById('en-btn')
      .addEventListener('click', switchTip.bind(null, 'en-text'))

    document
      .getElementById('cn-btn')
      .addEventListener('click', switchTip.bind(null, 'cn-text'))

    document
      .getElementById('form')
      .addEventListener('submit', onSubmit)
  }

})()
