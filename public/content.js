let modal = null

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'draw') {
    if (!modal) {
      modal = document.createElement('iframe')
      modal.setAttribute('id', 'drawshot-iframe')
      modal.setAttribute('allow', 'clipboard-write')

      document.body.appendChild(modal)
      modal.src = chrome.extension.getURL('index.html')
    }

    modal.setAttribute(
      'style',
      'position: fixed; top: 0; height:100%; width: 100%; border: unset; z-index: 9999;',
    )
  }

  if (request.action === 'close') {
    if (!modal) return

    modal.setAttribute('style', 'display: none;')
  }
})
