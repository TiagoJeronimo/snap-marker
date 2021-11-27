chrome.runtime.onMessage.addListener(
  ({ type, action }, sender, sendResponse) => {
    let modal = document.getElementById('snap-marker-iframe')

    if (type === 'draw') {
      if (!modal) {
        modal = document.createElement('iframe')
        modal.setAttribute('id', 'snap-marker-iframe')
        modal.setAttribute('allow', 'clipboard-write')

        document.body.appendChild(modal)
        modal.src = chrome.runtime.getURL('index.html')

        chrome.runtime.sendMessage(document.body.scrollHeight)
      }

      modal.setAttribute(
        'style',
        `position: absolute; top: 0; height:${document.body.scrollHeight}px; width: 100%; border: unset; z-index: 9999;`,
      )
    }

    if (action === 'close') {
      if (!modal) return

      modal.remove()
    }
  },
)
