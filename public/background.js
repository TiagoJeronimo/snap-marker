chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'snap-marker',
    title: 'Snap Marker',
    contexts: ['all'],
  })

  const installContent = (tabId) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ['content.js'],
      },
      (results) => {
        if (results[0] !== true) {
          chrome.tabs.sendMessage(tabId, { type: 'draw' })
        }
      },
    )
  }

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    installContent(tab.id)
  })

  chrome.action.onClicked.addListener((tab) => {
    installContent(tab.id)
  })
})
