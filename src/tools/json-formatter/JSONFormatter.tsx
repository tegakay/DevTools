import { useState } from 'react';

const JSONFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setOutput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const copyToClipboard = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JSON Formatter</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Input JSON
            </label>
            <div className="flex space-x-2">
              <button
                onClick={formatJSON}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Format
              </button>
              <button
                onClick={minifyJSON}
                className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Minify
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
            placeholder="Paste your JSON here..."
          />
        </div>

        {/* Output Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output JSON
            </label>
            <button
              onClick={copyToClipboard}
              disabled={!output}
              className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors"
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default JSONFormatter;