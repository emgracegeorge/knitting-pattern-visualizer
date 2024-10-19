import React, { useState } from 'react';
import './App.css';

function App() {
  const [colors, setColors] = useState([
    '#D1CECA', '#828288', '#D1C8BB', '#AC7C63', '#CAA57A', '#9E9C9E'
  ]);

  const handleColorChange = (index, value) => {
    const updatedColors = [...colors];
    if (/^#[0-9A-F]{6}$/i.test(value) || value === '') {
      updatedColors[index] = value;
      setColors(updatedColors);
    }
  };

  // Functions to map the color sequences based on the input hex codes
  const colorSequenceA = (i) => {
    if (i === 0 || i === 2 || i === 9 || i === 11) {
      return colors[0]; // YARN_A
    } else if (i === 1 || i === 5 || i === 10) {
      return colors[1]; // YARN_B
    } else if (i === 3 || i === 8) {
      return colors[2]; // YARN_C
    } else if (i === 4 || i === 6) {
      return colors[3]; // YARN_D
    } else {
      return colors[4]; // YARN_E
    }
  };

  const colorSequenceB = (i) => {
    if (i === 0 || i === 4) {
      return colors[5]; // YARN_F
    } else if (i === 1) {
      return colors[3]; // YARN_D
    } else if (i === 2) {
      return colors[2]; // YARN_C
    } else if (i === 3 || i === 7) {
      return colors[4]; // YARN_E
    } else if (i === 5) {
      return colors[0]; // YARN_A
    } else {
      return colors[1]; // YARN_B
    }
  };

  // Function to render each square (corresponds to drawSquare in Java)
  const drawSquare = (colorA, colorB, startX, startY) => {
    const squares = [];
    for (let i = startX; i < startX + 32; i += 4) {
      squares.push(
        <div
          key={`${i}-${startY}-A`}
          className="stitch"
          style={{ backgroundColor: colorA, top: startY, left: i, width: 10, height: 32 }}
        />
      );
      squares.push(
        <div
          key={`${i}-${startY}-B`}
          className="stitch"
          style={{ backgroundColor: colorB, top: startY, left: i + 2, width: 10, height: 32 }}
        />
      );
    }
    return squares;
  };

  // Function to render a row (corresponds to drawRow in Java)
  const drawRow = (colorB, startX) => {
    const rowElements = [];
    for (let j = 0; j < 384; j += 32) {
      const colorA = colorSequenceA(j / 32);
      rowElements.push(...drawSquare(colorA, colorB, startX, j));
    }
    return rowElements;
  };

  // Render the full grid (corresponds to the loop in Java)
  const renderGrid = () => {
    const gridElements = [];
    for (let i = 0; i < 3; i++) {
      const startX = i * 32 * 8;
      for (let j = 0; j < 256; j += 32) {
        const colorB = colorSequenceB(j / 32);
        gridElements.push(...drawRow(colorB, startX + j));
      }
    }

    const startX = 768;
    for (let j = 0; j < 128; j += 32) {
      const colorB = colorSequenceB(j / 32);
      gridElements.push(...drawRow(colorB, startX + j));
    }

    return gridElements;
  };

  return (
    <div className="app">
      <div className="input-section">
        <h2>Input Hex Codes:</h2>
        {colors.map((color, index) => (
          <input
            key={index}
            type="text"
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
            placeholder={`#FFFFFF`}
            maxLength={7}
          />
        ))}
      </div>
      <div className="output-section">
        <h2>Selveldge Scarf by Julia Wilkins:</h2>
        <div className="drawing-panel">{renderGrid()}</div>
      </div>
    </div>
  );
}

export default App;
