import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { useLocation } from 'react-router-dom';

export default function Layout(){
  const { pathname } = useLocation();
  const hideShell = pathname === '/login' || pathname === '/signup';

  return (
    <div className="app-layout">
      <ScrollToTop />
      {!hideShell && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideShell && <Footer />}
    </div>
  );
}
