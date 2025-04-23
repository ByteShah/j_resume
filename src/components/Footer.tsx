import React from 'react';
import { Heart, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-roboto font-bold mb-4">Janki A. Kadiya</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              HR Professional specializing in talent acquisition and employee engagement.
              Looking forward to connecting with like-minded professionals.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/janki-kadiya-44ba3319a/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
                <Linkedin size={20} />
              </a>
              <a href="mailto:jankikadiya99@gmail.com" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
                <Mail size={20} />
              </a>
              {/* <a href="tel:+917623846157" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
                <Phone size={20} />
              </a> */}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-roboto font-bold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors py-1">Home</a>
              <a href="#experience" className="text-gray-300 hover:text-white transition-colors py-1">Experience</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors py-1">Skills</a>
              <a href="#education" className="text-gray-300 hover:text-white transition-colors py-1">Education</a>
              <a href="#achievements" className="text-gray-300 hover:text-white transition-colors py-1">Achievements</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors py-1">Projects</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors py-1">Contact</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-center md:text-left">
            &copy; {currentYear} Janki Kadiya. All rights reserved.
          </p>
          <p className="text-gray-300 flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart size={16} className="text-red-500" /> by Janki
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;