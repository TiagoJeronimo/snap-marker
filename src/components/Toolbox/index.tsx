import { useRef, useEffect, useState } from 'react'

import eraser from '../../assets/eraser.svg'
import cleanAll from '../../assets/trash.svg'
import download from '../../assets/download.svg'

import { useDrawingBoard } from '../../context/DrawingBoard'
import Tools from '../../enums/Tools'
import ColorPalette from './ColorPalette'

import scss from './styles.module.scss'
import Button from '../Button'

const Toolbox = () => {
  const { tool, setTool, setCleanAll, setHideInterface, hideInterface } =
    useDrawingBoard()

  const eraserCircle = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEraserPosition = (event: MouseEvent) => {
      if (tool !== Tools.ERASER || !eraserCircle.current) return

      eraserCircle.current.setAttribute(
        'style',
        `top: ${event.clientY}px; left: ${event.clientX}px`,
      )
    }

    window.addEventListener('mousemove', handleEraserPosition)
    return () => window.removeEventListener('mousemove', handleEraserPosition)
  }, [tool])

  useEffect(() => {
    if (!hideInterface) return

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

          chrome.downloads.download({
            filename: 'screenshot.png',
            url: image,
          })
        } catch (error) {
          console.error(error)
        } finally {
          setHideInterface(false)
        }
      },
    )
  }, [hideInterface])

  if (hideInterface) return null

  return (
    <>
      <div className={scss['toolbox']} data-testid="toolbox">
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
      {tool === Tools.ERASER && (
        <div ref={eraserCircle} className={scss['toolbox__eraserCircle']} />
      )}
    </>
  )
}

export default Toolbox
