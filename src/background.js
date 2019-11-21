var portObject = {
  content: null,
  panel: null
}

chrome.runtime.onConnect.addListener(function(port) {
  portObject[port.name] = port
  port.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.action) {
      case 'CLICK_INIT':
      case 'CLICK_NEXT':
      case 'CLICK_PREV':
      case 'CLICK_REPEAT':
        portObject.content.postMessage(message)
      case 'RESPONSE_SENTANCE':
        portObject.panel.postMessage(message)
        break;
      default:
        break;
    }
  });
});
