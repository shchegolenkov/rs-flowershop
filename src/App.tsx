import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CatalogLayout from './layouts/CatalogLayout';
import RootLayout from './layouts/RootLayout';

import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import CandlesPage from './pages/CatalogPage/CandlesPage';
import DriedFlowersPage from './pages/CatalogPage/DriedFlowersPage';
import FreshenersPage from './pages/CatalogPage/FreshenersPage';
import FreshFlowersPage from './pages/CatalogPage/FreshFlowersPage';
import LivePLantsPage from './pages/CatalogPage/LivePLantsPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import PasswordPage from './pages/PasswordPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

import ScrollToTop from './utils/scrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/change-password" element={<PasswordPage />} />
          <Route path="catalog" element={<CatalogLayout />}>
            <Route path="fresh-flowers" element={<FreshFlowersPage />} />
            <Route path="dried-flowers" element={<DriedFlowersPage />} />
            <Route path="live-plants" element={<LivePLantsPage />} />
            <Route path="fresheners" element={<FreshenersPage />} />
            <Route path="candles" element={<CandlesPage />} />
            <Route index element={<CatalogPage />} />
          </Route>
          <Route path="catalog/:id" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
