"use client";

import React, { useState, MouseEvent } from "react";

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  strokeWidth: number;
};

export default function Page() {
  const [lines, setLines] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);

  const handleMouseDown = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newLine = { x1: x, y1: y, x2: x, y2: y, color, strokeWidth };
    setCurrentLine(newLine);
    setIsDrawing(true);
  };

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !currentLine) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentLine({ ...currentLine, x2: x, y2: y });
  };

  const handleMouseUp = () => {
    if (currentLine) setLines([...lines, currentLine]);
    setIsDrawing(false);
    setCurrentLine(null);
  };

  const clearCanvas = () => {
    setLines([]);
  };

  const undo = () => {
    setLines(lines.slice(0, -1));
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ background: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
          <h1 style={{ marginTop: 0, color: "#333", textAlign: "center" }}>🎨 SVG Drawing Tool</h1>

          <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>Pen Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: "60px", height: "40px", border: "none", borderRadius: "6px", cursor: "pointer" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>Stroke Width: {strokeWidth}px</label>
              <input
                type="range"
                min="1"
                max="20"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                style={{ width: "150px" }}
              />
            </div>

            <button
              onClick={undo}
              disabled={lines.length === 0}
              style={{
                padding: "10px 20px",
                background: lines.length === 0 ? "#ccc" : "#ff9500",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: lines.length === 0 ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              ↶ Undo
            </button>

            <button
              onClick={clearCanvas}
              style={{
                padding: "10px 20px",
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🗑️ Clear
            </button>

            <div style={{ marginLeft: "auto", color: "#666", fontSize: "14px" }}>
              Lines drawn: <strong>{lines.length}</strong>
            </div>
          </div>

          <svg
            width="100%"
            height="500"
            viewBox="0 0 800 500"
            style={{
              border: "2px solid #333",
              background: "white",
              borderRadius: "8px",
              cursor: "crosshair",
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.1)",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {lines.map((line: Line, i: number) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                strokeLinecap="round"
              />
            ))}

            {currentLine && (
              <line
                x1={currentLine.x1}
                y1={currentLine.y1}
                x2={currentLine.x2}
                y2={currentLine.y2}
                stroke={currentLine.color}
                strokeWidth={currentLine.strokeWidth}
                strokeLinecap="round"
                opacity="0.7"
              />
            )}
          </svg>

          <div style={{ marginTop: "15px", fontSize: "13px", color: "#999", textAlign: "center" }}>
            Click and drag to draw • Use controls above to customize
          </div>
        </div>
      </div>
    </div>
  );
}
