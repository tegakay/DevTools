import { useState, useEffect } from 'react';

interface ColorFormat {
  name: string;
  value: string;
  label: string;
}

const ColorPicker = () => {
  const [color, setColor] = useState('#3b82f6');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const generateFormats = (hex: string): ColorFormat[] => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [];

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    return [
      { name: 'hex', value: hex.toUpperCase(), label: 'HEX' },
      { name: 'rgb', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, label: 'RGB' },
      { name: 'rgba', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`, label: 'RGBA' },
      { name: 'hsl', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, label: 'HSL' },
      { name: 'hsv', value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`, label: 'HSV' },
      { name: 'cmyk', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, label: 'CMYK' }
    ];
  };

  const formats = generateFormats(color);

  const copyToClipboard = async (value: string, formatName: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedFormat(formatName);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const presetColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
    '#ffc0cb', '#a52a2a', '#808080', '#000080', '#008000'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Color Picker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pick a Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preset Colors
            </label>
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => setColor(presetColor)}
                  className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Color Preview</h3>
            <div
              className="w-full h-32 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: color }}
            >
              {color.toUpperCase()}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Color Formats</h3>
          <div className="space-y-3">
            {formats.map((format) => (
              <div key={format.name} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{format.label}:</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-white">{format.value}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(format.value, format.name)}
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  {copiedFormat === format.name ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Usage Tips:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Click the color input to open your system's color picker</li>
              <li>• Click preset colors to quickly select common colors</li>
              <li>• Copy any format to use in your CSS, design tools, or code</li>
              <li>• The preview shows the selected color with its hex value</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;