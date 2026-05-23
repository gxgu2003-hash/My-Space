import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Github, Dribbble, Mail, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/mythoughts', label: 'I am Thinking...' },
    { path: '/myworks', label: "What I've Done" },
    { path: '/timeline', label: 'Timeline' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/xiang-gu-eit-58400a272/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'Github' },
    { icon: Instagram, href: 'https://www.instagram.com/homelandjam.co?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr', label: 'Instagram' },
    { icon: Mail, href: 'gxgu2003@gmail.com', label: 'Email' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2 px-4'
          : 'py-4 px-6'
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 ${
          isScrolled
            ? 'max-w-2xl bg-pixel-paper/95 backdrop-blur-sm border-2 border-pixel-dark rounded-full px-6 py-2 shadow-pixel'
            : 'max-w-6xl'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-pixel text-xl font-bold text-pixel-dark hover:text-pixel-orange transition-colors"
          >
            Xiang Gu 顾湘
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-pixel text-sm btn-press px-3 py-1 rounded ${
                  isActive(link.path)
                    ? 'bg-pixel-orange text-white border-2 border-pixel-dark'
                    : 'text-pixel-dark hover:text-pixel-orange'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-pixel-dark hover:text-pixel-orange transition-colors btn-press"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-pixel-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pixel-dark/20 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-pixel text-sm px-3 py-2 rounded ${
                    isActive(link.path)
                      ? 'bg-pixel-orange text-white'
                      : 'text-pixel-dark'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-pixel-dark/20">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-pixel-dark hover:text-pixel-orange"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
