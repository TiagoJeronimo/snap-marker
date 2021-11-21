import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import Tools from '../enums/Tools'

type Context = {
  selectedColor: string
  setSelectedColor: Dispatch<SetStateAction<string>>
  tool: Tools
  setTool: Dispatch<SetStateAction<Tools>>
  cleanAll: boolean
  setCleanAll: Dispatch<SetStateAction<boolean>>
  hideInterface: boolean
  setHideInterface: Dispatch<SetStateAction<boolean>>
}

const DrawingBoard = createContext<Context | undefined>(undefined)

export const DrawingBoardProvider: FC = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState('#ff595e')
  const [tool, setTool] = useState<Tools>(Tools.BRUSH)
  const [cleanAll, setCleanAll] = useState(false)
  const [hideInterface, setHideInterface] = useState(false)

  return (
    <DrawingBoard.Provider
      value={{
        selectedColor,
        setSelectedColor,
        tool,
        setTool,
        cleanAll,
        setCleanAll,
        hideInterface,
        setHideInterface,
      }}
    >
      {children}
    </DrawingBoard.Provider>
  )
}

export const useDrawingBoard = (): Context => {
  const context = useContext(DrawingBoard)

  if (context === undefined) {
    throw new Error('useDrawingBoard must be used within a DrawingBoard')
  }

  return context
}
