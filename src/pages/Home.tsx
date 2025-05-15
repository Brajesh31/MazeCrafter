import React, { useEffect } from 'react';
import MazeCanvas from '../components/maze/MazeCanvas';
import ControlPanel from '../components/maze/ControlPanel';
import StatPanel from '../components/maze/StatPanel';
import { useMaze } from '../hooks/useMaze';

const Home: React.FC = () => {
  const {
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
    handleCellClick,
  } = useMaze();

  // Generate initial maze on component mount
  useEffect(() => {
    generateNewMaze();
  }, [generateNewMaze]);

  // Calculate cell size based on screen width
  const calculateCellSize = () => {
    const width = window.innerWidth;
    if (width < 640) return Math.min(12, 300 / rows); // Mobile
    if (width < 1024) return Math.min(16, 500 / rows); // Tablet
    return Math.min(20, 800 / rows); // Desktop
  };

  const cellSize = calculateCellSize();

  // Handle maze size change
  const handleSizeChange = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
  };

  // Handle save maze button click (placeholder for now)
  const handleSaveMaze = () => {
    alert('Save maze functionality will be implemented with backend integration.');
  };

  // Handle load maze button click (placeholder for now)
  const handleLoadMaze = () => {
    alert('Load maze functionality will be implemented with backend integration.');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">
        MazeCrafter
      </h1>
      <p className="text-center mb-6 text-slate-600 dark:text-slate-300">
        Generate, solve, and visualize mazes with different algorithms
      </p>

      <ControlPanel
        rows={rows}
        cols={cols}
        onSizeChange={handleSizeChange}
        generationAlgorithm={generationAlgorithm}
        onGenerationAlgorithmChange={setGenerationAlgorithm}
        solvingAlgorithm={solvingAlgorithm}
        onSolvingAlgorithmChange={setSolvingAlgorithm}
        onGenerateMaze={generateNewMaze}
        onSolveMaze={solveMazeWithSelectedAlgorithm}
        onReset={resetMaze}
        animationSpeed={animationSpeed}
        onAnimationSpeedChange={setAnimationSpeed}
        onSaveMaze={handleSaveMaze}
        onLoadMaze={handleLoadMaze}
        isSolving={isSolving}
        isGenerating={isGenerating}
      />

      {(visitedCells.length > 0 || pathCells.length > 0) && (
        <StatPanel
          steps={steps}
          time={time}
          visitedCells={visitedCells.length}
          totalCells={rows * cols}
        />
      )}

      <div className="flex justify-center mb-6 mt-4">
        <MazeCanvas
          grid={grid}
          cellSize={cellSize}
          pathCells={pathCells}
          visitedCells={visitedCells}
          startPosition={startPosition}
          endPosition={endPosition}
          onCellClick={handleCellClick}
          animationSpeed={animationSpeed}
          showAnimation={true}
        />
      </div>

      <div className="p-4 bg-primary-50 dark:bg-slate-800 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
          Instructions
        </h2>
        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            Click <strong>Generate</strong> to create a new maze with the selected algorithm
          </li>
          <li>
            Click <strong>Solve</strong> to find a path using the selected solving algorithm
          </li>
          <li>
            Click on the canvas to set <span className="text-primary-600 dark:text-primary-400">start</span> and <span className="text-red-600 dark:text-red-400">end</span> positions
          </li>
          <li>
            Adjust the <strong>Animation Speed</strong> slider to change visualization speed
          </li>
          <li>
            Use <strong>Reset</strong> to clear the solution while keeping the maze
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;