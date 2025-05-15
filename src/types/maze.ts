export type Cell = {
  walls: [boolean, boolean, boolean, boolean]; // [top, right, bottom, left]
  visited?: boolean;
  inPath?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  distance?: number;
  explored?: boolean;
  parent?: { row: number; col: number } | null;
};

export type MazeGrid = Cell[][];

export type Position = {
  row: number;
  col: number;
};

export interface Maze {
  id?: string;
  name: string;
  rows: number;
  cols: number;
  grid: MazeGrid;
  algorithm: GenerationAlgorithm;
  createdAt?: string;
}

export type GenerationAlgorithm = 
  | 'DFS' 
  | 'BFS' 
  | 'Prim' 
  | 'Kruskal' 
  | 'RecursiveDivision'
  | 'AldousBroder';

export type SolvingAlgorithm = 
  | 'DFS' 
  | 'BFS' 
  | 'AStar' 
  | 'Dijkstra';

export type MazeAction = 
  | { type: 'GENERATE'; algorithm: GenerationAlgorithm; rows: number; cols: number }
  | { type: 'SOLVE'; algorithm: SolvingAlgorithm }
  | { type: 'RESET' }
  | { type: 'SET_START'; position: Position }
  | { type: 'SET_END'; position: Position }
  | { type: 'SET_CELL'; position: Position; cell: Partial<Cell> }
  | { type: 'UPDATE_GRID'; grid: MazeGrid }
  | { type: 'LOAD_MAZE'; maze: Maze };

export interface LeaderboardEntry {
  id?: string;
  username: string;
  algorithm: SolvingAlgorithm;
  steps: number;
  time: string;
  date: string;
}