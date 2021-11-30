import Button from 'components/Button'
import { useDrawingBoard } from 'context/DrawingBoard'

import cleanAll from 'assets/trash.svg'

const CleanAllButton = () => {
  const { setCleanAll } = useDrawingBoard()

  return (
    <Button onClick={() => setCleanAll(true)}>
      <img
        alt="trash"
        src={cleanAll}
        width={24}
        height={24}
        draggable={false}
      />
    </Button>
  )
}

export default CleanAllButton
