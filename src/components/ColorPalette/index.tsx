import scss from './styles.module.scss'

const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']

type Props = {
  handleSelectColor: (color: string) => void
}

const ColorPalette = ({ handleSelectColor }: Props) => (
  <div className={scss['colorPalette']}>
    {colors.map((color) => (
      <button
        className={scss['colorPalette__color']}
        style={{ backgroundColor: color }}
        onClick={() => handleSelectColor(color)}
      />
    ))}
  </div>
)

export default ColorPalette
