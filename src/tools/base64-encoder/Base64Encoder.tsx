import { useState } from 'react';

const Base64Encoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeBase64 = (text: string) => {
    try {
      return btoa(text);
    } catch (err) {
      throw new Error('Failed to encode: Invalid characters');
    }
  };

  const decodeBase64 = (text: string) => {
    try {
      return atob(text);
    } catch (err) {
      throw new Error('Failed to decode: Invalid Base64 string');
    }
  };

  const handleProcess = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      const result = mode === 'encode' ? encodeBase64(input) : decodeBase64(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput('');
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Base64 Encoder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="encode"
                checked={mode === 'encode'}
                onChange={() => setMode('encode')}
                className="mr-2"
              />
              Encode
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="decode"
                checked={mode === 'decode'}
                onChange={() => setMode('decode')}
                className="mr-2"
              />
              Decode
            </label>
            <button
              onClick={swapMode}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              ↔ Swap
            </button>
          </div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
          />

          <button
            onClick={handleProcess}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            placeholder="Output will appear here..."
          />

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Usage Notes:</h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Base64 encoding converts binary data to text</li>
              <li>• Use encode for sending binary data over text protocols</li>
              <li>• Use decode to convert Base64 back to original data</li>
              <li>• Invalid Base64 strings will show an error</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Encoder;