import React, { useState, useEffect } from 'react';
import { Save, Trash, Play, Eye } from 'lucide-react';
import { Maze } from '../types/maze';

const SavedMazes: React.FC = () => {
  const [mazes, setMazes] = useState<Maze[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dummy data for now - will be replaced with API call
  useEffect(() => {
    const dummyMazes: Maze[] = [
      {
        id: '1',
        name: 'Classic 20x20',
        rows: 20,
        cols: 20,
        grid: [],
        algorithm: 'DFS',
        createdAt: '2025-05-15T10:30:00Z',
      },
      {
        id: '2',
        name: 'Large 40x40',
        rows: 40,
        cols: 40,
        grid: [],
        algorithm: 'Prim',
        createdAt: '2025-05-14T14:20:00Z',
      },
      {
        id: '3',
        name: 'Small 10x10',
        rows: 10,
        cols: 10,
        grid: [],
        algorithm: 'Kruskal',
        createdAt: '2025-05-13T09:15:00Z',
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setMazes(dummyMazes);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleViewMaze = (id: string) => {
    alert(`View maze ${id} (will be implemented with backend integration)`);
  };

  const handlePlayMaze = (id: string) => {
    alert(`Play maze ${id} (will be implemented with backend integration)`);
  };

  const handleDeleteMaze = (id: string) => {
    alert(`Delete maze ${id} (will be implemented with backend integration)`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Save className="h-7 w-7 text-primary-500 mr-2" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Saved Mazes
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : mazes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow">
          <Save className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            No saved mazes yet
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Generate and save a maze to see it here!
          </p>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            Go to Maze Creator
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {mazes.map(maze => (
            <div 
              key={maze.id} 
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                      {maze.name}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(maze.createdAt || '')}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
                    {maze.algorithm}
                  </span>
                </div>
                
                <div className="mt-3 flex items-center text-sm text-slate-700 dark:text-slate-300">
                  <span className="mr-4">Size: {maze.rows}×{maze.cols}</span>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleViewMaze(maze.id || '')}
                    className="flex items-center justify-center px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => handlePlayMaze(maze.id || '')}
                    className="flex items-center justify-center px-3 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Play
                  </button>
                  <button
                    onClick={() => handleDeleteMaze(maze.id || '')}
                    className="flex items-center justify-center px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && mazes.length > 0 && (
        <div className="mt-8 p-4 bg-primary-50 dark:bg-slate-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
            Share your mazes
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            Challenge your friends to solve your custom mazes by sharing them directly from the maze view!
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedMazes;