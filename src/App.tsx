import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './utils/scrollToTop';
import ProfilePage from './pages/ProfilePage';
import CatalogLayout from './layouts/CatalogLayout';
import CatalogPage from './pages/CatalogPage';
import FreshFlowersPage from './pages/CatalogPage/FreshFlowersPage';
import DriedFlowersPage from './pages/CatalogPage/DriedFlowersPage';
import LivePLantsPage from './pages/CatalogPage/LivePLantsPage';
import FreshenersPage from './pages/CatalogPage/FreshenersPage';
import CandlesPage from './pages/CatalogPage/CandlesPage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="catalog" element={<CatalogLayout />}>
            <Route path="fresh-flowers" element={<FreshFlowersPage />} />
            <Route path="dried-flowers" element={<DriedFlowersPage />} />
            <Route path="live-plants" element={<LivePLantsPage />} />
            <Route path="fresheners" element={<FreshenersPage />} />
            <Route path="candles" element={<CandlesPage />} />
            <Route index element={<CatalogPage />} />
          </Route>
          <Route path=":id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
