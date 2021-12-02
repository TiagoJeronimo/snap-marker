export {}

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled')
  chrome.contextMenus.create({
    id: 'snap-marker',
    title: 'Snap Marker',
    contexts: ['all'],
  })

  const installContent = (tabId: number) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ['./static/js/content.js'],
      },
      (results) => {
        console.log('AQUIII', results[0], !results[0])
        chrome.tabs.sendMessage(tabId, { type: 'draw' })
      },
    )
  }

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id) return

    installContent(tab.id)
  })

  chrome.action.onClicked.addListener((tab) => {
    if (!tab?.id) return

    installContent(tab.id)
  })
})
