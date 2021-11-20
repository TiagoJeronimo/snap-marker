let modal = null

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'draw') {
    if (!modal) {
      modal = document.createElement('dialog')
      modal.setAttribute(
        'style',
        'height:100%; width:100%; background: transparent; overflow: hidden; padding: 0; margin: 0; max-width: unset; max-height: unset; border: unset;',
      )
      modal.innerHTML = `<iframe id="drawshot-iframe" allow="clipboard-write" style="height:100%; width: 100%; border: unset;"></iframe>`

      document.body.appendChild(modal)
      const iframe = document.getElementById('drawshot-iframe')
      iframe.src = chrome.extension.getURL('index.html')
    }

    modal.showModal()
  }

  if (request.action === 'close') {
    if (!modal) return

    modal.close()
  }
})
