chrome.runtime.onMessage.addListener(({ type, action }) => {
  let modal = document.getElementById('drawshot-iframe')

  if (type === 'draw') {
    if (!modal) {
      modal = document.createElement('iframe')
      modal.setAttribute('id', 'drawshot-iframe')
      modal.setAttribute('allow', 'clipboard-write')

      document.body.appendChild(modal)
      modal.src = chrome.runtime.getURL('index.html')
    }

    modal.setAttribute(
      'style',
      'position: fixed; top: 0; height:100%; width: 100%; border: unset; z-index: 9999;',
    )
  }

  if (action === 'close') {
    if (!modal) return

    modal.remove()
  }
})
