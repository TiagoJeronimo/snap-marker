import DrawingArea from '../components/DrawingArea'
import ColorPalette from '../components/ColorPalette'
import { useState } from 'react'

import scss from './styles.module.scss'

const App = () => {
  const [selectedColor, setSelectedColor] = useState('#ff595e')

  return (
    <div className={scss['app']}>
      <ColorPalette handleSelectColor={(color) => setSelectedColor(color)} />
      <DrawingArea selectedColor={selectedColor} />
    </div>
  )
}

export default App
