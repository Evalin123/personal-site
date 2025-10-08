import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import AboutPage from './pages/about/+Page';
import ArticlesPage from './pages/articles/+Page';
import HomePage from './pages/index/+Page';
import ProjectsPage from './pages/projects/+Page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
