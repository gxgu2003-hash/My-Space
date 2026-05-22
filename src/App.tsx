import Thoughts from '@/pages/Thoughts';
import ThoughtDetail from '@/pages/ThoughtDetail'; // 👈 1. 引入详情页

function App() {
  return (
    <Router basename="/My-Space">
      <div className="min-h-screen bg-pixel-bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          
          {/* 👈 2. 这两个路由打完美配合 */}
          <Route path="/mythoughts" element={<Thoughts />} />
          <Route path="/thought/:id" element={<ThoughtDetail />} /> 
          
          <Route path="/myworks" element={<Home />} /> {/* 确保你的 myworks 也有对应的映射 */}
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
