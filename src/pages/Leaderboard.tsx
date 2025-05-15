import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Clock, FootprintsIcon, Calendar } from 'lucide-react';
import { LeaderboardEntry, SolvingAlgorithm } from '../types/maze';

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<SolvingAlgorithm | 'all'>('all');

  // Dummy data for now - will be replaced with API call
  useEffect(() => {
    const dummyEntries: LeaderboardEntry[] = [
      { 
        id: '1', 
        username: 'mazemaster', 
        algorithm: 'AStar', 
        steps: 87, 
        time: '2.5s', 
        date: '2025-05-14' 
      },
      { 
        id: '2', 
        username: 'pathfinder', 
        algorithm: 'BFS', 
        steps: 95, 
        time: '3.1s', 
        date: '2025-05-13' 
      },
      { 
        id: '3', 
        username: 'algorithmwhiz', 
        algorithm: 'AStar', 
        steps: 76, 
        time: '1.9s', 
        date: '2025-05-12' 
      },
      { 
        id: '4', 
        username: 'mazesolver', 
        algorithm: 'Dijkstra', 
        steps: 102, 
        time: '3.7s', 
        date: '2025-05-11' 
      },
      { 
        id: '5', 
        username: 'graphtheory', 
        algorithm: 'DFS', 
        steps: 125, 
        time: '4.2s', 
        date: '2025-05-10' 
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setEntries(dummyEntries);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter entries by algorithm
  const filteredEntries = filter === 'all'
    ? entries
    : entries.filter(entry => entry.algorithm === filter);

  // Sorted entries by steps (fewer is better)
  const sortedEntries = [...filteredEntries].sort((a, b) => a.steps - b.steps);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Leaderboard
        </h1>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${filter === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('AStar')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${filter === 'AStar'
              ? 'bg-primary-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
        >
          A*
        </button>
        <button
          onClick={() => setFilter('BFS')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${filter === 'BFS'
              ? 'bg-primary-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
        >
          BFS
        </button>
        <button
          onClick={() => setFilter('DFS')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${filter === 'DFS'
              ? 'bg-primary-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
        >
          DFS
        </button>
        <button
          onClick={() => setFilter('Dijkstra')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${filter === 'Dijkstra'
              ? 'bg-primary-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
        >
          Dijkstra
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : sortedEntries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow">
          <p className="text-slate-500 dark:text-slate-400">
            No entries found for the selected filter.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Algorithm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Steps
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {sortedEntries.map((entry, index) => (
                  <tr 
                    key={entry.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index === 0 ? (
                          <Medal className="h-5 w-5 text-yellow-500 mr-1" />
                        ) : index === 1 ? (
                          <Medal className="h-5 w-5 text-slate-400 mr-1" />
                        ) : index === 2 ? (
                          <Medal className="h-5 w-5 text-amber-600 mr-1" />
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400 font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {entry.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
                        {entry.algorithm}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <FootprintsIcon className="h-4 w-4 mr-1 text-accent-500" />
                        {entry.steps}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <Clock className="h-4 w-4 mr-1 text-secondary-500" />
                        {entry.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        {entry.date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-primary-50 dark:bg-slate-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
          How to get on the leaderboard
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Solve a maze and submit your score. The fastest solutions with the fewest steps will be featured!
        </p>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
          Submit Your Score
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;