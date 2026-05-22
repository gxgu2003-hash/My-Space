import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageSquare, User, Send, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { thoughtsData } from './Thoughts';
import Footer from '@/components/Footer';

// 1. 读者随机名字池
const randomNames = ['热心的像素块', '神秘结构师', '赛博搬砖人', '代码考古家', '木雕小能手', '吃瓜极客'];

interface Comment {
  id: string;
  selectedText: string;
  author: string;
  text: string;
  date: string;
  reply?: string; // 💡 留给你（博主）的回复字段
}

export default function ThoughtDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const textRef = useRef<HTMLDivElement>(null);
  
  const post = thoughtsData.find(item => item.id === id);

  // 状态控制
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [currentSelection, setCurrentSelection] = useState<{ text: string; x: number; y: number } | null>(null);
  
  // 评论表单状态
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  // 💡 初始化官方批注（你可以在这里把读者的精彩评论和你的回复“写死”在代码里，让所有人可见）
  const initialComments: Comment[] = [
    {
      id: 'official-1',
      selectedText: '动手创造并赋予其生命力的过程真的让人着迷。',
      author: '路过的猫咪',
      text: '这句话触动到我了！创造的魅力就在于此。',
      date: '2026-05-22',
      reply: '顾湘 Xiang：谢谢喜欢！握手，这就是我们熬夜爆肝代码和图纸的动力所在吧。' // 👈 你的官方回复
    }
  ];

  // 加载本地和官方评论
  useEffect(() => {
    const saved = localStorage.getItem(`comments-${id}`);
    const localComments = saved ? JSON.parse(saved) : [];
    // 合并官方硬编码的评论和用户本地的评论
    setComments([...initialComments, ...localComments]);
    
    // 随机分配一个用户名
    if (!authorName) {
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)] + '_' + Math.floor(Math.random() * 900 + 100);
      setAuthorName(randomName);
    }
  }, [id]);

  // 监听鼠标划线选择
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !textRef.current) {
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length < 2) return; // 忽略太短的划线

    // 确保选中的确实是文章正文内的字
    if (textRef.current.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setCurrentSelection({
        text: selectedText,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY - 40 // 在划线文字上方弹出小气泡
      });
    }
  };

  // 清除选择
  const clearSelection = () => {
    setCurrentSelection(null);
    setCommentText('');
    window.getSelection()?.removeAllRanges();
  };

  // 提交评论
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSelection || !commentText.trim()) return;

    const newComment: Comment = {
      id: 'comment-' + Date.now(),
      selectedText: currentSelection.text,
      author: authorName || '匿名侠',
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [...comments, newComment];
    setComments(updated);
    
    // 只过滤出用户自己写的存入 localStorage
    const userOnly = updated.filter(c => !c.id.startsWith('official-'));
    localStorage.setItem(`comments-${id}`, JSON.stringify(userOnly));

    setActiveCommentId(newComment.id);
    clearSelection();
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-pixel-bg flex items-center justify-center font-pixel">
        <div className="text-center">
          <h1 className="text-xl text-pixel-dark mb-4">内容去火星了 🚀</h1>
          <button onClick={() => navigate('/mythoughts')} className="text-pixel-orange hover:underline text-sm">返回列表</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pixel-bg flex flex-col justify-between">
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto w-full">
        
        {/* 返回按钮 */}
        <button
          onClick={() => navigate('/mythoughts')}
          className="inline-flex items-center gap-1 font-pixel text-xs text-pixel-dark/60 hover:text-pixel-orange mb-6"
        >
          <ArrowLeft size={14} />
          <span>返回文章列表</span>
        </button>

        {/* 左右分栏布局：左边正文，右边谷歌文档式评论栏 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* 左侧：文章正文 */}
          <div className="lg:col-span-2 space-y-6 relative">
            <article className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-6 md:p-8 shadow-pixel">
              <h1 className="font-pixel text-2xl md:text-3xl font-bold text-pixel-dark mb-4 leading-tight">
                {post.title}
              </h1>

              {/* 作者信息 */}
              <div className="flex items-center gap-3 pb-6 border-b border-pixel-dark/10 mb-6">
                <img src="./avatar.png" alt="Avatar" className="w-9 h-9 rounded-full border-2 border-pixel-dark object-cover" onError={(e)=>{e.currentTarget.src="https://api.dicebear.com/7.x/pixel-art/svg"}}/>
                <div>
                  <div className="font-pixel text-xs font-bold text-pixel-dark">顾湘 Xiang</div>
                  <div className="flex items-center gap-1 text-[10px] font-pixel text-pixel-dark/40 mt-0.5">
                    <Calendar size={10} />
                    <span>发表于 {post.date}</span>
                  </div>
                </div>
              </div>

              {/* 可划线选中的正文区 */}
              <div 
                ref={textRef}
                onMouseUp={handleTextSelection}
                className="text-pixel-dark text-base leading-relaxed font-sans whitespace-pre-wrap space-y-4 px-1 select-text"
              >
                {post.summary}
                {"\n\n但这只是个开始。在接下来的旅程里，除了把我日常手作的木雕、画的钢笔画、设计的钢结构模型整理成册放到‘What I've Done’之外，我还想在这里把那些未完成的、失败的代码片段，或者图纸外废弃的奇思妙想记录下来。"}
                {"\n\n动手创造并赋予其生命力的过程真的让人着迷。创造没有绝对的对错，每一步结构都是有意义的支撑。"}
              </div>

              <p className="text-[11px] font-pixel text-pixel-dark/30 mt-8 border-t border-dashed border-pixel-dark/10 pt-4">
                💡 提示：可以用鼠标选中正文中的任意句子，点击弹出的气泡即可撰写右侧批注。
              </p>
            </article>

            {/* 划线引发的悬浮快捷评论气泡 */}
            {currentSelection && (
              <div 
                className="absolute z-50 bg-pixel-dark text-white text-xs font-pixel py-2 px-3 rounded border border-white shadow-md flex items-center gap-2 cursor-pointer animate-in fade-in zoom-in-95 duration-100"
                style={{ left: `${Math.min(currentSelection.x - 20, 400)}px`, top: `${currentSelection.y - 120}px` }}
              >
                <form onSubmit={handleAddComment} className="flex flex-col gap-2 w-64 text-pixel-dark">
                  <div className="flex justify-between items-center text-white text-[10px]">
                    <span>为选中文字写批注:</span>
                    <X size={14} className="cursor-pointer" onClick={clearSelection} />
                  </div>
                  <div className="text-white/80 bg-white/10 p-1.5 rounded text-[11px] font-sans truncate">
                    "{currentSelection.text}"
                  </div>
                  <input 
                    type="text" 
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="你的昵称" 
                    className="p-1 text-xs rounded border border-pixel-dark font-pixel"
                  />
                  <div className="flex gap-1">
                    <input 
                      type="text" 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="写下你的想法..." 
                      className="p-1 text-xs rounded border border-pixel-dark flex-1 font-sans"
                      autoFocus
                    />
                    <button type="submit" className="bg-pixel-orange text-white p-1 rounded border border-pixel-dark btn-press">
                      <Send size={12} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* 右侧：谷歌文档+公众号式右侧批注看板 */}
          <div className="lg:col-span-1 space-y-4 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:sticky lg:top-24 p-1">
            <div className="flex items-center gap-2 font-pixel text-xs text-pixel-dark/60 mb-2">
              <MessageSquare size={14} />
              <span>边读边评 ({comments.length})</span>
            </div>

            {comments.length === 0 ? (
              <div className="border-2 border-dashed border-pixel-dark/20 rounded-xl p-6 text-center font-pixel text-xs text-pixel-dark/40 bg-pixel-paper/30">
                目前还没有批注，划线选句来坐沙发吧~
              </div>
            ) : (
              comments.map((c) => (
                <div 
                  key={c.id}
                  onClick={() => setActiveCommentId(c.id)}
                  className={`bg-pixel-paper border-2 rounded-xl p-4 transition-all shadow-pixel-sm cursor-pointer ${
                    activeCommentId === c.id 
                      ? 'border-pixel-orange ring-2 ring-pixel-orange/20 translate-x-1' 
                      : 'border-pixel-dark hover:border-pixel-orange/60'
                  }`}
                >
                  {/* 针对哪段话的引用 */}
                  <div className="text-[11px] font-sans italic text-pixel-dark/50 bg-pixel-bg p-2 rounded border border-pixel-dark/10 mb-2 line-clamp-2 border-l-2 border-l-pixel-orange">
                    "{c.selectedText}"
                  </div>
                  
                  {/* 评论头部 */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-pixel text-xs text-pixel-dark font-bold">
                      <User size={12} className="text-pixel-green" />
                      <span>{c.author}</span>
                    </div>
                    <span className="text-[9px] font-pixel text-pixel-dark/30">{c.date}</span>
                  </div>

                  {/* 评论文本 */}
                  <p className="text-xs text-pixel-dark font-sans leading-tight">
                    {c.text}
                  </p>

                  {/* 💡 博主回复流（如果在 initialComments 里定义了 reply，就会炫酷显示出来） */}
                  {c.reply && (
                    <div className="mt-2.5 pt-2 border-t border-dashed border-pixel-dark/10 text-[11px] text-pixel-orange font-sans bg-pixel-orange/5 p-1.5 rounded">
                      <p className="leading-tight whitespace-pre-wrap">{c.reply}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
