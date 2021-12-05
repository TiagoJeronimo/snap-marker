import { useState } from 'react'

import ColorPalette from './ColorPalette'

import scss from './styles.module.scss'
import CloseButton from './CloseButton'
import DownloadButton from './DownloadButton'
import EraserButton from './EraserButton'
import CleanAllButton from './CleanAllButton'

const Toolbox = () => {
  const [isInterfaceHidden, setIsInterfaceHidden] = useState(false)
  const [isCaptureSuccess, setIsCaptureSuccess] = useState(false)

  const onCaptureImageCallback = () => {
    setIsInterfaceHidden(false)
    setIsCaptureSuccess(true)

    const timeout = setTimeout(() => {
      setIsCaptureSuccess(false)
      clearTimeout(timeout)
    }, 1000)
  }

  return (
    <div
      className={!isInterfaceHidden ? scss['toolbox'] : scss['toolbox-hide']}
      data-testid="toolbox"
    >
      <CloseButton showSuccessTick={isCaptureSuccess} />
      <div className={scss['toolbox__tools']}>
        <DownloadButton
          isInterfaceHidden={isInterfaceHidden}
          onCaptureImage={() => setIsInterfaceHidden(true)}
          onCaptureImageCallback={onCaptureImageCallback}
        />
        <ColorPalette />
        <EraserButton isInterfaceHidden={isInterfaceHidden} />
        <CleanAllButton />
      </div>
    </div>
  )
}

export default Toolbox
