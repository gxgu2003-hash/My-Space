import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Timeline from '@/pages/Timeline';
import Gallary from '@/pages/Gallary';
import ProjectDetail from '@/pages/ProjectDetail';
import Thoughts from '@/pages/Thoughts';            
import ThoughtDetail from '@/pages/ThoughtDetail';  
import './App.css';

function App() {
  return (
    // 💡 basename 必须保留，确保线上 GitHub Pages 路径不会报 404
    <Router basename="/My-Space">
      <div className="min-h-screen bg-pixel-bg">
        <Navbar />
        <Routes>
          {/* 主页与时间轴 */}
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          
          {/* 树洞文章版块（带微信公众号划线批注功能） */}
          <Route path="/mythoughts" element={<Thoughts />} />
          <Route path="/thought/:id" element={<ThoughtDetail />} />
          
          {/* 作品详情版块（点击木雕、钢结构卡片真正进入的地方） */}
          <Route path="/myworks" element={<Gallary />} /> 
          <Route path="/project/:id" element={<ProjectDetail />} /> {/* 👈 关键：这里必须绑定 ProjectDetail组件！ */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
