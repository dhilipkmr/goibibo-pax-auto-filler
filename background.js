chrome.browserAction.onClicked.addListener(iconClicked);
function iconClicked(tab) {
  var msg = {
    type: 'clickResponse',
    iconClicked: true
  }
  chrome.tabs.sendMessage(tab.id, msg);
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (arguments[1].status === 'complete') {
    var msg = {
      type: 'updatedTab'
    }
    chrome.tabs.sendMessage(tab.id, msg);
  }
});
