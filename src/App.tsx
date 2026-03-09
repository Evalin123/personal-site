import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import React2ShellPage from './pages/React2ShellPage';
import MCPServerPage from './pages/MCPServerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/React2Shell-CVE-2025-55182" element={<React2ShellPage />} />
          <Route path="articles/mcp-server" element={<MCPServerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
