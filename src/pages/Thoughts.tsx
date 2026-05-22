import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';

// 1. 数据源独立声明在最顶部（确保不会和组件的括号产生嵌套冲突）
export const thoughtsData = [
  {
    id: 'thought-2',
    date: '2026-05-22',
    title: '独立开发者的第一周：重新思考“树洞”的定义',
    summary: '今天把个人空间（My-Space）的“我在想什么”板块正式上线了。在这个信息过载的时代，为什么我们依然需要一个属于自己的、不受算法打扰的数字自留地？',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    tags: ['独立开发', '数字生活']
  },
  {
    id: 'thought-1',
    date: '2026-05-15',
    title: '从建筑承重到前端组件：谈谈“结构”的共通性',
    summary: '做传统的建筑结构、手工作品，或者是写前端代码，在底层逻辑上其实有极大的共通性。都是从打地基开始，到骨架搭建，最后进行细节修饰。动手创造并赋予其生命力的过程真的让人着迷。',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tags: ['结构思考', '创造力']
  }
];

// 2. 核心渲染组件
export default function Thoughts() {
  return (
    <div className="min-h-screen bg-pixel-bg flex flex-col justify-between">
      <div className="pt-24 pb-12 px-4">
        
        {/* 顶部标题区 */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="font-pixel text-3xl font-bold text-pixel-dark mb-2">
            我在想什么 🤔
          </h1>
          <p className="font-pixel text-xs text-pixel-dark/60">
            顾湘的私人朋友圈与灵感树洞 · 深度思考集
          </p>
        </div>

        {/* 公众号风格的文章列表流 */}
        <div className="max-w-2xl mx-auto space-y-8">
          {thoughtsData.map((item) => (
            <article 
              key={item.id} 
              className="bg-pixel-paper border-2 border-pixel-dark rounded-xl overflow-hidden shadow-pixel transition-transform hover:-translate-y-1"
            >
              {/* 封面图 */}
              <Link to={`/thought/${item.id}`} className="block aspect-[21/9] w-full overflow-hidden border-b-2 border-pixel-dark bg-pixel-bg">
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </Link>

              {/* 标题与内容区 */}
              <div className="p-5 md:p-6">
                {/* 元信息 */}
                <div className="flex flex-wrap gap-4 text-xs font-pixel text-pixel-dark/50 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-pixel-orange" />
                    <span>{item.date}</span>
                  </div>
                  {item.tags.map(tag => (
                    <div key={tag} className="flex items-center gap-0.5">
                      <Tag size={12} className="text-pixel-green" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>

                {/* 标题 */}
                <Link to={`/thought/${item.id}`}>
                  <h2 className="font-pixel text-lg md:text-xl font-bold text-pixel-dark mb-3 hover:text-pixel-orange transition-colors leading-snug">
                    {item.title}
                  </h2>
                </Link>

                {/* 摘要说明 */}
                <p className="text-pixel-dark/70 text-sm leading-relaxed font-sans mb-4 line-clamp-3">
                  {item.summary}
                </p>

                {/* 阅读全文按钮 */}
                <div className="flex justify-end pt-2 border-t border-pixel-dark/5">
                  <Link 
                    to={`/thought/${item.id}`}
                    className="font-pixel text-xs text-pixel-orange hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>阅读全文</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}
