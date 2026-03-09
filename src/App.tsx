import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import MCPServerPage from './pages/articles/MCPServerPage';
import React2ShellPage from './pages/articles/React2ShellPage';
import WebSocketPage from './pages/articles/WebSocketPage';
import ArticlesPage from './pages/ArticlesPage';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'articles', element: <ArticlesPage /> },
      { path: 'articles/React2Shell-CVE-2025-55182', element: <React2ShellPage /> },
      { path: 'articles/mcp-server', element: <MCPServerPage /> },
      { path: 'articles/websocket-vs-http', element: <WebSocketPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
