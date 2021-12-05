import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

chrome.runtime.onMessage.addListener(({ type, action }) => {
  const app = document.getElementById('snap-marker-iframe')

  if (type === 'draw') {
    if (!app) {
      const app = document.createElement('div')
      app.id = 'snap-marker-iframe'
      document.body.appendChild(app)
      ReactDOM.render(<App />, app)
    }
  }

  if (action === 'close') {
    if (!app) return

    app.remove()
  }
})
