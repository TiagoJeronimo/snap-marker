import close from '../../assets/close.svg'

import { useDrawingBoard } from '../../context/DrawingBoard'
import Button from '../Button'

import scss from './styles.module.scss'

const CloseButton = () => {
  const { hideInterface } = useDrawingBoard()

  const handleCloseButton = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (!tab) return

      chrome.tabs.sendMessage(tab.id || 0, { action: 'close' })
    })
  }

  if (hideInterface) return null

  return (
    <div className={scss['closeButton']} data-testid="closeButton">
      <Button onClick={handleCloseButton}>
        <img alt="close" src={close} width={24} height={24} />
      </Button>
    </div>
  )
}

export default CloseButton
