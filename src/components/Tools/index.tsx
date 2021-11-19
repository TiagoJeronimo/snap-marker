import ColorPalette from '../ColorPalette'
import scss from './styles.module.scss'

import eraser from '../../assets/eraser.svg'
import cleanAll from '../../assets/cleanAll.svg'
import { useDrawingBoard } from '../../context/DrawingBoard'

const Tools = () => {
  const { setTool, setCleanAll } = useDrawingBoard()

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
    <div className={scss['tools']}>
      <button className={scss['tools__erase']} onClick={handleScree}>
        <img src={eraser} width={38} height={38} />
      </button>
      <ColorPalette />
      <button
        className={scss['tools__erase']}
        onClick={() => setTool('eraser')}
      >
        <img src={eraser} width={38} height={38} />
      </button>
      <button
        className={scss['tools__cleanAll']}
        onClick={() => setCleanAll(true)}
      >
        <img src={cleanAll} width={38} height={38} />
      </button>
    </div>
  )
}

export default Tools
