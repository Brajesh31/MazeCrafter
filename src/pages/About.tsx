import React from 'react';
import { Info, Braces, Locate, Sparkles } from 'lucide-react';

interface AlgorithmInfo {
  name: string;
  type: 'generation' | 'solving';
  description: string;
  characteristics: string[];
  complexity: string;
}

const About: React.FC = () => {
  const algorithms: AlgorithmInfo[] = [
    {
      name: 'Depth-First Search (DFS)',
      type: 'generation',
      description: 'A maze generation algorithm that works by carving passages one at a time, always extending from the most recently visited cell that still has unvisited neighbors.',
      characteristics: [
        'Creates mazes with long, winding corridors',
        'Tends to have fewer branching paths',
        'Often results in mazes with a "river-like" structure',
      ],
      complexity: 'O(n) where n is the number of cells in the maze',
    },
    {
      name: 'Prim\'s Algorithm',
      type: 'generation',
      description: 'A minimum spanning tree algorithm adapted for maze generation. It starts with a grid of walls and removes walls to create a perfect maze.',
      characteristics: [
        'Creates mazes with shorter, more direct paths',
        'Tends to have many short dead ends',
        'Results in mazes with a "random" appearance',
      ],
      complexity: 'O(e log v) where e is the number of walls and v is the number of cells',
    },
    {
      name: 'Breadth-First Search (BFS)',
      type: 'solving',
      description: 'A solving algorithm that explores all neighbor cells at the present depth before moving on to cells at the next depth level.',
      characteristics: [
        'Guarantees the shortest path in an unweighted maze',
        'Explores cells in concentric "rings" from the start',
        'Uses more memory than DFS',
      ],
      complexity: 'O(v + e) where v is the number of vertices (cells) and e is the number of edges (passages)',
    },
    {
      name: 'A* Algorithm',
      type: 'solving',
      description: 'A best-first search algorithm that uses a heuristic to estimate the distance to the goal, prioritizing paths that seem most promising.',
      characteristics: [
        'Finds the shortest path in weighted or unweighted mazes',
        'More efficient than Dijkstra\'s for most mazes',
        'Uses a heuristic function (typically Manhattan distance)',
      ],
      complexity: 'O(e) where e is the number of edges, but performs better in practice due to the heuristic',
    },
    {
      name: 'Dijkstra\'s Algorithm',
      type: 'solving',
      description: 'A solving algorithm that finds the shortest path by building up a set of visited cells ordered by distance from the start.',
      characteristics: [
        'Guarantees the shortest path in weighted mazes',
        'Explores cells in order of increasing distance from start',
        'More computationally intensive than BFS for unweighted mazes',
      ],
      complexity: 'O(v² + e) where v is the number of vertices and e is the number of edges. With a priority queue: O(e log v)',
    },
  ];

  const generationAlgorithms = algorithms.filter(algo => algo.type === 'generation');
  const solvingAlgorithms = algorithms.filter(algo => algo.type === 'solving');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Info className="h-7 w-7 text-primary-500 mr-2" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          About MazeCrafter
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center">
          <Sparkles className="h-6 w-6 text-primary-500 mr-2" />
          What is MazeCrafter?
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          MazeCrafter is an interactive tool for generating, solving, and visualizing mazes using various algorithms. It helps users understand how different pathfinding and maze generation algorithms work through visual demonstrations.
        </p>
        
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Whether you're a computer science student learning about graph algorithms, a teacher looking for educational tools, or simply someone who enjoys puzzles, MazeCrafter provides an engaging way to explore the fascinating world of mazes and algorithms.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">Learn</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Understand how different algorithms work by visualizing their behavior
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">Create</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Generate custom mazes with various algorithms and sizes
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">Solve</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Watch different pathfinding algorithms solve your mazes step-by-step
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white flex items-center">
          <Braces className="h-6 w-6 text-secondary-500 mr-2" />
          Generation Algorithms
        </h2>

        <div className="space-y-6">
          {generationAlgorithms.map((algo, index) => (
            <div 
              key={index} 
              className="border-l-4 border-primary-500 pl-4 py-2"
            >
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                {algo.name}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                {algo.description}
              </p>
              
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Characteristics:
              </h4>
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 mb-2">
                {algo.characteristics.map((characteristic, i) => (
                  <li key={i}>{characteristic}</li>
                ))}
              </ul>
              
              <div className="text-sm text-slate-500 dark:text-slate-500">
                <strong>Time Complexity:</strong> {algo.complexity}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white flex items-center">
          <Locate className="h-6 w-6 text-accent-500 mr-2" />
          Solving Algorithms
        </h2>

        <div className="space-y-6">
          {solvingAlgorithms.map((algo, index) => (
            <div 
              key={index} 
              className="border-l-4 border-accent-500 pl-4 py-2"
            >
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                {algo.name}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                {algo.description}
              </p>
              
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Characteristics:
              </h4>
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 mb-2">
                {algo.characteristics.map((characteristic, i) => (
                  <li key={i}>{characteristic}</li>
                ))}
              </ul>
              
              <div className="text-sm text-slate-500 dark:text-slate-500">
                <strong>Time Complexity:</strong> {algo.complexity}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
          Get Involved
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          MazeCrafter is open source! Contribute to the project, suggest new features, or report issues on GitHub.
        </p>
        <div className="flex space-x-4">
          <a 
            href="#" 
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            GitHub Repository
          </a>
          <a 
            href="#" 
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Submit Feedback
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;