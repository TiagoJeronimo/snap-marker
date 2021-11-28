chrome.runtime.onMessage.addListener(({ type, action }) => {
  let modal = document.getElementById('drawshot-iframe')
  let setInitialPositionTimeout = null

  const sendScrollPosition = () => {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      scroll: window.scrollY,
    })
  }

  if (type === 'draw') {
    if (!modal) {
      modal = document.createElement('iframe')
      modal.setAttribute('id', 'drawshot-iframe')
      modal.setAttribute('allow', 'clipboard-write')

      document.body.appendChild(modal)
      modal.src = chrome.runtime.getURL('index.html')

      document.addEventListener('scroll', sendScrollPosition, true)
    }

    modal.setAttribute(
      'style',
      `position: absolute; top: 0; height:${document.body.scrollHeight}px; width: 100%; border: unset; z-index: 9999;`,
    )

    setInitialPositionTimeout = setTimeout(sendScrollPosition, 200)
  }

  if (action === 'close') {
    if (!modal) return

    modal.remove()
    document.removeEventListener('scroll', sendScrollPosition, false)
    clearTimeout(setInitialPositionTimeout)
  }
})
