import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
// import Paragames from './pages/paragames/Paragames';
// import Wedding from './pages/wedding/Wedding';
import Wsbk from './pages/wsbk/Wsbk';
import Bot from './pages/paragames/Bot';

export default function App() {
  return (
    <BrowserRouter  basename='/motogp-2026'>
    <Routes>
      <Route path="/" element={<Wsbk />} />
      <Route path="paragames/bot" element={<Bot />} />
      <Route path="/" element={<Navigate replace to="/wsbk-2023" />} />
      {/* <Route path="/bot" element={<Navigate replace to="/paragames/bot" />} /> */}
    </Routes>
  </BrowserRouter>
  );
}