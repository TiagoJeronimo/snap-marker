import { useEffect } from 'react'

import Button from 'components/Button'
import close from 'assets/close.svg'
import tick from 'assets/tick.svg'

import scss from './styles.module.scss'

type Props = { showSuccessTick: boolean }

const CloseButton = ({ showSuccessTick }: Props) => {
  useEffect(() => {
    const handleKeyPressed = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseButton()
      }
    }

    window.addEventListener('keydown', handleKeyPressed)
    return () => window.removeEventListener('keydown', handleKeyPressed)
  }, [])

  const handleCloseButton = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (!tab) return

      chrome.tabs.sendMessage(tab.id || 0, { action: 'close' })
    })
  }

  return (
    <div className={scss['closeButton']} data-testid="closeButton">
      <Button
        onClick={handleCloseButton}
        className={showSuccessTick ? scss['closeButton__tick'] : ''}
      >
        <img
          alt="close"
          src={showSuccessTick ? tick : close}
          width={24}
          height={24}
          draggable={false}
        />
      </Button>
    </div>
  )
}

export default CloseButton
