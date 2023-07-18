import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <nav className="flex items-center justify-between py-4">
        <Link legacyBehavior href="/">
          <a className="text-blue-500 font-bold text-lg">Food & Drink Pairing App</a>
        </Link>
        <div className="ml-auto">
          <Link legacyBehavior href="/signin">
            <a className="text-blue-500">Register / Sign In</a>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout;