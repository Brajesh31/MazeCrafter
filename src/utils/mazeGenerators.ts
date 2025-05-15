import { MazeGrid, Cell, GenerationAlgorithm } from '../types/maze';

/**
 * Helper to create an empty cell
 */
export const createCell = (): Cell => ({
  walls: [true, true, true, true], // [top, right, bottom, left]
  visited: false,
});

/**
 * Initialize empty maze grid with walls
 */
export const initializeGrid = (rows: number, cols: number): MazeGrid => {
  const grid: MazeGrid = [];
  
  for (let i = 0; i < rows; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(createCell());
    }
    grid.push(row);
  }
  
  return grid;
};

/**
 * Get random integer in range [min, max)
 */
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Get valid neighboring cells for DFS algorithm
 */
const getNeighbors = (
  grid: MazeGrid,
  row: number,
  col: number
): { row: number; col: number }[] => {
  const neighbors = [];
  const directions = [
    { row: -1, col: 0 }, // top
    { row: 0, col: 1 },  // right
    { row: 1, col: 0 },  // bottom
    { row: 0, col: -1 }, // left
  ];

  for (const dir of directions) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;

    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      !grid[newRow][newCol].visited
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
};

/**
 * Remove walls between two cells
 */
const removeWalls = (
  grid: MazeGrid,
  row1: number,
  col1: number,
  row2: number,
  col2: number
): void => {
  // Determine which walls to remove
  if (row1 - row2 === 1) {
    // Current is below neighbor, remove current's top and neighbor's bottom
    grid[row1][col1].walls[0] = false;
    grid[row2][col2].walls[2] = false;
  } else if (row1 - row2 === -1) {
    // Current is above neighbor, remove current's bottom and neighbor's top
    grid[row1][col1].walls[2] = false;
    grid[row2][col2].walls[0] = false;
  } else if (col1 - col2 === 1) {
    // Current is right of neighbor, remove current's left and neighbor's right
    grid[row1][col1].walls[3] = false;
    grid[row2][col2].walls[1] = false;
  } else if (col1 - col2 === -1) {
    // Current is left of neighbor, remove current's right and neighbor's left
    grid[row1][col1].walls[1] = false;
    grid[row2][col2].walls[3] = false;
  }
};

/**
 * Generate a maze using DFS (Recursive Backtracker)
 */
export const generateDFSMaze = (rows: number, cols: number): MazeGrid => {
  const grid = initializeGrid(rows, cols);
  const stack: { row: number; col: number }[] = [];
  
  // Start from a random cell
  const startRow = getRandomInt(0, rows);
  const startCol = getRandomInt(0, cols);
  
  grid[startRow][startCol].visited = true;
  stack.push({ row: startRow, col: startCol });
  
  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getNeighbors(grid, current.row, current.col);
    
    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }
    
    // Choose a random unvisited neighbor
    const randomIndex = getRandomInt(0, neighbors.length);
    const next = neighbors[randomIndex];
    
    // Mark the neighbor as visited
    grid[next.row][next.col].visited = true;
    
    // Remove walls between current and next
    removeWalls(grid, current.row, current.col, next.row, next.col);
    
    // Push the neighbor onto the stack
    stack.push(next);
  }

  // Reset visited flags for rendering
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].visited = false;
    }
  }
  
  return grid;
};

/**
 * Generate a maze using Prim's algorithm
 */
export const generatePrimMaze = (rows: number, cols: number): MazeGrid => {
  const grid = initializeGrid(rows, cols);
  const walls: { row1: number; col1: number; row2: number; col2: number }[] = [];
  
  // Start with a random cell
  const startRow = getRandomInt(0, rows);
  const startCol = getRandomInt(0, cols);
  
  grid[startRow][startCol].visited = true;
  
  // Add walls of the starting cell to the list
  if (startRow > 0) walls.push({ row1: startRow, col1: startCol, row2: startRow - 1, col2: startCol });
  if (startCol < cols - 1) walls.push({ row1: startRow, col1: startCol, row2: startRow, col2: startCol + 1 });
  if (startRow < rows - 1) walls.push({ row1: startRow, col1: startCol, row2: startRow + 1, col2: startCol });
  if (startCol > 0) walls.push({ row1: startRow, col1: startCol, row2: startRow, col2: startCol - 1 });
  
  while (walls.length > 0) {
    // Choose a random wall
    const randomIndex = getRandomInt(0, walls.length);
    const { row1, col1, row2, col2 } = walls[randomIndex];
    
    // If only one of the cells that the wall separates is visited
    if (grid[row1][col1].visited !== grid[row2][col2].visited) {
      // Remove the wall
      removeWalls(grid, row1, col1, row2, col2);
      
      // Mark the unvisited cell as visited
      if (!grid[row1][col1].visited) {
        grid[row1][col1].visited = true;
        
        // Add neighboring walls
        if (row1 > 0 && !grid[row1 - 1][col1].visited) 
          walls.push({ row1, col1, row2: row1 - 1, col2: col1 });
        if (col1 < cols - 1 && !grid[row1][col1 + 1].visited) 
          walls.push({ row1, col1, row2: row1, col2: col1 + 1 });
        if (row1 < rows - 1 && !grid[row1 + 1][col1].visited) 
          walls.push({ row1, col1, row2: row1 + 1, col2: col1 });
        if (col1 > 0 && !grid[row1][col1 - 1].visited) 
          walls.push({ row1, col1, row2: row1, col2: col1 - 1 });
      } else {
        grid[row2][col2].visited = true;
        
        // Add neighboring walls
        if (row2 > 0 && !grid[row2 - 1][col2].visited) 
          walls.push({ row1: row2, col1: col2, row2: row2 - 1, col2 });
        if (col2 < cols - 1 && !grid[row2][col2 + 1].visited) 
          walls.push({ row1: row2, col1: col2, row2, col2: col2 + 1 });
        if (row2 < rows - 1 && !grid[row2 + 1][col2].visited) 
          walls.push({ row1: row2, col1: col2, row2: row2 + 1, col2 });
        if (col2 > 0 && !grid[row2][col2 - 1].visited) 
          walls.push({ row1: row2, col1: col2, row2, col2: col2 - 1 });
      }
    }
    
    // Remove the processed wall
    walls.splice(randomIndex, 1);
  }
  
  // Reset visited flags for rendering
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].visited = false;
    }
  }
  
  return grid;
};

/**
 * Generate a maze using selected algorithm
 */
export const generateMaze = (
  algorithm: GenerationAlgorithm,
  rows: number,
  cols: number
): MazeGrid => {
  switch (algorithm) {
    case 'DFS':
      return generateDFSMaze(rows, cols);
    case 'Prim':
      return generatePrimMaze(rows, cols);
    // Other algorithms would be implemented in a similar fashion
    default:
      return generateDFSMaze(rows, cols);
  }
};