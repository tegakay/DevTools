import { useState, useMemo } from 'react';

const DiffChecker = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const diff = useMemo(() => {
    if (!text1 || !text2) return null;

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');

    const result: { type: 'added' | 'removed' | 'unchanged'; line: string }[] = [];

    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        if (line1) result.push({ type: 'unchanged', line: line1 });
      } else {
        if (line1) result.push({ type: 'removed', line: line1 });
        if (line2) result.push({ type: 'added', line: line2 });
      }
    }

    return result;
  }, [text1, text2]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Diff Checker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Original Text
          </label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            placeholder="Enter original text..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Modified Text
          </label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            placeholder="Enter modified text..."
          />
        </div>
      </div>

      {diff && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Differences</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 font-mono text-sm">
            {diff.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.type === 'added'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : item.type === 'removed'
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : 'text-gray-700 dark:text-gray-300'
                } px-2 py-1 rounded`}
              >
                {item.type === 'added' ? '+ ' : item.type === 'removed' ? '- ' : '  '}
                {item.line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffChecker;