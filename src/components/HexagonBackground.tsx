import React from 'react';

const HexagonBackground = () => {
  const rows = 25;
  const hexagonsPerRow = 30;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="hexagon-grid">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="hexagon-row"
          >
            {Array.from({ length: hexagonsPerRow }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="hexagon"
                style={{
                  opacity: Math.random() * 0.3 + 0.2
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HexagonBackground;