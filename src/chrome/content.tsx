import Actions from 'enums/Actions'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

chrome.runtime.onMessage.addListener(({ type, action }) => {
  const app = document.getElementById('snap-marker')

  if (type === Actions.DRAW) {
    if (!app) {
      const app = document.createElement('div')
      app.id = 'snap-marker'
      document.body.appendChild(app)
      ReactDOM.render(<App />, app)
    }
  }

  if (action === Actions.CLOSE) {
    if (!app) return

    app.remove()
  }
})
