import { useMemo, useState } from 'react';

const defaultSVGContent = `<rect x="10" y="10" width="140" height="140" rx="16" fill="#3b82f6" stroke="#1e40af" stroke-width="6" />\n<circle cx="100" cy="60" r="30" fill="#facc15" />\n<text x="20" y="190" fill="#111827" font-family="monospace" font-size="20">SVG Generator</text>`;

const makeSvgString = (width: number, height: number, content: string) => {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n${content}\n</svg>`;
};

const validateSvg = (svgMarkup: string) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgMarkup, 'image/svg+xml');
    const error = doc.querySelector('parsererror');
    if (error) {
      throw new Error(error.textContent || 'Invalid SVG markup');
    }
    return null;
  } catch (err: unknown) {
    return err instanceof Error ? err.message : 'Invalid SVG markup';
  }
};

const SVGGenerator = () => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [innerSvg, setInnerSvg] = useState(defaultSVGContent);
  const [copyStatus, setCopyStatus] = useState('');

  const svgMarkup = useMemo(() => makeSvgString(width, height, innerSvg), [width, height, innerSvg]);
  const validationError = useMemo(() => validateSvg(svgMarkup), [svgMarkup]);

  const downloadSvg = () => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const copySvg = async () => {
    try {
      await navigator.clipboard.writeText(svgMarkup);
      setCopyStatus('Copied!');
    } catch (error) {
      setCopyStatus('Copy failed, use manual copy.');
    }
    setTimeout(() => setCopyStatus(''), 1800);
  };

  const encodedDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">SVG Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Canvas Size</label>
          <div className="flex gap-3 items-center mb-4">
            <input
              type="number"
              className="w-24 p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              min={16}
              value={width}
              onChange={(e) => setWidth(Math.max(16, Number(e.target.value) || 16))}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">x</span>
            <input
              type="number"
              className="w-24 p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              min={16}
              value={height}
              onChange={(e) => setHeight(Math.max(16, Number(e.target.value) || 16))}
            />
          </div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SVG Content (inner elements)</label>
          <textarea
            value={innerSvg}
            onChange={(e) => setInnerSvg(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono resize-none"
            placeholder="Enter SVG elements, e.g. <rect x='10' y='10' width='100' height='100' fill='red' />"
          />

          <div className="flex items-center gap-3 mt-4">
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
              onClick={copySvg}
              disabled={!!validationError}
            >
              Copy SVG
            </button>
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
              onClick={downloadSvg}
              disabled={!!validationError}
            >
              Download SVG
            </button>
            <a
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow break-all"
              href={encodedDataUri}
              download="generated.svg"
            >
              Download via Data URI
            </a>
            {copyStatus && <span className="text-sm text-green-700 dark:text-green-300">{copyStatus}</span>}
          </div>

          {validationError && (
            <p className="mt-3 text-sm text-red-700 dark:text-red-300">Validation Error: {validationError}</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h2>
          <div className="w-full h-64 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-900">
            {!validationError ? (
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            ) : (
              <div className="flex h-full items-center justify-center p-4">
                <span className="text-gray-500 dark:text-gray-400">Invalid SVG markup. Fix errors to preview.</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SVG Output</h3>
            <textarea
              value={svgMarkup}
              readOnly
              className="w-full h-48 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-100 font-mono resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SVGGenerator;
