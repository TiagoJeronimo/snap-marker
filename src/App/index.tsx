import DrawingArea from '../components/DrawingArea'
import Toolbox from '../components/Toolbox'
import CloseButton from '../components/CloseButton'
import { DrawingBoardProvider } from '../context/DrawingBoard'

import scss from './styles.module.scss'

const App = () => (
  <DrawingBoardProvider>
    <div className={scss['app']}>
      <CloseButton />
      <Toolbox />
      <DrawingArea />
    </div>
  </DrawingBoardProvider>
)

export default App
