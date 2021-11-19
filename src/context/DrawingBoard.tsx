import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type Tool = 'brush' | 'eraser'

type Context = {
  selectedColor: string
  setSelectedColor: Dispatch<SetStateAction<string>>
  tool: Tool
  setTool: Dispatch<SetStateAction<Tool>>
  cleanAll: boolean
  setCleanAll: Dispatch<SetStateAction<boolean>>
}

const DrawingBoard = createContext<Context | undefined>(undefined)

export const DrawingBoardProvider: FC = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState('#ff595e')
  const [tool, setTool] = useState<Tool>('brush')
  const [cleanAll, setCleanAll] = useState(false)

  return (
    <DrawingBoard.Provider
      value={{
        selectedColor,
        setSelectedColor,
        tool,
        setTool,
        cleanAll,
        setCleanAll,
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
