import React, { useRef, useEffect, useState } from 'react';
import { MazeGrid, Position } from '../../types/maze';

interface MazeCanvasProps {
  grid: MazeGrid;
  cellSize?: number;
  pathCells?: Position[];
  visitedCells?: Position[];
  startPosition?: Position;
  endPosition?: Position;
  onCellClick?: (row: number, col: number) => void;
  animationSpeed?: number;
  showAnimation?: boolean;
}

const MazeCanvas: React.FC<MazeCanvasProps> = ({
  grid,
  cellSize = 20,
  pathCells = [],
  visitedCells = [],
  startPosition,
  endPosition,
  onCellClick,
  animationSpeed = 10,
  showAnimation = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationState, setAnimationState] = useState<{
    visitedIndex: number;
    pathIndex: number;
  }>({
    visitedIndex: 0,
    pathIndex: 0,
  });

  const rows = grid.length;
  const cols = rows > 0 ? grid[0].length : 0;
  
  const canvasWidth = cols * cellSize;
  const canvasHeight = rows * cellSize;

  // Draw the maze
  const drawMaze = (ctx: CanvasRenderingContext2D, animateVisited: number = -1, animatePath: number = -1) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Theme colors
    const isDarkMode = document.documentElement.classList.contains('dark');
    const wallColor = isDarkMode ? '#e2e8f0' : '#1e293b';
    const bgColor = isDarkMode ? '#0f172a' : '#f8fafc';
    const visitedColor = isDarkMode ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.2)';
    const pathColor = isDarkMode ? '#10b981' : '#059669';
    const startColor = '#3b82f6';
    const endColor = '#ef4444';
    
    // Draw the cells
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = grid[row][col];
        const x = col * cellSize;
        const y = row * cellSize;
        
        // Draw cell background
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, cellSize, cellSize);
        
        // Draw walls if they exist
        ctx.strokeStyle = wallColor;
        ctx.lineWidth = 2;
        
        // Top wall
        if (cell.walls[0]) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + cellSize, y);
          ctx.stroke();
        }
        
        // Right wall
        if (cell.walls[1]) {
          ctx.beginPath();
          ctx.moveTo(x + cellSize, y);
          ctx.lineTo(x + cellSize, y + cellSize);
          ctx.stroke();
        }
        
        // Bottom wall
        if (cell.walls[2]) {
          ctx.beginPath();
          ctx.moveTo(x, y + cellSize);
          ctx.lineTo(x + cellSize, y + cellSize);
          ctx.stroke();
        }
        
        // Left wall
        if (cell.walls[3]) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + cellSize);
          ctx.stroke();
        }
      }
    }
    
    // Draw visited cells up to the animation index
    if (visitedCells.length > 0) {
      const visLimit = animateVisited >= 0 ? animateVisited : visitedCells.length;
      
      for (let i = 0; i < visLimit; i++) {
        const { row, col } = visitedCells[i];
        const x = col * cellSize;
        const y = row * cellSize;
        
        ctx.fillStyle = visitedColor;
        ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
      }
    }
    
    // Draw solution path up to the animation index
    if (pathCells.length > 0) {
      const pathLimit = animatePath >= 0 ? animatePath : pathCells.length;
      
      for (let i = 0; i < pathLimit; i++) {
        const { row, col } = pathCells[i];
        const x = col * cellSize;
        const y = row * cellSize;
        
        ctx.fillStyle = pathColor;
        ctx.fillRect(x + 4, y + 4, cellSize - 8, cellSize - 8);
      }
    }
    
    // Draw start position
    if (startPosition) {
      const x = startPosition.col * cellSize;
      const y = startPosition.row * cellSize;
      
      ctx.fillStyle = startColor;
      ctx.beginPath();
      ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw end position
    if (endPosition) {
      const x = endPosition.col * cellSize;
      const y = endPosition.row * cellSize;
      
      ctx.fillStyle = endColor;
      ctx.beginPath();
      ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Handle animation effect
  useEffect(() => {
    if (!canvasRef.current || !showAnimation) {
      setAnimationState({ visitedIndex: visitedCells.length, pathIndex: pathCells.length });
      return;
    }
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Animate visited cells
    if (animationState.visitedIndex < visitedCells.length) {
      const timer = setTimeout(() => {
        setAnimationState(prev => ({
          ...prev,
          visitedIndex: prev.visitedIndex + 1,
        }));
      }, 1000 / animationSpeed);
      
      return () => clearTimeout(timer);
    }
    
    // Animate path cells after visited animation
    if (animationState.pathIndex < pathCells.length) {
      const timer = setTimeout(() => {
        setAnimationState(prev => ({
          ...prev,
          pathIndex: prev.pathIndex + 1,
        }));
      }, 2000 / animationSpeed);
      
      return () => clearTimeout(timer);
    }
  }, [animationState, visitedCells, pathCells, showAnimation, animationSpeed]);

  // Reset animation when grid changes
  useEffect(() => {
    setAnimationState({ visitedIndex: 0, pathIndex: 0 });
  }, [grid]);

  // Draw the maze whenever animation state changes
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    if (showAnimation) {
      drawMaze(ctx, animationState.visitedIndex, animationState.pathIndex);
    } else {
      drawMaze(ctx);
    }
  }, [grid, animationState, showAnimation, startPosition, endPosition]);

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onCellClick) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      onCellClick(row, col);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleCanvasClick}
        className="border border-slate-300 dark:border-slate-600 rounded-lg shadow-md"
      />
    </div>
  );
};

export default MazeCanvas;