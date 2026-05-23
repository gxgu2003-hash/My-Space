import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Timeline from '@/pages/Timeline';
import ProjectDetail from '@/pages/ProjectDetail'; // ✅ 1. 引入你写好的真实作品详情
import Thoughts from '@/pages/Thoughts';             // ✅ 2. 引入你的公众号文章列表
import ThoughtDetail from '@/pages/ThoughtDetail';   // ✅ 3. 引入带划线批注的文章详情
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
