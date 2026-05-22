import { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Upload, 
  X, 
  Trash2, 
  Image as ImageIcon, 
  Plus 
} from 'lucide-react';
import Footer from '@/components/Footer';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ThoughtItem {
  id: string;
  date: string;
  content: string;
  images: string[]; // Base64 格式图片数组
}

export default function Thoughts() {
  // 1. 初始化朋友圈数据（结合本地存储）
  const [thoughts, setThoughts] = useState<ThoughtItem[]>([]);
  const [newContent, setNewContent] = useState('');
  const [tempImages, setTempImages] = useState<string[]>([]);
  
  // 弹窗与图片预览状态
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 2. 组件加载时，从 localStorage 读取朋友圈动态
  useEffect(() => {
    const savedThoughts = localStorage.getItem('my_space_thoughts');
    if (savedThoughts) {
      setThoughts(JSON.parse(savedThoughts));
    } else {
      // 默认初始化的第一条朋友圈
      const defaultThought: ThoughtItem = {
        id: 'default-1',
        date: '2026-05-22 14:30',
        content: `欢迎来到我的私人朋友圈动态流！✨\n\n参考了项目的本地存储机制，我现在可以直接在这个页面上写下我的思考、上传配图，并且直接发布。所有的数据都会牢牢保存在我的浏览器里，成为了一个真正的“私人树洞”。`,
        images: []
      };
      setThoughts([defaultThought]);
    }
  }, []);

  // 3. 当朋友圈动态改变时，同步到 localStorage
  useEffect(() => {
    if (thoughts.length > 0) {
      localStorage.setItem('my_space_thoughts', JSON.stringify(thoughts));
    }
  }, [thoughts]);

  // 4. 处理发布新朋友圈时的图片上传 (转为 Base64 方便存入本地)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setTempImages((prev) => [...prev, event.target!.result as string]);
          }
        };
          reader.readAsDataURL(file);
      }
    });
  };

  // 5. 移除发帖前临时选中的图片
  const removeTempImage = (index: number) => {
    setTempImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 6. 提交发布
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim() && tempImages.length === 0) return;

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newThought: ThoughtItem = {
      id: Date.now().toString() + Math.random().toString(),
      date: formattedDate,
      content: newContent,
      images: tempImages
    };

    setThoughts((prev) => [newThought, ...prev]); // 最新发布的放在最前面
    setNewContent('');
    setTempImages([]);
  };

  // 7. 删除某条朋友圈动态
  const deleteThought = (id: string) => {
    if (confirm('确定要删除这条思考动态吗？')) {
      setThoughts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const openImageViewer = (url: string) => {
    setSelectedImage(url);
    setIsImageDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-pixel-bg flex flex-col justify-between">
      <div className="pt-24 pb-12 px-4">
        
        {/* 顶部标题区 */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="font-pixel text-3xl font-bold text-pixel-dark mb-2">
            我在想什么 🤔
          </h1>
          <p className="font-pixel text-xs text-pixel-dark/60">
            我的大型私人朋友圈与灵感树洞
          </p>
        </div>

        {/* 发帖输入框区（仅在本地端作为管理员发布） */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handlePublish} className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-4 shadow-pixel relative">
            <div className="absolute -top-3 left-6 w-4 h-4 bg-pixel-orange rounded-full border-2 border-pixel-dark" />
            
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="今天有什么新想法？记录下来吧..."
              className="w-full h-24 p-2 bg-pixel-bg/40 border border-pixel-dark/20 rounded-lg text-sm text-pixel-dark resize-none focus:outline-none focus:border-pixel-orange"
            />

            {/* 预览即将上传的图片 */}
            {tempImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3 mb-2">
                {tempImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-square border-2 border-pixel-dark rounded-lg overflow-hidden">
                    <img src={imgUrl} className="w-full h-full object-cover" alt="upload-preview" />
                    <button
                      type="button"
                      onClick={() => removeTempImage(idx)}
                      className="absolute top-1 right-1 p-0.5 bg-pixel-pink border border-pixel-dark text-white rounded"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 发帖工具栏 */}
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-pixel-dark/10">
              <div>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="p-2 text-pixel-dark hover:text-pixel-green rounded-lg transition-colors flex items-center gap-1 font-pixel text-xs"
                >
                  <ImageIcon size={18} />
                  <span>添加图片</span>
                </button>
              </div>

              <button
                type="submit"
                className="font-pixel text-xs bg-pixel-orange text-white px-4 py-2 border-2 border-pixel-dark rounded-md btn-press flex items-center gap-1"
              >
                <Plus size={14} />
                <span>发布动态</span>
              </button>
            </div>
          </form>
        </div>

        {/* 朋友圈 / 动态流视图 */}
        <div className="max-w-2xl mx-auto space-y-6">
          {thoughts.map((item) => (
            <article 
              key={item.id} 
              className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-5 shadow-pixel group transition-all"
            >
              {/* 头像与发帖人信息 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="./avatar.png" 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-pixel-dark object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://api.dicebear.com/7.x/pixel-art/svg";
                    }}
                  />
                  <div>
                    <h2 className="font-pixel text-sm font-bold text-pixel-dark">顾湘 Xiang</h2>
                    <p className="text-[10px] font-pixel text-pixel-dark/40">{item.date}</p>
                  </div>
                </div>

                {/* 删除动态按钮 (鼠标悬浮在卡片上时显示) */}
                <button
                  onClick={() => deleteThought(item.id)}
                  className="p-1.5 text-pixel-dark/40 hover:text-pixel-pink opacity-0 group-hover:opacity-100 transition-all rounded"
                  title="删除此动态"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* 朋友圈核心文字 */}
              <p className="text-pixel-dark text-sm md:text-base leading-relaxed whitespace-pre-wrap font-sans mb-4 px-1">
                {item.content}
              </p>

              {/* 朋友圈九宫格 / 灵活图片网格排版 */}
              {item.images && item.images.length > 0 && (
                <div className={`grid gap-2 mb-4 px-1 ${
                  item.images.length === 1 ? 'grid-cols-1 max-w-[70%]' : 
                  item.images.length === 2 || item.images.length === 4 ? 'grid-cols-2' : 'grid-cols-3'
                }`}>
                  {item.images.map((img, index) => (
                    <div 
                      key={index}
                      className="border border-pixel-dark/30 rounded-lg overflow-hidden bg-pixel-bg aspect-square cursor-pointer hover:opacity-90 transition-opacity shadow-pixel-sm"
                      onClick={() => openImageViewer(img)}
                    >
                      <img src={img} alt="thought-attachment" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* 朋友圈底部伪互动状态栏（更有仪式感） */}
              <div className="flex gap-6 pt-2 border-t border-pixel-dark/5 text-pixel-dark/40 text-xs font-pixel">
                <button className="flex items-center gap-1 hover:text-pixel-pink transition-colors">
                  <Heart size={14} /> <span>赞</span>
                </button>
                <button className="flex items-center gap-1 hover:text-pixel-orange transition-colors">
                  <MessageSquare size={14} /> <span>评论</span>
                </button>
                <button className="flex items-center gap-1 hover:text-pixel-green transition-colors">
                  <Share2 size={14} /> <span>分享</span>
                </button>
              </div>

            </article>
          ))}

          {thoughts.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-pixel-dark/20 rounded-xl">
              <p className="font-pixel text-sm text-pixel-dark/40">空空如也，快发布第一条灵感吧~</p>
            </div>
          )}
        </div>

      </div>

      <Footer />

      {/* 沿用你项目的 Dialog 放大预览组件 */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto rounded-lg border-4 border-pixel-dark shadow-pixel"
              />
              <button
                onClick={() => setIsImageDialogOpen(false)}
                className="absolute -top-4 -right-4 p-2 bg-pixel-dark text-white rounded-full border-2 border-white btn-press"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
