import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
