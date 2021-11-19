import "./App.css";
import DrawingArea from "../components/DrawingArea";
import ColorPalette from "../components/ColorPalette";
import { useState } from "react";

const App = () => {
  const [selectedColor, setSelectedColor] = useState("#ff595e");

  return (
    <div className="App">
      <ColorPalette handleSelectColor={(color) => setSelectedColor(color)} />
      <DrawingArea selectedColor={selectedColor} />
    </div>
  );
};

export default App;
