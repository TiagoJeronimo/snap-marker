chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'Drawshot',
    title: 'Drawshot',
    contexts: ['all'],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, { type: 'draw' })
})

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: 'draw' })
})
