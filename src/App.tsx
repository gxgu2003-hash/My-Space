import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Timeline from '@/pages/Timeline';
import ProjectDetail from '@/pages/ProjectDetail';
import Thoughts from '@/pages/Thoughts'; // 👈 1. 引入新页面
import './App.css';

function App() {
  return (
    <Router basename="/My-Space">
      <div className="min-h-screen bg-pixel-bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/thoughts" element={<Thoughts />} /> {/* 👈 2. 增加这个平行板块 */}
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
