import scss from './styles.module.scss'

import close from '../../assets/close.svg'

const CloseButton = () => {
  const handleCloseButton = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (!tab) return

      chrome.tabs.sendMessage(tab.id || 0, { action: 'close' })
    })
  }

  return (
    <button className={scss['closeButton']} onClick={handleCloseButton}>
      <img src={close} width={24} height={24} />
    </button>
  )
}

export default CloseButton
