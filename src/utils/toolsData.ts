export interface Tool {
  name: string;
  description: string;
  path: string;
  category: string;
}

export const toolsData: Tool[] = [
  // Code & JSON
  {
    name: 'Diff Checker',
    description: 'Compare text differences side-by-side',
    path: '/tools/diff-checker',
    category: 'Code & JSON',
  },
  {
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    path: '/tools/json-formatter',
    category: 'Code & JSON',
  },
  {
    name: 'Regex Tester',
    description: 'Test and debug regular expressions',
    path: '/tools/regex-tester',
    category: 'Code & JSON',
  },

  // Image & Graphics
  {
    name: 'Image Compressor',
    description: 'Compress and optimize images for web',
    path: '/tools/image-compressor',
    category: 'Image & Graphics',
  },
  {
    name: 'SVG Generator',
    description: 'Generate and edit SVG graphics',
    path: '/tools/svg-generator',
    category: 'Image & Graphics',
  },
  {
    name: 'Favicon Generator',
    description: 'Create favicons for your website',
    path: '/tools/favicon-generator',
    category: 'Image & Graphics',
  },
  {
    name: 'Color Picker',
    description: 'Pick and convert colors between formats',
    path: '/tools/color-picker',
    category: 'Image & Graphics',
  },

  // Text & Encoding
  {
    name: 'URL Encoder',
    description: 'Encode and decode URLs',
    path: '/tools/url-encoder',
    category: 'Text & Encoding',
  },
  {
    name: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings',
    path: '/tools/base64-encoder',
    category: 'Text & Encoding',
  },

  // Security & Utilities
  {
    name: 'Password Generator',
    description: 'Generate secure passwords',
    path: '/tools/password-generator',
    category: 'Security & Utilities',
  },
];

export const categories = Array.from(new Set(toolsData.map((tool) => tool.category)));
