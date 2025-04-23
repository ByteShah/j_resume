import React, { useState } from 'react';
import { Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  type: 'full-time' | 'internship';
  description: string[];
  isExpanded: boolean;
}

const Experience: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'full-time' | 'internship'>('all');
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: 1,
      title: 'Talent Acquisition Officer',
      company: 'Odoo India Pvt Ltd',
      period: 'Sep 2021 – Present',
      type: 'full-time',
      description: [
        'Spearhead end-to-end recruitment processes, including sourcing, screening, interviewing, and onboarding candidates, reducing time-to-hire by 20%.',
        'Organize and manage nationwide campus recruitment drives, partnering with 50+ educational institutes to secure top talent for internships and full-time roles.',
        'Oversee HR operations, including employee records management, payroll coordination, and compliance with labor laws.',
        'Design and implement employee engagement initiatives, such as mentorship programs and wellness workshops, boosting retention by 15%.',
        'Collaborate with department heads to forecast hiring needs and align recruitment strategies with organizational goals.'
      ],
      isExpanded: false
    },
    {
      id: 2,
      title: 'Internship',
      company: 'Aadinath Bulk Private Limited',
      period: '2 Months',
      type: 'internship',
      description: [
        'Assisted in operational efficiency projects, contributing to process optimization.'
      ],
      isExpanded: false
    },
    {
      id: 3,
      title: 'Summer Internship Project',
      company: 'K.S. School of Business Management',
      period: '2 Months',
      type: 'internship',
      description: [
        'Researched "Opportunities of Digital Marketing during Covid-19" with a focus on recruitment firms, analyzing trends and proposing actionable strategies.'
      ],
      isExpanded: false
    }
  ]);

  const toggleExpand = (id: number) => {
    setExperiences(
      experiences.map(exp => 
        exp.id === id ? { ...exp, isExpanded: !exp.isExpanded } : exp
      )
    );
  };

  const filteredExperiences = experiences.filter(exp => 
    filter === 'all' ? true : exp.type === filter
  );

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-roboto font-bold text-primary text-center mb-2">
          Professional Experience
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
        
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                filter === 'all'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-light'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('full-time')}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                filter === 'full-time'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-light'
              }`}
            >
              Full-Time Roles
            </button>
            <button
              type="button"
              onClick={() => setFilter('internship')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                filter === 'internship'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-light'
              }`}
            >
              Internships
            </button>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-light"></div>
          
          {/* Experience Items */}
          <div className="space-y-12">
            {filteredExperiences.map((exp, index) => (
              <div 
                key={exp.id}
                className={`relative pt-3 md:grid md:grid-cols-2 md:gap-8 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-5 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-secondary border-4 border-white shadow z-10"></div>
                
                {/* Content */}
                <div className={`md:text-right ${index % 2 === 0 ? 'md:pr-12' : 'md:order-last md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-secondary cursor-pointer" onClick={() => toggleExpand(exp.id)}>
                    <h3 className="text-xl font-roboto font-bold text-primary">{exp.title}</h3>
                    <h4 className="text-lg font-roboto text-gray-700">{exp.company}</h4>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    
                    <div className={`mt-4 transition-all duration-300 overflow-hidden ${exp.isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="space-y-2 text-left text-gray-700">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      className="mt-4 text-secondary hover:text-primary transition-colors flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(exp.id);
                      }}
                    >
                      {exp.isExpanded ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          <span>Show More</span>
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Empty space for opposite side */}
                <div className={index % 2 === 0 ? 'md:pl-12' : 'md:order-first md:pr-12'}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;