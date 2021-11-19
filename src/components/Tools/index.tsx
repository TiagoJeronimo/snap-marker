import ColorPalette from '../ColorPalette'
import scss from './styles.module.scss'

import eraser from '../../assets/eraser.svg'
import cleanAll from '../../assets/cleanAll.svg'

type Props = {
  handleSelectColor: (color: string) => void
  handleClickEraser: () => void
  handleClickCleanAll: () => void
}

const Tools = ({
  handleSelectColor,
  handleClickEraser,
  handleClickCleanAll,
}: Props) => (
  <div className={scss['tools']}>
    <ColorPalette handleSelectColor={handleSelectColor} />
    <button className={scss['tools__erase']} onClick={handleClickEraser}>
      <img src={eraser} width={38} height={38} />
    </button>
    <button className={scss['tools__cleanAll']} onClick={handleClickCleanAll}>
      <img src={cleanAll} width={38} height={38} />
    </button>
  </div>
)

export default Tools
