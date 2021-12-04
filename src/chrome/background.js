export {}

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled')
  chrome.contextMenus.create({
    id: 'snap-marker',
    title: 'Snap Marker',
    contexts: ['all'],
  })

  return
})

chrome.action.onClicked.addListener((tab) => {
  const tabId = tab?.id
  if (!tabId) return

  installContent(tabId)
  return
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const tabId = tab?.id
  if (!tabId) return

  installContent(tabId)
  return
})

const installContent = (tabId) => {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: ['./static/js/content.js'],
    },
    (results) => {
      chrome.tabs.sendMessage(tabId, { type: 'draw' })
      return true
    },
  )
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension',
  )
  if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' })
})
