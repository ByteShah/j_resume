import React, { useEffect, useState } from 'react';
import { Download, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'HR Professional | Talent Acquisition Specialist';
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-secondary"
    >
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-white/20 overflow-hidden shadow-xl">
          <img 
            src="/J.jpeg"
            alt="Janki Kadiya" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="font-roboto font-bold text-5xl md:text-6xl text-white mb-4 tracking-tight">
          Janki A. Kadiya
        </h1>
        
        <p className="font-roboto text-2xl text-white/90 mb-6 h-8 tracking-wide">
          {displayText}<span className="animate-pulse">|</span>
        </p>
        
        <p className="font-opensans text-white/80 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Dynamic HR professional with 3.5+ years of experience in talent acquisition and HR operations. 
          Passionate about connecting people with opportunities and driving organizational growth.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a 
            href="#contact" 
            className="bg-white text-primary hover:bg-white/90 font-roboto font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Mail size={20} />
            Let's Connect
          </a>
          <a 
            href="/resume.pdf" 
            className="bg-secondary text-white hover:bg-secondary/90 font-roboto font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Download size={20} />
            Download Resume
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;