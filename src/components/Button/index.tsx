import classNames from 'classnames'
import { FC } from 'react'

import scss from './styles.module.scss'

type Props = {
  onClick: () => void
  className?: string
}

const Button: FC<Props> = ({ onClick, className, children }) => (
  <button className={classNames(scss['button'], className)} onClick={onClick}>
    {children}
  </button>
)

export default Button
