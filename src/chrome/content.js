/*global chrome*/
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App/index.tsx'

chrome.runtime.onMessage.addListener(({ type, action }) => {
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
