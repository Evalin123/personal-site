import '../assets/styles/components/Layout.scss';

import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
