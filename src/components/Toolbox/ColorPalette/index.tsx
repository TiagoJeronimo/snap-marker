import { MouseEvent } from 'react'
import { useDrawingBoard } from '../../../context/DrawingBoard'
import Tools from '../../../enums/Tools'

import scss from './styles.module.scss'

const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#000']

const ColorPalette = () => {
  const { setSelectedColor, setTool } = useDrawingBoard()

  const handleSelectColor = (event: MouseEvent<HTMLButtonElement>) => {
    if (!event.target) return

    setTool(Tools.BRUSH)
    setSelectedColor(event.currentTarget.value)
  }

  return (
    <div className={scss['colorPalette']}>
      {colors.map((color) => (
        <button
          key={color}
          value={color}
          className={scss['colorPalette__button']}
          style={{ backgroundColor: color }}
          aria-label={color}
          onClick={handleSelectColor}
        />
      ))}
    </div>
  )
}

export default ColorPalette
