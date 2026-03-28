import { Link } from 'react-router-dom';

const Home = () => {
  const tools = [
    { name: 'Diff Checker', description: 'Compare text differences', path: '/tools/diff-checker' },
    { name: 'Image Compressor', description: 'Compress images for web', path: '/tools/image-compressor' },
    { name: 'SVG Generator', description: 'Generate SVG graphics', path: '/tools/svg-generator' },
    { name: 'Favicon Generator', description: 'Create favicons', path: '/tools/favicon-generator' },
    { name: 'JSON Formatter', description: 'Format and validate JSON', path: '/tools/json-formatter' },
    { name: 'URL Encoder', description: 'Encode/decode URLs', path: '/tools/url-encoder' },
    { name: 'Base64 Encoder', description: 'Encode/decode Base64', path: '/tools/base64-encoder' },
    { name: 'Color Picker', description: 'Pick and convert colors', path: '/tools/color-picker' },
    { name: 'Regex Tester', description: 'Test regular expressions', path: '/tools/regex-tester' },
    { name: 'Password Generator', description: 'Generate secure passwords', path: '/tools/password-generator' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Developer Utility Toolkit
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A collection of useful tools for developers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;