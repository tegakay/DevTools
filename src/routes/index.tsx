import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Tools = lazy(() => import('../pages/Tools'));
const DiffChecker = lazy(() => import('../tools/diff-checker/DiffChecker'));
const ImageCompressor = lazy(() => import('../tools/image-compressor/ImageCompressor'));
const SVGGenerator = lazy(() => import('../tools/svg-generator/SVGGenerator'));
const FaviconGenerator = lazy(() => import('../tools/favicon-generator/FaviconGenerator'));
const JSONFormatter = lazy(() => import('../tools/json-formatter/JSONFormatter'));
const RegexTester = lazy(() => import('../tools/regex-tester/RegexTester'));
const Base64Encoder = lazy(() => import('../tools/base64-encoder/Base64Encoder'));
const URLEncoder = lazy(() => import('../tools/url-encoder/URLEncoder'));
const ColorPicker = lazy(() => import('../tools/color-picker/ColorPicker'));
const PasswordGenerator = lazy(() => import('../tools/password-generator/PasswordGenerator'));

// Stub components for other tools
const ToolStub = lazy(() => import('../components/ToolStub'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/tools',
    element: <Tools />,
  },
  {
    path: '/tools/diff-checker',
    element: <DiffChecker />,
  },
  {
    path: '/tools/image-compressor',
    element: <ImageCompressor />,
  },
  // Stub routes for other tools
  {
    path: '/tools/svg-generator',
    element: <SVGGenerator />,
  },
  {
    path: '/tools/favicon-generator',
    element: <FaviconGenerator />,
  },
  {
    path: '/tools/json-formatter',
    element: <JSONFormatter />,
  },
  {
    path: '/tools/regex-tester',
    element: <RegexTester />,
  },
  {
    path: '/tools/url-encoder',
    element: <URLEncoder />,
  },
  {
    path: '/tools/base64-encoder',
    element: <Base64Encoder />,
  },
  {
    path: '/tools/color-picker',
    element: <ColorPicker />,
  },
  {
    path: '/tools/password-generator',
    element: <PasswordGenerator />,
  },
  // Catch-all for any other tool routes
  {
    path: '/tools/*',
    element: <ToolStub title="Tool Coming Soon" />,
  },
];