import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CompareProvider } from './context/CompareContext';
import Navbar from './components/Navbar';
import CompareBar from './components/CompareBar';
import CollegesPage from './pages/CollegesPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import ComparePage from './pages/ComparePage';
import PredictorPage from './pages/PredictorPage';

export default function App() {
  return (
    <BrowserRouter>
      <CompareProvider>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<CollegesPage />} />
              <Route path="/college/:id" element={<CollegeDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/predict" element={<PredictorPage />} />
            </Routes>
          </main>
          <CompareBar />
        </div>
      </CompareProvider>
    </BrowserRouter>
  );
}
