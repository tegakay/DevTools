import { useState, useMemo } from 'react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const charSets = useMemo(() => {
    const sets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    if (excludeSimilar) {
      // Remove similar characters: 0, O, I, l, 1
      sets.uppercase = sets.uppercase.replace(/[OI]/g, '');
      sets.lowercase = sets.lowercase.replace(/[l]/g, '');
      sets.numbers = sets.numbers.replace(/[01]/g, '');
    }

    return sets;
  }, [excludeSimilar]);

  const generatePassword = () => {
    const selectedSets = [];
    if (includeUppercase) selectedSets.push(charSets.uppercase);
    if (includeLowercase) selectedSets.push(charSets.lowercase);
    if (includeNumbers) selectedSets.push(charSets.numbers);
    if (includeSymbols) selectedSets.push(charSets.symbols);

    if (selectedSets.length === 0) {
      alert('Please select at least one character type');
      return;
    }

    let result = '';
    const allChars = selectedSets.join('');

    // Ensure at least one character from each selected set
    for (const set of selectedSets) {
      result += set[Math.floor(Math.random() * set.length)];
    }

    // Fill the rest randomly
    while (result.length < length) {
      result += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    result = result.split('').sort(() => Math.random() - 0.5).join('');

    setPassword(result);
    setHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10
  };

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const calculateStrength = () => {
    let score = 0;
    const checks = [includeUppercase, includeLowercase, includeNumbers, includeSymbols];
    score += checks.filter(Boolean).length * 2; // Character variety
    score += Math.min(length / 4, 4); // Length bonus
    if (excludeSimilar) score += 1; // Exclude similar bonus

    if (score < 4) return { label: 'Weak', color: 'text-red-600', bg: 'bg-red-100' };
    if (score < 6) return { label: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score < 8) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    return { label: 'Strong', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const strength = calculateStrength();
  const minLength = [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Password Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password Length: {length}
            </label>
            <input
              type="range"
              min={minLength || 4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{minLength || 4}</span>
              <span>64</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include Uppercase (A-Z)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include Lowercase (a-z)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include Numbers (0-9)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include Symbols (!@#$%^&*)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={excludeSimilar}
                onChange={(e) => setExcludeSimilar(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Exclude Similar Characters (0, O, I, l, 1)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow"
          >
            Generate Password
          </button>
        </div>

        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Generated Password
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                placeholder="Click Generate to create a password"
              />
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {password && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password Strength
              </label>
              <div className={`px-3 py-2 rounded-md ${strength.bg}`}>
                <span className={`font-medium ${strength.color}`}>{strength.label}</span>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recent Passwords
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {history.map((pwd, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <span className="font-mono text-sm text-gray-900 dark:text-white">{pwd}</span>
                    <button
                      onClick={() => {
                        setPassword(pwd);
                        navigator.clipboard.writeText(pwd);
                      }}
                      className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Use
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Security Tips:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Use at least 12 characters for better security</li>
              <li>• Include multiple character types for stronger passwords</li>
              <li>• Avoid using personal information in passwords</li>
              <li>• Use a unique password for each account</li>
              <li>• Consider using a password manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;