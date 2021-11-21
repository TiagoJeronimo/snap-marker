import { useDrawingBoard } from '../../../context/DrawingBoard'
import Tools from '../../../enums/Tools'
import scss from './styles.module.scss'

const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#000']

const ColorPalette = () => {
  const { setSelectedColor, setTool } = useDrawingBoard()

  const handleSelectColor = (color: string) => {
    setTool(Tools.BRUSH)
    setSelectedColor(color)
  }

  return (
    <div className={scss['colorPalette']}>
      {colors.map((color) => (
        <button
          key={color}
          className={scss['colorPalette__color']}
          style={{ backgroundColor: color }}
          onClick={() => handleSelectColor(color)}
        />
      ))}
    </div>
  )
}

export default ColorPalette
