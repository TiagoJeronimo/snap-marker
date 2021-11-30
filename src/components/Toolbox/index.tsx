import { useRef, useEffect, useState } from 'react'
import debounce from 'debounce'

import ColorPalette from './ColorPalette'

import scss from './styles.module.scss'
import CloseButton from './CloseButton'
import DownloadButton from './DownloadButton'
import EraserButton from './EraserButton'
import CleanAllButton from './CleanAllButton'

const Toolbox = () => {
  const [isInterfaceHidden, setIsInterfaceHidden] = useState(false)
  const [isCaptureSuccess, setIsCaptureSuccess] = useState(false)

  const toolbox = useRef<HTMLDivElement>(null)

  const debouncedPosition = debounce((scroll: number) => {
    if (toolbox?.current) {
      toolbox.current.style.marginTop = `${scroll}px`
      toolbox.current.style.opacity = '1'
    }
  }, 300)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(({ scroll }) => {
      if (!toolbox?.current) return

      toolbox.current.style.opacity = '0'
      debouncedPosition(scroll)
    })
  }, [])

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
      ref={toolbox}
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
