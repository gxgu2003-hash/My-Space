import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { FolderOpen } from 'lucide-react';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'structure' | 'art'>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const categories = [
    { key: 'all', label: '全部' },
    { key: 'structure', label: '结构' },
    { key: 'art', label: '艺术' },
  ];

  return (
    <section className="py-16 px-4 md:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 wood-pattern opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-pixel text-3xl md:text-4xl text-pixel-dark mb-4">
            我的作品
          </h2>
          <div className="w-24 h-1 bg-pixel-orange mx-auto rounded-full" />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`font-pixel text-sm px-4 py-2 border-2 border-pixel-dark rounded-lg transition-all btn-press ${
                activeCategory === cat.key
                  ? 'bg-pixel-orange text-white'
                  : 'bg-pixel-paper text-pixel-dark hover:bg-pixel-orange/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Card */}
              <div className="bg-pixel-paper border-2 border-pixel-dark rounded-xl overflow-hidden shadow-pixel card-lift">
                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pixel-dark/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`font-pixel text-xs px-3 py-1 rounded-full border-2 border-pixel-dark ${
                      project.category === 'structure'
                        ? 'bg-pixel-green text-white'
                        : 'bg-pixel-pink text-white'
                    }`}>
                      {project.category === 'structure' ? '结构' : '艺术'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-pixel text-lg text-pixel-dark mb-2 line-clamp-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-pixel-dark/70 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-pixel-dark/60 mb-4">
                    <span>{project.date}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      to={`/project/${project.id}`}
                      className="flex-1 flex items-center justify-center gap-2 font-pixel text-sm bg-pixel-dark text-white px-4 py-2 border-2 border-pixel-dark rounded-lg btn-press"
                    >
                      <FolderOpen size={16} />
                      查看详情
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-pixel-pink rounded-full border-2 border-pixel-dark shadow-sm z-10" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="font-pixel text-pixel-dark/50">
              该分类下暂无项目
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
