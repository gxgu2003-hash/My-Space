import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Timeline from '@/pages/Timeline';
import Thoughts from '@/pages/Thoughts';
import ThoughtDetail from '@/pages/ThoughtDetail';

// 💡 补充导入：如果你的主页（Home）已经包含了点击作品弹窗的逻辑，
// 或者是把 ProjectDetail 单独写在一个文件里，请确保路径正确。
// 如果尚未创建独立的 ProjectDetail.tsx，通常会先导向主页或者一个已有组件做兜底：
const ProjectDetail = () => <Home />; 

function App() {
  return (
    <Router basename="/My-Space">
      <div className="min-h-screen bg-pixel-bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/mythoughts" element={<Thoughts />} />
          <Route path="/thought/:id" element={<ThoughtDetail />} />
          <Route path="/myworks" element={<Home />} /> 
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

// 👈 关键点：补上这个默认导出，解决 main.tsx#L4 的报错
export default App;
