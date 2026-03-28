import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const DiffChecker = lazy(() => import('../tools/diff-checker/DiffChecker'));
const ImageCompressor = lazy(() => import('../tools/image-compressor/ImageCompressor'));

// Stub components for other tools
const ToolStub = lazy(() => import('../components/ToolStub'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
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
    element: <ToolStub title="SVG Generator" />,
  },
  {
    path: '/tools/favicon-generator',
    element: <ToolStub title="Favicon Generator" />,
  },
  {
    path: '/tools/json-formatter',
    element: <ToolStub title="JSON Formatter" />,
  },
  {
    path: '/tools/url-encoder',
    element: <ToolStub title="URL Encoder" />,
  },
  {
    path: '/tools/base64-encoder',
    element: <ToolStub title="Base64 Encoder" />,
  },
  {
    path: '/tools/color-picker',
    element: <ToolStub title="Color Picker" />,
  },
  {
    path: '/tools/regex-tester',
    element: <ToolStub title="Regex Tester" />,
  },
  {
    path: '/tools/password-generator',
    element: <ToolStub title="Password Generator" />,
  },
  // Catch-all for any other tool routes
  {
    path: '/tools/*',
    element: <ToolStub title="Tool Coming Soon" />,
  },
];