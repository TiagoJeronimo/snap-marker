import DrawingArea from '../components/DrawingArea'
import Toolbox from '../components/Toolbox'
import { DrawingBoardProvider } from '../context/DrawingBoard'

const App = () => (
  <DrawingBoardProvider>
    <main>
      <Toolbox />
      <DrawingArea />
    </main>
  </DrawingBoardProvider>
)

export default App
