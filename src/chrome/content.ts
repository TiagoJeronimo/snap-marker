export {}

chrome.runtime.onMessage.addListener(({ type, action }) => {
  const initialScrollHeight = document.documentElement.scrollHeight
  let modal = <HTMLIFrameElement>document.getElementById('snap-marker-iframe')
  let setInitialPositionTimeout = null

  const sendInitialScrollPosition = () => {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      initialScroll: window.scrollY,
    })
  }

  const sendScrollPosition = () => {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      scroll: window.scrollY,
    })
  }

  if (type === 'draw') {
    if (!modal) {
      modal = document.createElement('iframe')
      modal.setAttribute('id', 'snap-marker-iframe')
      modal.setAttribute('allow', 'clipboard-write')

      document.body.appendChild(modal)
      modal.src = chrome.runtime.getURL('index.html')

      document.addEventListener('scroll', sendScrollPosition, true)
    }

    modal.setAttribute(
      'style',
      `position: absolute; top: 0; left: 0; height:${initialScrollHeight}px; width: 100%; border: unset; z-index: 9999; color-scheme: light;`,
    )

    setInitialPositionTimeout = setTimeout(sendInitialScrollPosition, 100)
  }

  if (action === 'close') {
    if (!modal) return

    modal.remove()
    document.removeEventListener('scroll', sendScrollPosition, false)
    setInitialPositionTimeout && clearTimeout(setInitialPositionTimeout)
  }
})
