import Actions from 'enums/Actions'

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
  const tabId = tab?.id

  if (action === Actions.CLOSE && tabId) {
    chrome.tabs.sendMessage(tabId, { action: Actions.CLOSE })
  }

  if (action === Actions.CAPTURE) {
    captureImage().then(sendResponse)
    return true
  }

  if (action === Actions.DOWNLOAD) {
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

const installContent = (tabId: number) => {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: ['./static/js/content.js'],
    },
    () => {
      chrome.tabs.sendMessage(tabId, { type: Actions.DRAW })
      return
    },
  )
}

const captureImage = async (download?: boolean) => {
  const image = await chrome.tabs
    .captureVisibleTab(null as unknown as number, { format: 'png' })
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
