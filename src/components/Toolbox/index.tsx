import { useRef, useEffect, useState } from 'react'
import debounce from 'debounce'

import eraser from '../../assets/eraser.svg'
import cleanAll from '../../assets/trash.svg'
import download from '../../assets/download.svg'

import { useDrawingBoard } from '../../context/DrawingBoard'
import Tools from '../../enums/Tools'
import ColorPalette from './ColorPalette'

import scss from './styles.module.scss'
import Button from '../Button'
import CloseButton from './CloseButton'

const Toolbox = () => {
  const [hideInterface, setHideInterface] = useState(false)
  const [downloadImageOnCapture, setDownloadImageOnCapture] = useState(true)
  const [captureSuccess, setCaptureSuccess] = useState(false)

  const { tool, setTool, setCleanAll } = useDrawingBoard()

  const toolbox = useRef<HTMLDivElement>(null)
  const eraserCircle = useRef<HTMLDivElement>(null)

  const debouncedPosition = debounce((scroll: number) => {
    if (toolbox?.current) {
      toolbox.current.style.marginTop = `${scroll}px`
      toolbox.current.style.opacity = '1'
    }
  }, 300)

  const handleKeyPressed = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      setDownloadImageOnCapture(false)
      setHideInterface(true)
    }
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(({ scroll }) => {
      if (!toolbox?.current) return

      toolbox.current.style.opacity = '0'
      debouncedPosition(scroll)
    })

    window.addEventListener('keydown', handleKeyPressed)
    return () => window.removeEventListener('keydown', handleKeyPressed)
  }, [])

  useEffect(() => {
    if (tool !== Tools.ERASER) return

    const handleEraserPosition = (event: MouseEvent) => {
      if (!eraserCircle.current) return

      eraserCircle.current.style.top = `${event.clientY}px`
      eraserCircle.current.style.left = `${event.clientX}px`
    }

    window.addEventListener('mousemove', handleEraserPosition)
    return () => window.removeEventListener('mousemove', handleEraserPosition)
  }, [tool])

  useEffect(() => {
    if (!hideInterface) return

    captureImage()
  }, [hideInterface])

  const captureImage = () => {
    chrome.tabs.captureVisibleTab(
      null as unknown as number,
      { format: 'png' },
      async (image) => {
        try {
          const data = await fetch(image)
          const blob = await data.blob()

          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ])

          if (downloadImageOnCapture) {
            chrome.downloads.download({
              filename: 'screenshot.png',
              url: image,
            })
          }
        } catch (error) {
          console.error(error)
        } finally {
          setDownloadImageOnCapture(true)
          setHideInterface(false)
          setCaptureSuccess(true)

          const timeout = setTimeout(() => {
            setCaptureSuccess(false)
            clearTimeout(timeout)
          }, 2000)
        }
      },
    )
  }

  return (
    <>
      <div
        className={!hideInterface ? scss['toolbox'] : scss['toolbox-hide']}
        ref={toolbox}
        data-testid="toolbox"
      >
        <CloseButton showSuccessTick={captureSuccess} />
        <div className={scss['toolbox__tools']}>
          <Button onClick={() => setHideInterface(true)}>
            <img
              alt="download"
              src={download}
              width={21}
              height={21}
              draggable="false"
            />
          </Button>
          <ColorPalette />
          <Button onClick={() => setTool(Tools.ERASER)}>
            <img
              alt="eraser"
              src={eraser}
              width={21}
              height={21}
              draggable="false"
            />
          </Button>
          <Button onClick={() => setCleanAll(true)}>
            <img
              alt="trash"
              src={cleanAll}
              width={24}
              height={24}
              draggable="false"
            />
          </Button>
        </div>
      </div>
      {tool === Tools.ERASER && !hideInterface && (
        <div ref={eraserCircle} className={scss['toolbox__eraserCircle']} />
      )}
    </>
  )
}

export default Toolbox
