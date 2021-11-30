import Button from 'components/Button'
import { useDrawingBoard } from 'context/DrawingBoard'
import Tools from 'enums/Tools'

import eraser from 'assets/eraser.svg'
import { useEffect, useRef } from 'react'

import scss from './styles.module.scss'

type Props = {
  isInterfaceHidden: boolean
}

const EraserButton = ({ isInterfaceHidden }: Props) => {
  const eraserCircle = useRef<HTMLDivElement>(null)

  const { tool, setTool } = useDrawingBoard()

  useEffect(() => {
    const handleEraserPosition = (event: MouseEvent) => {
      if (tool !== Tools.ERASER || !eraserCircle.current) return

      eraserCircle.current.style.top = `${event.clientY}px`
      eraserCircle.current.style.left = `${event.clientX}px`
    }

    window.addEventListener('mousemove', handleEraserPosition)
    return () => window.removeEventListener('mousemove', handleEraserPosition)
  }, [tool])

  return (
    <>
      <Button onClick={() => setTool(Tools.ERASER)}>
        <img
          alt="eraser"
          src={eraser}
          width={21}
          height={21}
          draggable={false}
        />
      </Button>
      {tool === Tools.ERASER && !isInterfaceHidden && (
        <div
          ref={eraserCircle}
          className={scss['eraserButton__eraserCircle']}
        />
      )}
    </>
  )
}

export default EraserButton
