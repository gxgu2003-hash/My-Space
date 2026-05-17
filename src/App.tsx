import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Timeline from '@/pages/Timeline';
import ProjectDetail from '@/pages/ProjectDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-pixel-bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
