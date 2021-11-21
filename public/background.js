chrome.contextMenus.create({
  id: 'Drawshot',
  title: 'Drawshot',
  contexts: ['all'],
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, { type: 'draw' })
})

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: 'draw' })
})
