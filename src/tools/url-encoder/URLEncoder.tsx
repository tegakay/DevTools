import { useState } from 'react';

const URLEncoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodingType, setEncodingType] = useState<'component' | 'full'>('component');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeURIComponentSafe = (text: string) => {
    try {
      return encodeURIComponent(text);
    } catch (err) {
      throw new Error('Failed to encode: Invalid characters');
    }
  };

  const decodeURIComponentSafe = (text: string) => {
    try {
      return decodeURIComponent(text);
    } catch (err) {
      throw new Error('Failed to decode: Invalid URL encoding');
    }
  };

  const encodeURISafe = (text: string) => {
    try {
      return encodeURI(text);
    } catch (err) {
      throw new Error('Failed to encode: Invalid URI');
    }
  };

  const decodeURISafe = (text: string) => {
    try {
      return decodeURI(text);
    } catch (err) {
      throw new Error('Failed to decode: Invalid URI encoding');
    }
  };

  const handleProcess = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      let result: string;
      if (mode === 'encode') {
        result = encodingType === 'component' ? encodeURIComponentSafe(input) : encodeURISafe(input);
      } else {
        result = encodingType === 'component' ? decodeURIComponentSafe(input) : decodeURISafe(input);
      }
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">URL Encoder</h1>

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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Encoding Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="encodingType"
                  value="component"
                  checked={encodingType === 'component'}
                  onChange={() => setEncodingType('component')}
                  className="mr-2"
                />
                URI Component
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="encodingType"
                  value="full"
                  checked={encodingType === 'full'}
                  onChange={() => setEncodingType('full')}
                  className="mr-2"
                />
                Full URI
              </label>
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL to decode...'}
          />

          <button
            onClick={handleProcess}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'encode' ? 'Encoded URL' : 'Decoded Text'}
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
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Encoding Types:</h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>URI Component:</strong> Encodes characters that have special meaning in URIs</li>
              <li>• <strong>Full URI:</strong> Encodes entire URI, preserving protocol and domain structure</li>
              <li>• Use Component for query parameters, Full for complete URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLEncoder;