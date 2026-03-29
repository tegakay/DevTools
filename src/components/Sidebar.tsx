import { Link, useLocation } from 'react-router-dom';
import { toolsData } from '../utils/toolsData';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <Link
          to="/tools"
          className={`block px-3 py-2 mb-4 rounded-md text-sm font-medium transition-colors ${
            location.pathname === '/tools'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All Tools
        </Link>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tools</h2>
        <nav className="space-y-2 max-h-96 overflow-y-auto">
          {toolsData.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === tool.path
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {tool.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;