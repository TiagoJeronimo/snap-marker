import { useState, useEffect, useRef } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import Konva from 'konva'

import { useDrawingBoard } from 'context/DrawingBoard'
import Tools from 'enums/Tools'

import scss from './styles.module.scss'

Konva.pixelRatio = 1

const MAX_CANVAS_HEIGHT = 16000
const WARNING_BANNER_HEIGHT = 64
const BRUSH_WIDTH = 6
const ERASER_WIDTH = 40
const LEFT_CLICK = 2

const DrawingArea = () => {
  const [lines, setLines] = useState<Konva.LineConfig[]>([])

  const drawingHistory = useRef<Konva.LineConfig[][]>([[]])
  const drawingHistoryStep = useRef(0)
  const isDrawing = useRef(false)

  const { selectedColor, cleanAll, setCleanAll, tool } = useDrawingBoard()

  const webpageHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  )

  useEffect(() => {
    const handleKeyPressed = (event: KeyboardEvent) => {
      if (
        (event.metaKey && event.shiftKey && event.key === 'z') ||
        (event.ctrlKey && event.key === 'y')
      ) {
        handleRedo()
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        handleUndo()
      }
    }

    const stopDrawing = () => {
      isDrawing.current = false
    }

    window.addEventListener('mouseup', stopDrawing)
    window.addEventListener('keydown', handleKeyPressed)
    return () => {
      window.removeEventListener('mouseup', stopDrawing)
      window.removeEventListener('keydown', handleKeyPressed)
    }
  }, [])

  useEffect(() => {
    if (cleanAll) {
      drawingHistoryStep.current += 1
      drawingHistory.current[drawingHistoryStep.current] = []
      setLines([])
      setCleanAll(false)
    }
  }, [cleanAll])

  const handleUndo = () => {
    if (drawingHistoryStep.current === 0) {
      return
    }

    const previous = drawingHistory.current[drawingHistoryStep.current - 1]
    drawingHistoryStep.current -= 1
    setLines(previous)
  }

  const handleRedo = () => {
    if (drawingHistoryStep.current === drawingHistory.current.length - 1) {
      return
    }

    const next = drawingHistory.current[drawingHistoryStep.current + 1]
    drawingHistoryStep.current += 1
    setLines(next)
  }

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (event.evt.buttons === LEFT_CLICK) return

    isDrawing.current = true

    const stage = event.target.getStage()
    const position = stage?.getPointerPosition()
    if (!position) return

    setLines([
      ...lines,
      { tool, points: [position.x, position.y], color: selectedColor },
    ])
  }

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return
    }

    const stage = event.target.getStage()
    const point = stage?.getPointerPosition()
    if (!point) return

    const lastLine = lines[lines.length - 1]
    lastLine.points = lastLine.points?.concat([point.x, point.y])

    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false

    drawingHistory.current = drawingHistory.current.slice(
      0,
      drawingHistoryStep.current + 1,
    )

    drawingHistoryStep.current += 1
    drawingHistory.current[drawingHistoryStep.current] = lines
  }

  return (
    <div className={scss['drawingArea']}>
      <Stage
        width={document.body.clientWidth}
        height={
          webpageHeight > MAX_CANVAS_HEIGHT ? MAX_CANVAS_HEIGHT : webpageHeight
        }
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        data-testid="drawingArea"
      >
        <Layer>
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke={line.color}
              strokeWidth={
                line.tool === Tools.ERASER ? ERASER_WIDTH : BRUSH_WIDTH
              }
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === Tools.ERASER ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      {webpageHeight > MAX_CANVAS_HEIGHT + WARNING_BANNER_HEIGHT && (
        <h1 className={scss['drawingArea__maxSize']}>
          UNFORTUNATELY, THIS IS THE CANVAS MAX SIZE
        </h1>
      )}
    </div>
  )
}

export default DrawingArea
