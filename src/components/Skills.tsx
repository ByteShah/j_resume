import React, { useEffect, useRef, useState } from 'react';

interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: 'recruitment' | 'hr' | 'soft';
}

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'recruitment' | 'hr' | 'soft'>('all');
  const sectionRef = useRef<HTMLElement | null>(null);
  
  const skills: Skill[] = [
    { id: 1, name: 'Talent Acquisition', percentage: 95, category: 'recruitment' },
    { id: 2, name: 'Campus Recruitment', percentage: 90, category: 'recruitment' },
    { id: 3, name: 'Screening & Interviewing', percentage: 85, category: 'recruitment' },
    { id: 4, name: 'HR Operations', percentage: 90, category: 'hr' },
    { id: 5, name: 'Compliance', percentage: 85, category: 'hr' },
    { id: 6, name: 'Employee Engagement', percentage: 80, category: 'hr' },
    { id: 7, name: 'Problem Solving', percentage: 90, category: 'soft' },
    { id: 8, name: 'Decision Making', percentage: 85, category: 'soft' },
    { id: 9, name: 'Data-Driven Recruitment', percentage: 80, category: 'recruitment' },
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
  
  const filteredSkills = skills.filter(skill => 
    activeTab === 'all' ? true : skill.category === activeTab
  );

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-light">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-roboto font-bold text-primary text-center mb-2">
          Skills & Expertise
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-roboto transition-all ${
              activeTab === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-primary hover:bg-gray-100'
            }`}
          >
            All Skills
          </button>
          <button
            onClick={() => setActiveTab('recruitment')}
            className={`px-6 py-2 rounded-full font-roboto transition-all ${
              activeTab === 'recruitment'
                ? 'bg-primary text-white'
                : 'bg-white text-primary hover:bg-gray-100'
            }`}
          >
            Recruitment
          </button>
          <button
            onClick={() => setActiveTab('hr')}
            className={`px-6 py-2 rounded-full font-roboto transition-all ${
              activeTab === 'hr'
                ? 'bg-primary text-white'
                : 'bg-white text-primary hover:bg-gray-100'
            }`}
          >
            HR Operations
          </button>
          <button
            onClick={() => setActiveTab('soft')}
            className={`px-6 py-2 rounded-full font-roboto transition-all ${
              activeTab === 'soft'
                ? 'bg-primary text-white'
                : 'bg-white text-primary hover:bg-gray-100'
            }`}
          >
            Soft Skills
          </button>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-roboto font-medium text-primary">{skill.name}</h3>
                <span className="text-secondary font-roboto font-medium">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-secondary h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: isVisible ? `${skill.percentage}%` : '0%',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;