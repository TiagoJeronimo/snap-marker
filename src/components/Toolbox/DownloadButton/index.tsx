import { useEffect, useState } from 'react'

import download from 'assets/download.svg'

import Button from 'components/Button'
import Actions from 'enums/Actions'

type Props = {
  isInterfaceHidden: boolean
  onCaptureImage: () => void
  onCaptureImageCallback: () => void
}

const DownloadButton = ({
  isInterfaceHidden,
  onCaptureImage,
  onCaptureImageCallback,
}: Props) => {
  const [captureAction, setCaptureAction] = useState(Actions.DOWNLOAD)

  useEffect(() => {
    const handleKeyPressed = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        setCaptureAction(Actions.CAPTURE)
        onCaptureImage()
      }
    }

    window.addEventListener('keydown', handleKeyPressed)
    return () => window.removeEventListener('keydown', handleKeyPressed)
  }, [])

  useEffect(() => {
    if (!isInterfaceHidden) return

    handleCaptureImage()
  }, [isInterfaceHidden])

  const handleCaptureImage = () => {
    chrome.runtime.sendMessage(
      { action: captureAction },
      {},
      async ({ image }) => {
        const data = await fetch(image)
        const blob = await data.blob()

        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ])

        setCaptureAction(Actions.DOWNLOAD)
        onCaptureImageCallback()
      },
    )
    return true
  }

  return (
    <Button onClick={onCaptureImage}>
      <img
        alt="download"
        src={download}
        width={21}
        height={21}
        draggable={false}
      />
    </Button>
  )
}

export default DownloadButton
