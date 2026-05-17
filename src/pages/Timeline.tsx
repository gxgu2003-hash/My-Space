import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { timelineEvents, getProjectById } from '@/data/projects';
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleItems((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="min-h-screen bg-pixel-bg">
      {/* Header */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-pixel text-sm text-pixel-dark hover:text-pixel-orange transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            返回首页
          </Link>
          <h1 className="font-pixel text-3xl md:text-4xl text-pixel-dark mb-4">
            时间轴
          </h1>
          <p className="text-pixel-dark/70">
            记录我的项目历程与成长轨迹
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-8 px-4 pb-20">
        <div className="max-w-4xl mx-auto relative">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-pixel-wood/30 md:-translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const project = event.projectId ? getProjectById(event.projectId) : null;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  data-id={event.id}
                  className={`relative flex items-start gap-6 md:gap-0 transition-all duration-500 ${
                    visibleItems.has(event.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-pixel-orange border-2 border-pixel-dark rounded-full md:-translate-x-1/2 z-10 mt-2" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-5/12 ${
                      isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                    }`}
                  >
                    <div className="bg-pixel-paper border-2 border-pixel-dark rounded-xl p-5 shadow-pixel relative">
                      {/* Pin */}
                      <div className="absolute -top-3 left-6 w-4 h-4 bg-pixel-pink rounded-full border-2 border-pixel-dark" />

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-pixel-orange mb-2">
                        <Calendar size={14} />
                        <span className="font-pixel">{formatDate(event.date)}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-pixel text-lg text-pixel-dark mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-pixel-dark/70 mb-3">
                        {event.description}
                      </p>

                      {/* Project Link */}
                      {project && (
                        <Link
                          to={`/project/${project.id}`}
                          className="inline-flex items-center gap-2 text-sm text-pixel-green hover:text-pixel-orange transition-colors"
                        >
                          <ExternalLink size={14} />
                          查看项目: {project.name}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
