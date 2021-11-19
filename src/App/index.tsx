import DrawingArea from '../components/DrawingArea'
import { useState } from 'react'

import scss from './styles.module.scss'
import Tools from '../components/Tools'

const App = () => {
  const [selectedColor, setSelectedColor] = useState('#ff595e')
  const [tool, setTool] = useState('brush')
  const [cleanAll, setCleanAll] = useState(false)

  const handleSelectColor = (color: string) => {
    setSelectedColor(color)

    if (tool !== 'brush') {
      setTool('brush')
    }
  }

  return (
    <div className={scss['app']}>
      <Tools
        handleSelectColor={handleSelectColor}
        handleClickEraser={() => setTool('eraser')}
        handleClickCleanAll={() => setCleanAll(true)}
      />
      <DrawingArea
        selectedColor={selectedColor}
        tool={tool}
        cleanAll={cleanAll}
      />
    </div>
  )
}

export default App
