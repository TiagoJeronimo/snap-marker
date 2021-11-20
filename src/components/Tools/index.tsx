import ColorPalette from '../ColorPalette'
import scss from './styles.module.scss'

import eraser from '../../assets/eraser.svg'
import cleanAll from '../../assets/trash.svg'
import download from '../../assets/download.svg'
import { useDrawingBoard } from '../../context/DrawingBoard'
import { useEffect } from 'react'

const Tools = () => {
  const { tool, setTool, setCleanAll } = useDrawingBoard()

  useEffect(() => {
    if (tool === 'eraser') {
      document.addEventListener('mousemove', (event) => {
        const ev = event || window.event

        const eraserCircle = document.getElementById('eraserCircle')
        if (!eraserCircle) return

        eraserCircle.setAttribute(
          'style',
          `top: ${ev.clientY}px; left: ${ev.clientX}px`,
        )
      })
    }
  }, [tool])

  const handleScree = () => {
    chrome.tabs.captureVisibleTab(
      null as unknown as number,
      { format: 'png' },
      async function (image) {
        const data = await fetch(image)
        const blob = await data.blob()

        console.log('data', data)
        console.log('blob', blob)

        const text = new Blob(['Cute sleeping kitten'], { type: 'text/plain' })
        const item = new ClipboardItem({
          'text/plain': text,
          'image/png': blob,
        })
        await navigator.clipboard.write([item])

        chrome.downloads.download(
          {
            filename: 'screenshot.png',
            url: image,
          },
          (downloadId) => {
            console.log('ID', downloadId)
          },
        )
      },
    )
  }

  return (
    <>
      <div className={scss['tools']}>
        <button className={scss['tools__button']} onClick={handleScree}>
          <img src={download} width={21} height={21} />
        </button>
        <ColorPalette />
        <button
          className={scss['tools__button']}
          onClick={() => setTool('eraser')}
        >
          <img src={eraser} width={21} height={21} />
        </button>
        <button
          className={scss['tools__button']}
          onClick={() => setCleanAll(true)}
        >
          <img src={cleanAll} width={24} height={24} />
        </button>
      </div>
      {tool === 'eraser' && (
        <div id="eraserCircle" className={scss['tools__eraserCircle']} />
      )}
    </>
  )
}

export default Tools
