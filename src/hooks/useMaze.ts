import { useState, useCallback, useEffect } from 'react';
import { 
  MazeGrid, 
  Cell, 
  Position, 
  GenerationAlgorithm, 
  SolvingAlgorithm 
} from '../types/maze';
import { generateMaze, initializeGrid } from '../utils/mazeGenerators';
import { solveMaze } from '../utils/mazeSolvers';

interface UseMazeParams {
  initialRows?: number;
  initialCols?: number;
  initialGenerationAlgorithm?: GenerationAlgorithm;
  initialSolvingAlgorithm?: SolvingAlgorithm;
}

interface UseMazeResult {
  grid: MazeGrid;
  rows: number;
  cols: number;
  startPosition: Position | undefined;
  endPosition: Position | undefined;
  generationAlgorithm: GenerationAlgorithm;
  solvingAlgorithm: SolvingAlgorithm;
  animationSpeed: number;
  visitedCells: Position[];
  pathCells: Position[];
  steps: number;
  time: number;
  isGenerating: boolean;
  isSolving: boolean;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  setGenerationAlgorithm: (algorithm: GenerationAlgorithm) => void;
  setSolvingAlgorithm: (algorithm: SolvingAlgorithm) => void;
  setAnimationSpeed: (speed: number) => void;
  generateNewMaze: () => void;
  solveMazeWithSelectedAlgorithm: () => void;
  resetMaze: () => void;
  setStartPosition: (position: Position) => void;
  setEndPosition: (position: Position) => void;
  handleCellClick: (row: number, col: number) => void;
}

export const useMaze = ({
  initialRows = 20,
  initialCols = 20,
  initialGenerationAlgorithm = 'DFS',
  initialSolvingAlgorithm = 'BFS',
}: UseMazeParams = {}): UseMazeResult => {
  const [rows, setRows] = useState<number>(initialRows);
  const [cols, setCols] = useState<number>(initialCols);
  const [grid, setGrid] = useState<MazeGrid>(initializeGrid(rows, cols));
  const [startPosition, setStartPosition] = useState<Position | undefined>();
  const [endPosition, setEndPosition] = useState<Position | undefined>();
  const [generationAlgorithm, setGenerationAlgorithm] = useState<GenerationAlgorithm>(initialGenerationAlgorithm);
  const [solvingAlgorithm, setSolvingAlgorithm] = useState<SolvingAlgorithm>(initialSolvingAlgorithm);
  const [visitedCells, setVisitedCells] = useState<Position[]>([]);
  const [pathCells, setPathCells] = useState<Position[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState<number>(10);
  const [steps, setSteps] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [selectionMode, setSelectionMode] = useState<'start' | 'end' | 'none'>('none');

  // Generate a new maze
  const generateNewMaze = useCallback(() => {
    setIsGenerating(true);
    setVisitedCells([]);
    setPathCells([]);
    setSteps(0);
    setTime(0);
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const newGrid = generateMaze(generationAlgorithm, rows, cols);
        setGrid(newGrid);
        
        // Reset start and end positions
        setStartPosition(undefined);
        setEndPosition(undefined);
        
        // Set default start and end positions
        const startRow = 0;
        const startCol = 0;
        const endRow = rows - 1;
        const endCol = cols - 1;
        
        setStartPosition({ row: startRow, col: startCol });
        setEndPosition({ row: endRow, col: endCol });
      } finally {
        setIsGenerating(false);
      }
    }, 50);
  }, [rows, cols, generationAlgorithm]);

  // Solve the maze
  const solveMazeWithSelectedAlgorithm = useCallback(() => {
    if (!startPosition || !endPosition || isSolving) return;
    
    setIsSolving(true);
    setVisitedCells([]);
    setPathCells([]);
    
    const startTime = Date.now();
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const { path, visitedCells: visited } = solveMaze(
          solvingAlgorithm,
          grid,
          startPosition,
          endPosition
        );
        
        const endTime = Date.now();
        setTime(endTime - startTime);
        setSteps(path.length);
        setVisitedCells(visited);
        setPathCells(path);
      } finally {
        setIsSolving(false);
      }
    }, 50);
  }, [grid, startPosition, endPosition, solvingAlgorithm, isSolving]);

  // Reset the maze
  const resetMaze = useCallback(() => {
    setVisitedCells([]);
    setPathCells([]);
    setSteps(0);
    setTime(0);
  }, []);

  // Handle cell click for setting start/end positions
  const handleCellClick = useCallback((row: number, col: number) => {
    const position = { row, col };
    
    // If clicking on start position, enter start selection mode
    if (
      startPosition &&
      startPosition.row === row &&
      startPosition.col === col
    ) {
      setSelectionMode('start');
      return;
    }
    
    // If clicking on end position, enter end selection mode
    if (
      endPosition &&
      endPosition.row === row &&
      endPosition.col === col
    ) {
      setSelectionMode('end');
      return;
    }
    
    // If in selection mode, set the position accordingly
    if (selectionMode === 'start') {
      setStartPosition(position);
      setSelectionMode('none');
    } else if (selectionMode === 'end') {
      setEndPosition(position);
      setSelectionMode('none');
    } else {
      // If not in selection mode and not clicking on start/end,
      // determine which one to set based on what's already set
      if (!startPosition) {
        setStartPosition(position);
      } else if (!endPosition) {
        setEndPosition(position);
      } else {
        // Both already set, toggle between them
        const distToStart = Math.abs(row - startPosition.row) + Math.abs(col - startPosition.col);
        const distToEnd = Math.abs(row - endPosition.row) + Math.abs(col - endPosition.col);
        
        if (distToStart <= distToEnd) {
          setStartPosition(position);
        } else {
          setEndPosition(position);
        }
      }
    }
    
    // Reset solution when start/end changes
    setVisitedCells([]);
    setPathCells([]);
    setSteps(0);
    setTime(0);
  }, [startPosition, endPosition, selectionMode]);

  // Update grid when rows/cols change
  useEffect(() => {
    setGrid(initializeGrid(rows, cols));
    setStartPosition(undefined);
    setEndPosition(undefined);
    setVisitedCells([]);
    setPathCells([]);
    setSteps(0);
    setTime(0);
  }, [rows, cols]);

  return {
    grid,
    rows,
    cols,
    startPosition,
    endPosition,
    generationAlgorithm,
    solvingAlgorithm,
    animationSpeed,
    visitedCells,
    pathCells,
    steps,
    time,
    isGenerating,
    isSolving,
    setRows,
    setCols,
    setGenerationAlgorithm,
    setSolvingAlgorithm,
    setAnimationSpeed,
    generateNewMaze,
    solveMazeWithSelectedAlgorithm,
    resetMaze,
    setStartPosition,
    setEndPosition,
    handleCellClick,
  };
};