import { useState } from 'react';
import { motion } from 'framer-motion';

interface Match {
  fullMatch: string;
  index: number;
  groups: string[];
}

const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [globalFlag, setGlobalFlag] = useState(true);
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [multiline, setMultiline] = useState(false);
  const [singleLine, setSingleLine] = useState(false);
  const [error, setError] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [highlightedText, setHighlightedText] = useState('');

  const testRegex = () => {
    if (!pattern) {
      setError('Please enter a regex pattern');
      setMatches([]);
      setHighlightedText('');
      return;
    }

    try {
      let flags = '';
      if (globalFlag) flags += 'g';
      if (caseInsensitive) flags += 'i';
      if (multiline) flags += 'm';
      if (singleLine) flags += 's';

      const regex = new RegExp(pattern, flags);
      const foundMatches: Match[] = [];
      let match;
      const regexWithoutGlobal = new RegExp(pattern, flags.replace('g', ''));

      if (globalFlag) {
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            fullMatch: match[0],
            index: match.index,
            groups: match.slice(1).filter(Boolean),
          });
        }
      } else {
        match = regexWithoutGlobal.exec(testString);
        if (match) {
          foundMatches.push({
            fullMatch: match[0],
            index: match.index,
            groups: match.slice(1).filter(Boolean),
          });
        }
      }

      setMatches(foundMatches);
      setError('');
      highlightMatches(foundMatches);
    } catch (err) {
      setError('Invalid regex: ' + (err as Error).message);
      setMatches([]);
      setHighlightedText('');
    }
  };

  const highlightMatches = (matchList: Match[]) => {
    if (matchList.length === 0) {
      setHighlightedText(testString);
      return;
    }

    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;

    matchList.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({
          text: testString.substring(lastIndex, match.index),
          isMatch: false,
        });
      }
      parts.push({
        text: match.fullMatch,
        isMatch: true,
      });
      lastIndex = match.index + match.fullMatch.length;
    });

    if (lastIndex < testString.length) {
      parts.push({
        text: testString.substring(lastIndex),
        isMatch: false,
      });
    }

    setHighlightedText('');
    // This is just for display, we'll handle highlighting in render
  };

  const clearAll = () => {
    setPattern('');
    setTestString('');
    setError('');
    setMatches([]);
    setHighlightedText('');
    setGlobalFlag(true);
    setCaseInsensitive(false);
    setMultiline(false);
    setSingleLine(false);
  };

  const copyMatches = async () => {
    if (matches.length > 0) {
      const text = matches.map((m) => m.fullMatch).join('\n');
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Highlight matches in test string
  const renderHighlightedText = () => {
    if (!testString) return '';
    if (matches.length === 0) return testString;

    const parts: { text: string; isMatch: boolean; index: number }[] = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({
          text: testString.substring(lastIndex, match.index),
          isMatch: false,
          index: lastIndex,
        });
      }
      parts.push({
        text: match.fullMatch,
        isMatch: true,
        index: match.index,
      });
      lastIndex = match.index + match.fullMatch.length;
    });

    if (lastIndex < testString.length) {
      parts.push({
        text: testString.substring(lastIndex),
        isMatch: false,
        index: lastIndex,
      });
    }

    return parts;
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Regex Tester
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Left Column - Input and Options */}
        <div className="space-y-6">
          {/* Regex Pattern Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Regex Pattern
              </label>
              <button
                onClick={testRegex}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Test
              </button>
            </div>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && testRegex()}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
              placeholder="Enter your regex pattern..."
            />
          </div>

          {/* Flags */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Flags
            </h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={globalFlag}
                  onChange={(e) => setGlobalFlag(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Global (g) - Match all occurrences
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseInsensitive}
                  onChange={(e) => setCaseInsensitive(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Case Insensitive (i)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={multiline}
                  onChange={(e) => setMultiline(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Multiline (m) - ^ and $ match line boundaries
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={singleLine}
                  onChange={(e) => setSingleLine(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Dot All (s) - . matches newlines
                </span>
              </label>
            </div>
          </div>

          {/* Test String Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test String
            </label>
            <textarea
              value={testString}
              onChange={(e) => {
                setTestString(e.target.value);
                if (pattern) {
                  setTimeout(testRegex, 0);
                }
              }}
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
              placeholder="Enter the text to test against..."
            />
          </div>

          <button
            onClick={clearAll}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Highlighted Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Text Preview (Matches Highlighted)
            </label>
            <div className="w-full min-h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 font-mono text-sm break-words whitespace-pre-wrap">
              {testString.length === 0 ? (
                <span className="text-gray-400">Enter test string to see preview...</span>
              ) : (
                (() => {
                  const parts = renderHighlightedText();
                  return Array.isArray(parts)
                    ? parts.map((part, idx) => (
                        <span
                          key={idx}
                          className={
                            part.isMatch
                              ? 'bg-yellow-300 dark:bg-yellow-600 text-gray-900 dark:text-white font-semibold'
                              : 'text-gray-900 dark:text-gray-100'
                          }
                        >
                          {part.text}
                        </span>
                      ))
                    : parts;
                })()
              )}
            </div>
          </div>

          {/* Matches Info */}
          {error ? (
            <motion.div
              className="p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          ) : matches.length > 0 ? (
            <motion.div
              className="bg-green-50 dark:bg-green-900 p-4 rounded-md border border-green-200 dark:border-green-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-green-900 dark:text-green-100">
                  Matches Found: {matches.length}
                </h3>
                <button
                  onClick={copyMatches}
                  className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                >
                  Copy All
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {matches.map((match, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white dark:bg-gray-800 p-2 rounded text-xs border border-green-200 dark:border-green-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <div className="font-mono text-green-700 dark:text-green-300 break-all">
                      {match.fullMatch}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 mt-1">
                      Index: {match.index}
                    </div>
                    {match.groups.length > 0 && (
                      <div className="text-gray-600 dark:text-gray-300 mt-1">
                        Groups: {match.groups.join(', ')}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : testString && !error ? (
            <motion.div
              className="p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-200 rounded-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              No matches found
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegexTester;
