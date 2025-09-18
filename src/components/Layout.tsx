import { Outlet } from 'react-router-dom';

import { useMobileMenuStore } from '@/stores/mobileMenuStore';

import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  const { isOpen: isMobileMenuOpen } = useMobileMenuStore();

  return (
    <div className={`layout ${isMobileMenuOpen ? 'layout--mobile-menu-open' : ''}`}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
