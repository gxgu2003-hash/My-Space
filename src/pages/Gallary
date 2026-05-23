import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { Calendar, Tag, ArrowRight, Layers } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'structure' | 'art'>('all');

  // 根据分类过滤项目
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const categories = [
    { key: 'all', label: '全部作品' },
    { key: 'structure', label: '结构设计' },
    { key: 'art', label: '艺术手工' },
  ];

  return (
    <div className="min-h-screen bg-pixel-bg flex flex-col justify-between relative">
      {/* 背景木纹肌理 */}
      <div className="absolute inset-0 wood-pattern opacity-20 pointer-events-none" />

      <div className="pt-24 pb-12 px-4 relative z-10">
        
        {/* 顶部标题区（对齐 Thoughts 风格） */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="font-pixel text-3xl font-bold text-pixel-dark mb-2">
            我的作品库 🛠️
          </h1>
          <p className="font-pixel text-xs text-pixel-dark/60">
            顾湘的结构图纸与木雕手作 · 灵感实物集
          </p>
        </div>

        {/* 分类切换胶囊（排版微调，使其更内敛整洁） */}
        <div className="flex justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`font-pixel text-xs px-4 py-1.5 border-2 border-pixel-dark rounded-full transition-all btn-press ${
                activeCategory === cat.key
                  ? 'bg-pixel-orange text-white shadow-pixel-sm'
                  : 'bg-pixel-paper text-pixel-dark hover:bg-pixel-orange/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 微信公众号长卡片流排版 */}
        <div className="max-w-2xl mx-auto space-y-8">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className="bg-pixel-paper border-2 border-pixel-dark rounded-xl overflow-hidden shadow-pixel transition-transform hover:-translate-y-1"
            >
              {/* 1. 标志性的 21:9 宽屏头条封面图 */}
              <Link to={`/project/${project.id}`} className="block aspect-[21/9] w-full overflow-hidden border-b-2 border-pixel-dark bg-pixel-bg relative group">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
                {/* 装饰性小大头针：保留你原汁原味的艺术像素感 */}
                <div className="absolute top-3 right-3 w-4 h-4 bg-pixel-pink rounded-full border-2 border-pixel-dark shadow-sm" />
              </Link>

              {/* 2. 标题与内容区 */}
              <div className="p-5 md:p-6">
                
                {/* 元信息看板 */}
                <div className="flex flex-wrap gap-4 text-xs font-pixel text-pixel-dark/50 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-pixel-orange" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers size={12} className="text-blue-500" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Tag size={12} className={project.category === 'structure' ? 'text-pixel-green' : 'text-pixel-pink'} />
                    <span>{project.category === 'structure' ? '结构' : '艺术'}</span>
                  </div>
                </div>

                {/* 核心大标题 */}
                <Link to={`/project/${project.id}`}>
                  <h2 className="font-pixel text-lg md:text-xl font-bold text-pixel-dark mb-3 hover:text-pixel-orange transition-colors leading-snug">
                    {project.name}
                  </h2>
                </Link>

                {/* 摘要简述（用优雅的 font-sans 确保阅读舒适） */}
                <p className="text-pixel-dark/70 text-sm leading-relaxed font-sans mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* 3. 底部底线与“查看详情”互动按钮 */}
                <div className="flex justify-end pt-2 border-t border-pixel-dark/5">
                  <Link 
                    to={`/project/${project.id}`}
                    className="font-pixel text-xs text-pixel-orange hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>查看项目详情</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* 空状态处理 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 max-w-2xl mx-auto bg-pixel-paper/40 border-2 border-dashed border-pixel-dark/20 rounded-xl">
            <p className="font-pixel text-xs text-pixel-dark/40">
              该分类下暂时没有塞入作品数据 🛠️
            </p>
          </div>
        )}

      </div>
      
      <Footer />
    </div>
  );
}
