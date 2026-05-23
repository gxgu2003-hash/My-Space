import { Linkedin, Github, Dribbble, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/xiang-gu-eit-58400a272/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'Github' },
    { icon: Instagram, href: 'https://www.instagram.com/homelandjam.co?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr', label: 'Instagram' },
    { icon: Mail, href: 'gxgu2003@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-pixel-dark text-pixel-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="font-pixel text-2xl mb-2">顾湘</h3>
            <p className="text-sm text-pixel-bg/60">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-pixel-bg/10 rounded-lg hover:bg-pixel-orange transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pixel-bg/20 mt-8 pt-8 text-center">
          <p className="text-sm text-pixel-bg/50 flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-pixel-pink fill-pixel-pink" /> by 顾湘
          </p>
        </div>
      </div>
    </footer>
  );
}
