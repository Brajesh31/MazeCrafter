import React from 'react';
import { Clock, FootprintsIcon, History } from 'lucide-react';

interface StatPanelProps {
  steps: number;
  time: number;
  visitedCells: number;
  totalCells: number;
}

const StatPanel: React.FC<StatPanelProps> = ({
  steps,
  time,
  visitedCells,
  totalCells,
}) => {
  // Format time to display in seconds with 1 decimal place
  const formattedTime = (time / 1000).toFixed(1);
  
  // Calculate visited percentage
  const visitedPercentage = totalCells > 0 
    ? Math.round((visitedCells / totalCells) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex flex-wrap justify-center gap-4 mb-6 max-w-4xl mx-auto">
      <div className="flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg">
        <FootprintsIcon className="h-5 w-5 text-primary-500 mr-2" />
        <div>
          <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">Steps</h3>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{steps}</p>
        </div>
      </div>
      
      <div className="flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg">
        <Clock className="h-5 w-5 text-accent-500 mr-2" />
        <div>
          <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">Time</h3>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{formattedTime}s</p>
        </div>
      </div>
      
      <div className="flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg">
        <History className="h-5 w-5 text-secondary-500 mr-2" />
        <div>
          <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">Visited</h3>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {visitedCells} / {totalCells} ({visitedPercentage}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatPanel;