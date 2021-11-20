import ColorPalette from '../ColorPalette'
import scss from './styles.module.scss'

import eraser from '../../assets/noun_eraser.svg'
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
      <button className={scss['tools__image']} onClick={handleScree}>
        <img src={eraser} width={24} height={24} />
      </button>
      <ColorPalette />
      <button
        className={scss['tools__image']}
        onClick={() => setTool('eraser')}
      >
        <img src={eraser} width={24} height={24} />
      </button>
      <button
        className={scss['tools__image']}
        onClick={() => setCleanAll(true)}
      >
        <img src={cleanAll} width={24} height={24} />
      </button>
    </div>
  )
}

export default Tools
