import DrawingArea from '../components/DrawingArea'

import scss from './styles.module.scss'
import Toolbox from '../components/Toolbox'
import { DrawingBoardProvider } from '../context/DrawingBoard'
import CloseButton from '../components/CloseButton'

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
