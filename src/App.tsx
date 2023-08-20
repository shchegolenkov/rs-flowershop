import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
