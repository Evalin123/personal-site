import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { ThemeProvider } from './lib/ThemeProvider';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
