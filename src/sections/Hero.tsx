import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = '你好呀，我是顾湘';
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / 30;
      const deltaY = (e.clientY - centerY) / 30;
      avatarRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-pixel-orange rounded-full float-1 opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-pixel-green rounded-full float-2 opacity-60" />
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-pixel-pink rounded-full float-3 opacity-60" />
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-pixel-wood rounded-full float-1 opacity-40" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Avatar */}
        <div
          ref={avatarRef}
          className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 transition-transform duration-100"
        >
          <div className="absolute inset-0 bg-pixel-orange rounded-full animate-breathe opacity-20" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-pixel-dark shadow-pixel-lg animate-breathe">
            <img
              src="/avatar.png"
              alt="顾湘 Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative pins */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-pixel-pink rounded-full border-2 border-pixel-dark" />
        </div>

        {/* Title with typewriter effect */}
        <h1 className="font-pixel text-3xl md:text-5xl lg:text-6xl text-pixel-dark mb-4 min-h-[1.2em]">
          {displayText}
          {!isTypingComplete && <span className="typewriter-cursor" />}
        </h1>

        {/* Subtitle */}
        <p
          className={`font-pixel text-lg md:text-xl text-pixel-green mb-6 transition-all duration-500 ${
            isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          结构工程师
        </p>

        {/* Description */}
        <p
          className={`text-base md:text-lg text-pixel-dark/80 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-500 delay-200 ${
            isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          我追随好奇心，无论它指向何方——深入探索，动手创造，追寻灵感并化为现实。
          <br className="hidden md:block" />
          我的世界充满能量、创造力，以及永无止境的理解与创造渴望。
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-500 delay-300 ${
            isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            to="/timeline"
            className="inline-flex items-center gap-2 font-pixel text-sm md:text-base bg-pixel-orange text-white px-6 py-3 border-2 border-pixel-dark rounded-lg btn-press shadow-pixel"
          >
            查看时间轴
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
