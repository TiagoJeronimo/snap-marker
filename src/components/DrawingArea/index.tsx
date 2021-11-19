import { Stage, Layer, Line } from 'react-konva'
import { useState, useRef } from 'react'
import Konva from 'konva'

type Props = {
  selectedColor: string
}

const DrawingArea = ({ selectedColor }: Props) => {
  const [tool, setTool] = useState('pen')
  const [lines, setLines] = useState<Konva.LineConfig[]>([])
  const isDrawing = useRef(false)

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true
    const pos = e?.target?.getStage()?.getPointerPosition()
    if (!pos) return

    setLines([...lines, { tool, points: [pos.x, pos.y], color: selectedColor }])
  }

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage?.getPointerPosition()

    if (!point) return

    // To draw line
    let lastLine = lines[lines.length - 1]

    if (lastLine) {
      // add point
      lastLine.points = lastLine?.points?.concat([point.x, point.y])

      // replace last
      lines.splice(lines.length - 1, 1, lastLine)
      setLines(lines.concat())
    }
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <div className=" text-center text-dark">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="canvas-stage"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={4}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default DrawingArea
