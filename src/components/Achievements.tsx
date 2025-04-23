import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Users, Percent, Award } from 'lucide-react';

interface Achievement {
  id: number;
  icon: 'trophy' | 'users' | 'percent' | 'award';
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const Achievements: React.FC = () => {
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  
  const achievements: Achievement[] = [
    {
      id: 1,
      icon: 'users',
      value: 100,
      suffix: '+',
      label: 'Employees Onboarded',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      icon: 'percent',
      value: 90,
      suffix: '%',
      label: 'Retention Rate',
      color: 'bg-green-500'
    },
    {
      id: 3,
      icon: 'trophy',
      value: 50,
      suffix: '+',
      label: 'Campus Partnerships',
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      icon: 'award',
      value: 5,
      suffix: '%',
      label: 'Top MBA Cohort',
      color: 'bg-purple-500'
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // ms
      const interval = 50; // ms
      
      achievements.forEach((achievement, index) => {
        let startTime: number | null = null;
        const startValue = 0;
        const endValue = achievement.value;
        
        const updateCounter = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          const currentValue = Math.floor(startValue + progress * (endValue - startValue));
          setCounters(prevCounters => {
            const newCounters = [...prevCounters];
            newCounters[index] = currentValue;
            return newCounters;
          });
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };
        
        requestAnimationFrame(updateCounter);
      });
    }
  }, [isVisible]);
  
  const renderIcon = (type: string, className: string) => {
    switch (type) {
      case 'trophy':
        return <Trophy className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'percent':
        return <Percent className={className} />;
      case 'award':
        return <Award className={className} />;
      default:
        return <Trophy className={className} />;
    }
  };

  return (
    <section id="achievements" ref={sectionRef} className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-roboto font-bold text-white text-center mb-2">
          Key Achievements
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${achievement.color} flex items-center justify-center`}>
                {renderIcon(achievement.icon, 'text-white w-8 h-8')}
              </div>
              <div className="text-4xl font-roboto font-bold text-primary mb-2">
                {counters[index]}{achievement.suffix}
              </div>
              <p className="text-gray-700">{achievement.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;