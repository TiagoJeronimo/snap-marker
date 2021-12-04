export {}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'snap-marker',
    title: 'Snap Marker',
    contexts: ['all'],
  })

  return
})

chrome.runtime.onMessage.addListener(({ action }, { tab }, sendResponse) => {
  if (action === 'close') {
    chrome.tabs.sendMessage(tab.id, { action: 'close' })
    sendResponse({ farewell: 'goodbye' })
  }

  if (action === 'capture') {
    captureImage().then(sendResponse)
    return true
  }

  if (action === 'download') {
    captureImage(true).then(sendResponse)
    return true
  }
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
    () => {
      chrome.tabs.sendMessage(tabId, { type: 'draw' })
      return true
    },
  )
}

const captureImage = async (download) => {
  const image = await chrome.tabs
    .captureVisibleTab(null, { format: 'png' })
    .then((image) => {
      try {
        if (download) {
          chrome.downloads.download({
            filename: 'screenshot.png',
            url: image,
          })
        }

        return image
      } catch (error) {
        console.error(error)
      }
    })

  return { image }
}
