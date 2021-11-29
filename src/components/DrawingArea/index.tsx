import { useState, useEffect, useRef } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import Konva from 'konva'

import { useDrawingBoard } from '../../context/DrawingBoard'
import Tools from '../../enums/Tools'

Konva.pixelRatio = 1

const BRUSH_WIDTH = 6
const ERASER_WIDTH = 40

const DrawingArea = () => {
  const [lines, setLines] = useState<Konva.LineConfig[]>([])

  const drawingHistory = useRef<Konva.LineConfig[]>([])
  const drawingHistoryStep = useRef(0)
  const isDrawing = useRef(false)

  const { selectedColor, cleanAll, setCleanAll, tool } = useDrawingBoard()

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

    window.addEventListener('keydown', handleKeyPressed)
    return () => window.removeEventListener('keydown', handleKeyPressed)
  }, [])

  useEffect(() => {
    if (cleanAll) {
      drawingHistoryStep.current += 1
      setLines([])
      setCleanAll(false)
    }
  }, [cleanAll])

  const handleUndo = () => {
    if (drawingHistoryStep.current === 0) {
      return
    }

    drawingHistoryStep.current -= 1
    const previous = drawingHistory.current.slice(0, drawingHistoryStep.current)
    setLines(previous)
  }

  const handleRedo = () => {
    if (drawingHistoryStep.current === drawingHistory.current.length) {
      return
    }

    drawingHistoryStep.current += 1
    const next = drawingHistory.current.slice(0, drawingHistoryStep.current)
    setLines(next)
  }

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true

    drawingHistory.current = drawingHistory.current.slice(
      0,
      drawingHistoryStep.current + 1,
    )

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
    drawingHistoryStep.current += 1
    drawingHistory.current = lines
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
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
  )
}

export default DrawingArea
