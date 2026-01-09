import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Github, Twitter, Disc as Discord, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const Footer = () => {
  const footerLinks = {
    Product: [
      { label: 'Learn', to: '' },
      { label: 'Tools', to: '' },
      { label: 'Community', href: 'https://discord.gg/4WMrPncU' },
    ],
    Company: [
      { label: 'About', to: '' },
      { label: 'Contact', to: '' },
    ],
    Connect: [
      { label: 'GitHub', href: '' },
      { label: 'Discord', href: 'https://discord.gg/4WMrPncU' },
      { label: 'Twitter', href: '/' },
      { label: 'Newsletter', to: '/' },
    ]
  };

  const socialIcons = [
    { icon: Github, href: '#', color: 'hover:text-white hover:bg-white/10' },
    { icon: Discord, href: '#', color: 'hover:text-[#5865F2] hover:bg-[#5865F2]/10' },
    { icon: Twitter, href: '#', color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10' },
    { icon: Mail, href: '#', color: 'hover:text-teal-400 hover:bg-teal-400/10' }
  ];

  return (
    <footer className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Decorative Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div className="flex items-center space-x-3">
              <div className="relative p-2 bg-white/5 rounded-xl border border-white/10">
                <Logo />
                <motion.div
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Dev<span className="text-teal-400">Sphere</span>
              </span>
            </motion.div>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
              Showcase and discover amazing projects <br className="hidden sm:block" />
            created by developers.
            </p>

            <div className="flex items-center gap-3">
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${social.color}`}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <div key={category} className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {link.to ? (
                        <Link
                          to={link.to}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-base flex items-center group"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-base flex items-center group"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            className="flex items-center space-x-2 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span>Architected with</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-teal-400 fill-teal-400/20" />
            </motion.div>
            <span>by the DevSphere team</span>
          </motion.div>

          <div className="flex items-center gap-8">
             <p className="text-gray-500 text-sm italic">
               © 2026 DevSphere. 
             </p>
             <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-gray-600">
                <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Background Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
};

export default Footer;