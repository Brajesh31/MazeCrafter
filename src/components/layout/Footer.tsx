import React from 'react';
import { Github, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 shadow-md mt-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-600 dark:text-slate-400 text-sm mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} MazeCrafter. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="Documentation"
            >
              <Code size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;