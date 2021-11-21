import { FC } from 'react'
import { render } from '@testing-library/react'
import { DrawingBoardProvider } from '../../context/DrawingBoard'

export const AllTheProviders: FC = ({ children }) => {
  return <DrawingBoardProvider>{children}</DrawingBoardProvider>
}

export const renderWithAllProviders = (ui: JSX.Element, options = {}) => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}
