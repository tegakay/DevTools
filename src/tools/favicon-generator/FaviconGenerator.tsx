import { useEffect, useMemo, useState } from 'react';

const formatSize = (value: number) => Math.max(16, Math.min(512, value));

const FaviconGenerator = () => {
  const [size, setSize] = useState(64);
  const [bgColor, setBgColor] = useState('#1f2937');
  const [textColor, setTextColor] = useState('#ffffff');
  const [symbol, setSymbol] = useState('★');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [fontWeight, setFontWeight] = useState('700');
  const [dataUrl, setDataUrl] = useState('');
  const [copied, setCopied] = useState('');

  const canvasData = useMemo(() => {
    const canvasSize = formatSize(size);
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = Math.round(canvasSize * 0.6);
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillText(symbol || '', canvasSize / 2, canvasSize / 2);

    return canvas.toDataURL('image/png');
  }, [size, bgColor, textColor, symbol, fontFamily, fontWeight]);

  useEffect(() => {
    if (canvasData) {
      setDataUrl(canvasData);
    }
  }, [canvasData]);

  const downloadFavicon = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `favicon-${size}.png`;
    link.click();
  };

  const copyMarkup = async () => {
    if (!dataUrl) return;
    const markup = `<link rel="icon" href="${dataUrl}" sizes="${size}x${size}" type="image/png">`;
    try {
      await navigator.clipboard.writeText(markup);
      setCopied('Copied to clipboard!');
    } catch {
      setCopied('Copy failed; please paste manually.');
    }
    window.setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Favicon Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Size (px)
              <input
                type="number"
                value={size}
                min={16}
                max={512}
                onChange={(e) => setSize(formatSize(Number(e.target.value) || 64))}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Symbol or Text
              <input
                type="text"
                value={symbol}
                maxLength={3}
                onChange={(e) => setSymbol(e.target.value.slice(0, 3))}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="★"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Background Color
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="mt-1 h-10 w-full rounded-md p-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Text Color
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="mt-1 h-10 w-full rounded-md p-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Font Family
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Font Weight
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
              </select>
            </label>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={downloadFavicon}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Download PNG
            </button>
            <button
              onClick={copyMarkup}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Copy HTML Link
            </button>
            {copied && <span className="text-sm text-green-700 dark:text-green-300">{copied}</span>}
          </div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HTML Markup</label>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-auto text-gray-800 dark:text-gray-100">{`<link rel="icon" href="${dataUrl}" sizes="${size}x${size}" type="image/png">`}</pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preview</h2>
          <div className="h-32 w-32 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
            <img src={dataUrl} alt="Favicon preview" className="h-full w-full object-contain" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Data URL</h3>
            <textarea
              readOnly
              value={dataUrl}
              className="w-full h-36 p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaviconGenerator;
