import DrawingArea from '../components/DrawingArea'

import scss from './styles.module.scss'
import Tools from '../components/Tools'
import { DrawingBoardProvider } from '../context/DrawingBoard'

const App = () => {
  return (
    <DrawingBoardProvider>
      <div className={scss['app']}>
        <Tools />
        <DrawingArea />
      </div>
    </DrawingBoardProvider>
  )
}

export default App
