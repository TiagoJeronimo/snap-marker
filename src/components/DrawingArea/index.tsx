import { useState, useEffect, useRef } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import Konva from 'konva'

import { useDrawingBoard } from '../../context/DrawingBoard'
import Tools from '../../enums/Tools'

import scss from './styles.module.scss'

const BRUSH_WIDTH = 6
const ERASER_WIDTH = 40

const DrawingArea = () => {
  const [lines, setLines] = useState<Konva.LineConfig[]>([])
  const [removedLines, setRemovedLines] = useState<Konva.LineConfig[]>([])
  const [undo, setUndo] = useState(false)
  const [redo, setRedo] = useState(false)

  const isDrawing = useRef(false)

  const { selectedColor, cleanAll, setCleanAll, tool, hideInterface } =
    useDrawingBoard()

  useEffect(() => {
    const keyPressedHandler = (event: KeyboardEvent) => {
      if (
        (event.metaKey && event.shiftKey && event.key === 'z') ||
        (event.ctrlKey && event.key === 'y')
      ) {
        setRedo(true)
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        setUndo(true)
      }
    }

    window.addEventListener('keydown', keyPressedHandler)
    return () => window.removeEventListener('keydown', keyPressedHandler)
  }, [])

  useEffect(() => {
    if (undo) {
      setUndo(false)

      const linesHistory = lines
      const removedLine = linesHistory.pop()
      if (!removedLine) return

      setRemovedLines([removedLine, ...removedLines])
      setLines([...linesHistory])
    }
  }, [undo])

  useEffect(() => {
    if (redo) {
      setRedo(false)

      const removedLinesHistory = removedLines
      const removedLine = removedLinesHistory.shift()
      if (!removedLine) return

      setLines([...lines, removedLine])
    }
  }, [redo])

  useEffect(() => {
    if (cleanAll) {
      setLines([])
      setCleanAll(false)
    }
  }, [cleanAll])

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
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
  }

  return (
    <div
      className={hideInterface ? '' : scss['drawingArea']}
      data-testid="drawingArea"
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
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
    </div>
  )
}

export default DrawingArea
