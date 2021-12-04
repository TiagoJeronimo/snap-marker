import { useEffect } from 'react'
import DrawingArea from '../components/DrawingArea'
import Toolbox from '../components/Toolbox'
import { DrawingBoardProvider } from '../context/DrawingBoard'

type Props = {
  chrome: any
}

const App = ({ chrome }: Props) => {
  useEffect(() =>
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      { action: 'close' },
      {},
      (resp: any) => {
        console.log('RESP', resp)
      },
    ),
  )

  return (
    <DrawingBoardProvider>
      {console.log('APPPP', chrome.tabs)}
      <main>
        <Toolbox />
        <DrawingArea />
      </main>
    </DrawingBoardProvider>
  )
}

export default App
