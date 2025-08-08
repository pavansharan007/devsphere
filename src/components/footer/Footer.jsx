import React from 'react';

import { motion } from 'framer-motion';
import { Coffee, Heart, Github, Twitter, Disc as Discord, Mail } from 'lucide-react';
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
    { icon: Github, href: '#', color: 'hover:text-gray-800 dark:hover:text-gray-400' },
    { icon: Discord, href: '#', color: 'hover:text-indigo-500 dark:hover:text-indigo-400' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-500 dark:hover:text-blue-400' },
    { icon: Mail, href: '#', color: 'hover:text-green-500 dark:hover:text-green-400' }
  ];

  return (
    <>
    <div className="border-t-2 border-white opacity-10"></div>
    <footer className="bg-black dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              
            >
              <div className="relative">
                <Logo />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xl font-bold text-white">Dev Sphere</span>
            </motion.div>
            
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              Show case and discover amazing projects created by develpoers
            </p>

            <div className="flex space-x-4">
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`p-2 bg-gray-900 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 ${social.color} transition-colors duration-200`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
          key={linkIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + linkIndex * 0.05 }}
        >
          {link.to ? (
            <Link
              to={link.to}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm"
            >
              {link.label}
            </Link>
          ) : (
            <a
              href={link.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm"
            >
              {link.label}
            </a>
          )}
        </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400" />
            </motion.div>
            <span>by the DevSphere team</span>
          </motion.div>

          <motion.div
            className="text-gray-500 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            © 2025 DevSphere. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
