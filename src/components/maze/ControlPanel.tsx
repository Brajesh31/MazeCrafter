import React from 'react';
import { Check, Rotate3D as Rotate, Play, Save, Upload, RefreshCw } from 'lucide-react';
import { GenerationAlgorithm, SolvingAlgorithm } from '../../types/maze';

interface ControlPanelProps {
  rows: number;
  cols: number;
  onSizeChange: (rows: number, cols: number) => void;
  generationAlgorithm: GenerationAlgorithm;
  onGenerationAlgorithmChange: (algorithm: GenerationAlgorithm) => void;
  solvingAlgorithm: SolvingAlgorithm;
  onSolvingAlgorithmChange: (algorithm: SolvingAlgorithm) => void;
  onGenerateMaze: () => void;
  onSolveMaze: () => void;
  onReset: () => void;
  animationSpeed: number;
  onAnimationSpeedChange: (speed: number) => void;
  onSaveMaze: () => void;
  onLoadMaze: () => void;
  isSolving: boolean;
  isGenerating: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  rows,
  cols,
  onSizeChange,
  generationAlgorithm,
  onGenerationAlgorithmChange,
  solvingAlgorithm,
  onSolvingAlgorithmChange,
  onGenerateMaze,
  onSolveMaze,
  onReset,
  animationSpeed,
  onAnimationSpeedChange,
  onSaveMaze,
  onLoadMaze,
  isSolving,
  isGenerating,
}) => {
  // Options for generation algorithms
  const generationAlgorithms: GenerationAlgorithm[] = [
    'DFS',
    'BFS',
    'Prim',
    'Kruskal',
    'RecursiveDivision',
    'AldousBroder',
  ];

  // Options for solving algorithms
  const solvingAlgorithms: SolvingAlgorithm[] = [
    'DFS',
    'BFS',
    'AStar',
    'Dijkstra',
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md mx-auto mb-6 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Maze Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Maze Size: {rows} × {cols}
            </label>
            <input
              type="range"
              min="5"
              max="40"
              value={rows}
              onChange={(e) => {
                const size = parseInt(e.target.value);
                onSizeChange(size, size);
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
          </div>

          {/* Generation Algorithm */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Generation Algorithm
            </label>
            <select
              value={generationAlgorithm}
              onChange={(e) => onGenerationAlgorithmChange(e.target.value as GenerationAlgorithm)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {generationAlgorithms.map((algo) => (
                <option key={algo} value={algo}>
                  {algo}
                </option>
              ))}
            </select>
          </div>

          {/* Solving Algorithm */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Solving Algorithm
            </label>
            <select
              value={solvingAlgorithm}
              onChange={(e) => onSolvingAlgorithmChange(e.target.value as SolvingAlgorithm)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {solvingAlgorithms.map((algo) => (
                <option key={algo} value={algo}>
                  {algo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Animation Speed */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Animation Speed: {animationSpeed}×
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={animationSpeed}
              onChange={(e) => onAnimationSpeedChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onGenerateMaze}
              disabled={isGenerating}
              className="flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Rotate className="mr-2 h-5 w-5" />
                  Generate
                </>
              )}
            </button>
            <button
              onClick={onSolveMaze}
              disabled={isSolving || isGenerating}
              className="flex items-center justify-center px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSolving ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Solving...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Solve
                </>
              )}
            </button>
          </div>

          {/* Secondary Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onReset}
              className="flex items-center justify-center px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-colors"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </button>
            <button
              onClick={onSaveMaze}
              className="flex items-center justify-center px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </button>
            <button
              onClick={onLoadMaze}
              className="flex items-center justify-center px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-colors"
            >
              <Upload className="mr-2 h-4 w-4" />
              Load
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;