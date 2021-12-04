/*global chrome*/
/* src/content.js */
import React from 'react'
import ReactDOM from 'react-dom'
// import Frame, { FrameContextConsumer } from 'react-frame-component'
import App from '../App/index.tsx'

// chrome.runtime.onMessage.addListener(({ type, action }) => {
//   console.log('AAA')
//   const initialScrollHeight = document.documentElement.scrollHeight
//   let modal = document.getElementById('snap-marker-iframe')
//   let setInitialPositionTimeout = null

//   const sendInitialScrollPosition = () => {
//     chrome.runtime.sendMessage(chrome.runtime.id, {
//       initialScroll: window.scrollY,
//     })
//   }

//   const sendScrollPosition = () => {
//     chrome.runtime.sendMessage(chrome.runtime.id, {
//       scroll: window.scrollY,
//     })
//   }

//   if (type === 'draw') {
//     if (!modal) {
//       modal = document.createElement('iframe')
//       modal.setAttribute('id', 'snap-marker-iframe')
//       modal.setAttribute('allow', 'clipboard-write')

//       document.body.appendChild(modal)
//       modal.src = chrome.runtime.getURL('index.html')

//       document.addEventListener('scroll', sendScrollPosition, true)
//     }

//     modal.setAttribute(
//       'style',
//       `position: absolute; top: 0; left: 0; height:${initialScrollHeight}px; width: 100%; border: unset; z-index: 9999; color-scheme: light;`,
//     )

//     setInitialPositionTimeout = setTimeout(sendInitialScrollPosition, 100)
//   }

// if (action === 'close') {
//   if (!modal) return

//   modal.remove()
//   document.removeEventListener('scroll', sendScrollPosition, false)
//   setInitialPositionTimeout && clearTimeout(setInitialPositionTimeout)
// }
// })

chrome.runtime.onMessage.addListener(({ type, action, message }) => {
  console.log('onMessage asfa', type, action, message)
  console.log('chrome.runtime.id listerner', chrome.runtime.id)
  let app = document.getElementById('snap-marker-iframe')

  if (type === 'draw') {
    if (!app) {
      const app = document.createElement('div')
      app.id = 'snap-marker-iframe'
      document.body.appendChild(app)
      ReactDOM.render(<App chrome={chrome} />, app)
    }
  }

  if (action === 'close') {
    if (!app) return

    app.remove()
  }
})

export function messager(data) {
  console.log('AQUI', window.chrome.tabs)
  window.chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id
    console.log('123')
    window.chrome.tabs.sendMessage(tabId, data)
  })
}
