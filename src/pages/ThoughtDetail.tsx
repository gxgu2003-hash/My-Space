import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { thoughtsData } from './Thoughts';
import Footer from '@/components/Footer';

export default function ThoughtDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 查找匹配的文章内容
  const post = thoughtsData.find(item => item.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-pixel-bg flex items-center justify-center">
        <div className="text-center font-pixel">
          <h1 className="text-xl text-pixel-dark mb-4">内容去火星了 🚀</h1>
          <button onClick={() => navigate('/mythoughts')} className="text-pixel-orange hover:underline text-sm">
            返回列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pixel-bg flex flex-col justify-between">
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* 返回按钮 */}
          <button
            onClick={() => navigate('/mythoughts')}
            className="inline-flex items-center gap-1 font-pixel text-xs text-pixel-dark/60 hover:text-pixel-orange transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>返回列表</span>
          </button>

          {/* 公众号深度正文卡片 */}
          <article className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-6 md:p-8 shadow-pixel">
            {/* 文章大标题 */}
            <h1 className="font-pixel text-2xl md:text-3xl font-bold text-pixel-dark mb-4 leading-tight">
              {post.title}
            </h1>

            {/* 公众号式作者信息栏 */}
            <div className="flex items-center gap-3 pb-6 border-b border-pixel-dark/10 mb-6">
              <img 
                src="./avatar.png" 
                alt="Avatar" 
                className="w-9 h-9 rounded-full border-2 border-pixel-dark object-cover"
                onError={(e) => { e.currentTarget.src = "https://api.dicebear.com/7.x/pixel-art/svg"; }}
              />
              <div>
                <div className="font-pixel text-xs font-bold text-pixel-dark">顾湘 Xiang</div>
                <div className="flex items-center gap-1 text-[10px] font-pixel text-pixel-dark/40 mt-0.5">
                  <Calendar size={10} />
                  <span>发表于 {post.date}</span>
                </div>
              </div>
            </div>

            {/* 封面大图（详情页可选） */}
            {post.coverImage && (
              <div className="mb-6 rounded-lg overflow-hidden border border-pixel-dark/20">
                <img src={post.coverImage} alt="Cover" className="w-full h-auto object-cover" />
              </div>
            )}

            {/* 正文核心内容区：使用了极为适合长文阅读的 font-sans 和 leading-relaxed */}
            <div className="text-pixel-dark text-base leading-relaxed font-sans whitespace-pre-wrap space-y-4 px-1">
              {/* 这里由于是静态写死的内容，可以直接使用 \n\n 换行，或者直接承接更复杂的文字 */}
              {post.summary} 
              
              {"\n\n但这只是个开始。在接下来的旅程里，除了把我日常手作的木雕、画的钢笔画、设计的钢结构模型整理成册放到‘What I've Done’之外，我还想在这里把那些未完成的、失败的代码片段，或者图纸外废弃的奇思妙想记录下来。创造没有绝对的对错，每一步结构都是有意义的支撑。"}
            </div>
          </article>

        </div>
      </div>
      <Footer />
    </div>
  );
}
