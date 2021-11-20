import DrawingArea from '../components/DrawingArea'

import scss from './styles.module.scss'
import Tools from '../components/Tools'
import { DrawingBoardProvider } from '../context/DrawingBoard'
import CloseButton from '../components/CloseButton'

const App = () => (
  <DrawingBoardProvider>
    <div className={scss['app']}>
      <Tools />
      <CloseButton />
      <DrawingArea />
    </div>
  </DrawingBoardProvider>
)

export default App
