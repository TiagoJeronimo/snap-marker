import { FC } from 'react'

import scss from './styles.module.scss'

type Props = {
  onClick: () => void
}

const Button: FC<Props> = ({ onClick, children }) => (
  <button className={scss['button']} onClick={onClick}>
    {children}
  </button>
)

export default Button
