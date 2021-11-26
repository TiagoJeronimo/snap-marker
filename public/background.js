chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'snap-marker',
    title: 'Snap Marker',
    contexts: ['all'],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, { type: 'draw' })
})

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: 'draw' })
})
