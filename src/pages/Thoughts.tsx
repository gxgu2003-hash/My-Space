import { useState } from 'react';

// 模拟你的私人朋友圈/公众号数据
const thoughtsData = [
  {
    id: 1,
    date: '2026-05-22 14:30',
    content: `今天终于把个人空间（My-Space）的新板块雏形搭好了！🎉\n\n打算把这里当成我的“私人朋友圈”和大型碎碎念现场。相比于正式的项目展示，这里更想记录一些零碎的思考、搭建过程中的踩坑记录，或者生活里突然蹦出来的灵感。`,
    tags: ['碎碎念', '独立开发'],
    images: [] // 可以放图片链接，比如 '/public/project1.jpg'
  },
  {
    id: 2,
    date: '2026-05-15 23:10',
    content: '关于结构设计的一点小思考：做传统的建筑结构和手工作品、或者是写前端代码，在逻辑上其实有极大的共通性。都是从打地基（环境配置/底层框架）开始，到骨架搭建（组件/承重墙），最后进行细节修饰。动手创造并赋予其生命力的过程真的让人着迷。',
    tags: ['结构思考', '创造力'],
    images: [] 
  }
];

export default function Thoughts() {
  const [thoughts] = useState(thoughtsData);

  return (
    <div className="pt-28 pb-16 min-h-screen bg-pixel-bg px-4">
      {/* 页面头部 */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="font-pixel text-3xl font-bold text-pixel-dark mb-3 animate-fade-in">
          我在想什么 🤔
        </h1>
        <p className="font-pixel text-sm text-pixel-dark/60">
          这是一个大型私人朋友圈，记录灵感、思考与日常碎碎念。
        </p>
      </div>

      {/* 朋友圈 / 公众号文章流布局 */}
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        {thoughts.map((item) => (
          <article 
            key={item.id} 
            className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-6 shadow-pixel transition-transform hover:-translate-y-0.5"
          >
            {/* 作者信息 / 头部（朋友圈风格） */}
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="./avatar.png" // 确保你的路径正确，或者改为你在主页用的头像
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-pixel-dark object-cover"
                onError={(e) => {
                  // 防止头像路径不对报错，退回到普通圆形
                  e.currentTarget.src = "https://api.dicebear.com/7.x/pixel-art/svg";
                }}
              />
              <div>
                <h2 className="font-pixel text-sm font-bold text-pixel-dark">顾湘 Xiang</h2>
                <p className="text-xs text-pixel-dark/40">{item.date}</p>
              </div>
            </div>

            {/* 文字内容 - whitespace-pre-wrap 能够保留文本中的换行 */}
            <div className="text-pixel-dark text-base leading-relaxed whitespace-pre-wrap font-sans mb-4">
              {item.content}
            </div>

            {/* 标签 */}
            {item.tags.length > 0 && (
              <div className="flex gap-2 mt-3">
                {item.tags.map(tag => (
                  <span key={tag} className="font-pixel text-xs bg-pixel-orange/10 text-pixel-orange border border-pixel-orange/20 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
