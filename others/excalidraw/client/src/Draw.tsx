import React, { useEffect, useRef } from "react";
import { Canvas, Rect } from "fabric";

interface FabricCanvasProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const FabricCanvas: React.FC<FabricCanvasProps> = ({
  width = 500,
  height = 600,
  backgroundColor = "#ffffff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const opts = {
      backgroundColor,
      width,
      height,
    };
    const fabricCanvas = new Canvas(canvasRef.current, opts);
    fabricCanvasRef.current = fabricCanvas;

    const rectOpts = {
      left: 100,
      top: 100,
      fill: "blue",
      width: 80,
      height: 60,
    };

    const rect = new Rect(rectOpts);
    fabricCanvas.add(rect);

    return () => {
      fabricCanvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [width, height, backgroundColor]);

  return <canvas ref={canvasRef} />;
};

export default FabricCanvas;
