import { MazeGrid, Cell, Position, SolvingAlgorithm } from '../types/maze';

/**
 * Check if position is valid for movement
 */
const isValidMove = (
  grid: MazeGrid,
  current: Position,
  direction: number
): boolean => {
  const { row, col } = current;
  return !grid[row][col].walls[direction];
};

/**
 * Get valid neighboring cells based on open passages (no walls between cells)
 */
const getValidNeighbors = (
  grid: MazeGrid,
  position: Position
): Position[] => {
  const { row, col } = position;
  const neighbors: Position[] = [];
  const directions = [
    { row: -1, col: 0, wallIndex: 0 }, // top
    { row: 0, col: 1, wallIndex: 1 },  // right
    { row: 1, col: 0, wallIndex: 2 },  // bottom
    { row: 0, col: -1, wallIndex: 3 }, // left
  ];

  for (let i = 0; i < directions.length; i++) {
    const dir = directions[i];
    const newRow = row + dir.row;
    const newCol = col + dir.col;

    // Check if neighbor is valid and there's no wall in the way
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      isValidMove(grid, position, dir.wallIndex)
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
};

/**
 * Calculate Manhattan distance between two points (for A* algorithm)
 */
const manhattanDistance = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col);
};

/**
 * Solve maze using Depth-First Search (DFS)
 */
export const solveDFS = (
  grid: MazeGrid,
  start: Position,
  end: Position
): { path: Position[]; visitedCells: Position[] } => {
  const visitedCells: Position[] = [];
  const stack: Position[] = [start];
  const visited: boolean[][] = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill(false));
  
  // Keep track of parent cells for reconstructing path
  const parent: Record<string, Position | null> = {};
  parent[`${start.row},${start.col}`] = null;
  
  visited[start.row][start.col] = true;
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    visitedCells.push(current);
    
    // If we've reached the end, reconstruct the path
    if (current.row === end.row && current.col === end.col) {
      // Reconstruct path
      const path: Position[] = [];
      let curr: Position | null = end;
      
      while (curr !== null) {
        path.unshift(curr);
        const key = `${curr.row},${curr.col}`;
        curr = parent[key];
      }
      
      return { path, visitedCells };
    }
    
    // Get valid neighbors
    const neighbors = getValidNeighbors(grid, current);
    
    // Add unvisited neighbors to stack
    for (const neighbor of neighbors) {
      if (!visited[neighbor.row][neighbor.col]) {
        visited[neighbor.row][neighbor.col] = true;
        parent[`${neighbor.row},${neighbor.col}`] = current;
        stack.push(neighbor);
      }
    }
  }
  
  // No path found
  return { path: [], visitedCells };
};

/**
 * Solve maze using Breadth-First Search (BFS)
 */
export const solveBFS = (
  grid: MazeGrid,
  start: Position,
  end: Position
): { path: Position[]; visitedCells: Position[] } => {
  const visitedCells: Position[] = [];
  const queue: Position[] = [start];
  const visited: boolean[][] = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill(false));
  
  // Keep track of parent cells for reconstructing path
  const parent: Record<string, Position | null> = {};
  parent[`${start.row},${start.col}`] = null;
  
  visited[start.row][start.col] = true;
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedCells.push(current);
    
    // If we've reached the end, reconstruct the path
    if (current.row === end.row && current.col === end.col) {
      // Reconstruct path
      const path: Position[] = [];
      let curr: Position | null = end;
      
      while (curr !== null) {
        path.unshift(curr);
        const key = `${curr.row},${curr.col}`;
        curr = parent[key];
      }
      
      return { path, visitedCells };
    }
    
    // Get valid neighbors
    const neighbors = getValidNeighbors(grid, current);
    
    // Add unvisited neighbors to queue
    for (const neighbor of neighbors) {
      if (!visited[neighbor.row][neighbor.col]) {
        visited[neighbor.row][neighbor.col] = true;
        parent[`${neighbor.row},${neighbor.col}`] = current;
        queue.push(neighbor);
      }
    }
  }
  
  // No path found
  return { path: [], visitedCells };
};

/**
 * Solve maze using A* algorithm
 */
export const solveAStar = (
  grid: MazeGrid,
  start: Position,
  end: Position
): { path: Position[]; visitedCells: Position[] } => {
  const visitedCells: Position[] = [];
  
  // Priority queue implementation (simplified)
  const openSet: Position[] = [start];
  const closedSet: Set<string> = new Set();
  
  // Keep track of g scores (cost from start) and f scores (g + heuristic)
  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};
  
  // Keep track of parent cells for reconstructing path
  const parent: Record<string, Position | null> = {};
  
  // Initialize scores
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const key = `${row},${col}`;
      gScore[key] = Infinity;
      fScore[key] = Infinity;
    }
  }
  
  const startKey = `${start.row},${start.col}`;
  gScore[startKey] = 0;
  fScore[startKey] = manhattanDistance(start, end);
  parent[startKey] = null;
  
  while (openSet.length > 0) {
    // Find node with lowest f score
    let current = openSet[0];
    let lowestFScore = fScore[`${current.row},${current.col}`];
    let currentIndex = 0;
    
    for (let i = 1; i < openSet.length; i++) {
      const pos = openSet[i];
      const key = `${pos.row},${pos.col}`;
      
      if (fScore[key] < lowestFScore) {
        lowestFScore = fScore[key];
        current = pos;
        currentIndex = i;
      }
    }
    
    visitedCells.push(current);
    
    // If we've reached the end, reconstruct the path
    if (current.row === end.row && current.col === end.col) {
      // Reconstruct path
      const path: Position[] = [];
      let curr: Position | null = end;
      
      while (curr !== null) {
        path.unshift(curr);
        const key = `${curr.row},${curr.col}`;
        curr = parent[key];
      }
      
      return { path, visitedCells };
    }
    
    // Remove current from open set and add to closed set
    openSet.splice(currentIndex, 1);
    closedSet.add(`${current.row},${current.col}`);
    
    // Get valid neighbors
    const neighbors = getValidNeighbors(grid, current);
    
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`;
      
      // Skip if neighbor is already in closed set
      if (closedSet.has(neighborKey)) {
        continue;
      }
      
      // Calculate tentative g score
      const tentativeGScore = gScore[`${current.row},${current.col}`] + 1;
      
      // If neighbor is not in open set, add it
      const inOpenSet = openSet.some(
        pos => pos.row === neighbor.row && pos.col === neighbor.col
      );
      
      if (!inOpenSet) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= gScore[neighborKey]) {
        // Not a better path
        continue;
      }
      
      // This is the best path until now, record it
      parent[neighborKey] = current;
      gScore[neighborKey] = tentativeGScore;
      fScore[neighborKey] = gScore[neighborKey] + manhattanDistance(neighbor, end);
    }
  }
  
  // No path found
  return { path: [], visitedCells };
};

/**
 * Solve maze using Dijkstra's algorithm
 */
export const solveDijkstra = (
  grid: MazeGrid,
  start: Position,
  end: Position
): { path: Position[]; visitedCells: Position[] } => {
  const visitedCells: Position[] = [];
  
  // Priority queue implementation (simplified)
  const queue: Position[] = [start];
  const distance: Record<string, number> = {};
  
  // Keep track of parent cells for reconstructing path
  const parent: Record<string, Position | null> = {};
  
  // Initialize distances
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const key = `${row},${col}`;
      distance[key] = Infinity;
    }
  }
  
  const startKey = `${start.row},${start.col}`;
  distance[startKey] = 0;
  parent[startKey] = null;
  
  while (queue.length > 0) {
    // Find node with smallest distance
    let smallestDistIndex = 0;
    for (let i = 1; i < queue.length; i++) {
      const key1 = `${queue[i].row},${queue[i].col}`;
      const key2 = `${queue[smallestDistIndex].row},${queue[smallestDistIndex].col}`;
      
      if (distance[key1] < distance[key2]) {
        smallestDistIndex = i;
      }
    }
    
    const current = queue[smallestDistIndex];
    queue.splice(smallestDistIndex, 1);
    visitedCells.push(current);
    
    // If we've reached the end, reconstruct the path
    if (current.row === end.row && current.col === end.col) {
      // Reconstruct path
      const path: Position[] = [];
      let curr: Position | null = end;
      
      while (curr !== null) {
        path.unshift(curr);
        const key = `${curr.row},${curr.col}`;
        curr = parent[key];
      }
      
      return { path, visitedCells };
    }
    
    // Get valid neighbors
    const neighbors = getValidNeighbors(grid, current);
    
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`;
      const currentKey = `${current.row},${current.col}`;
      
      // Calculate new distance
      const newDist = distance[currentKey] + 1;
      
      if (newDist < distance[neighborKey]) {
        distance[neighborKey] = newDist;
        parent[neighborKey] = current;
        
        // Add to queue if not already in queue
        const inQueue = queue.some(
          pos => pos.row === neighbor.row && pos.col === neighbor.col
        );
        
        if (!inQueue) {
          queue.push(neighbor);
        }
      }
    }
  }
  
  // No path found
  return { path: [], visitedCells };
};

/**
 * Solve maze using selected algorithm
 */
export const solveMaze = (
  algorithm: SolvingAlgorithm,
  grid: MazeGrid,
  start: Position,
  end: Position
): { path: Position[]; visitedCells: Position[] } => {
  switch (algorithm) {
    case 'DFS':
      return solveDFS(grid, start, end);
    case 'BFS':
      return solveBFS(grid, start, end);
    case 'AStar':
      return solveAStar(grid, start, end);
    case 'Dijkstra':
      return solveDijkstra(grid, start, end);
    default:
      return solveBFS(grid, start, end);
  }
};