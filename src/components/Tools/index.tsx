import ColorPalette from '../ColorPalette'
import scss from './styles.module.scss'

import eraser from '../../assets/eraser.svg'
import cleanAll from '../../assets/cleanAll.svg'
import { useDrawingBoard } from '../../context/DrawingBoard'

const Tools = () => {
  const { setTool, setCleanAll } = useDrawingBoard()

  return (
    <div className={scss['tools']}>
      <ColorPalette />
      <button
        className={scss['tools__erase']}
        onClick={() => setTool('eraser')}
      >
        <img src={eraser} width={38} height={38} />
      </button>
      <button
        className={scss['tools__cleanAll']}
        onClick={() => setCleanAll(true)}
      >
        <img src={cleanAll} width={38} height={38} />
      </button>
    </div>
  )
}

export default Tools
