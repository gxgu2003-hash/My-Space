import Hero from '@/sections/Hero';
import Projects from '@/sections/Projects';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-pixel-bg">
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}
