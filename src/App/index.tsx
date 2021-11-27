import Frame, { FrameContextConsumer } from 'react-frame-component'

import DrawingArea from '../components/DrawingArea'
import Toolbox from '../components/Toolbox'
import CloseButton from '../components/CloseButton'
import { DrawingBoardProvider } from '../context/DrawingBoard'

import scss from './styles.module.scss'

const App = () => (
  <DrawingBoardProvider>
    <div className={scss['app']}>
      <CloseButton />
      <Frame id="side-panel">
        <FrameContextConsumer>
          {({ document, window }) => <Toolbox />}
        </FrameContextConsumer>
      </Frame>
      <Frame id="side">
        <FrameContextConsumer>
          {({ document, window }) => <DrawingArea />}
        </FrameContextConsumer>
      </Frame>
    </div>
  </DrawingBoardProvider>
)

export default App
