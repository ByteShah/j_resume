import React, { useState } from 'react';
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
  gpa: string;
  details?: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
}

const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'certifications'>('education');
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  
  const educations: Education[] = [
    {
      id: 1,
      degree: 'Master of Business Administration (MBA)',
      institution: 'K.S. School of Business Management, Gujarat University',
      year: '2021',
      gpa: '4.09/5.00',
      details: 'Specialized in Human Resource Management with focus on organizational behavior and talent development. Completed coursework in recruitment strategies, employee relations, and HR analytics.'
    },
    {
      id: 2,
      degree: 'Bachelor of Business Administration (BBA)',
      institution: 'K.S. School of Business Management, Gujarat University',
      year: '2019',
      gpa: '3.30/4.00',
      details: 'Gained foundational knowledge in business operations, management principles, and organizational behavior. Participated in various business case competitions and workshops.'
    }
  ];
  
  const certifications: Certification[] = [
    {
      id: 1,
      name: 'CCC (Course on Computer Concepts)',
      issuer: 'NIELIT',
      year: '2020'
    },
    {
      id: 2,
      name: 'Cleanliness Survey Certification',
      issuer: 'Ahmedabad Police Initiative',
      year: '2019'
    }
  ];
  
  const openEducationDetails = (education: Education) => {
    setSelectedEducation(education);
  };
  
  const closeEducationDetails = () => {
    setSelectedEducation(null);
  };

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-roboto font-bold text-primary text-center mb-2">
          Education & Certifications
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`px-6 py-3 text-base font-medium rounded-l-lg border ${
                activeTab === 'education'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-light'
              }`}
            >
              <GraduationCap className="inline mr-2" size={18} />
              Education
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('certifications')}
              className={`px-6 py-3 text-base font-medium rounded-r-lg border ${
                activeTab === 'certifications'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-light'
              }`}
            >
              <Award className="inline mr-2" size={18} />
              Certifications
            </button>
          </div>
        </div>
        
        {/* Education Cards */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educations.map((education) => (
              <div 
                key={education.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                // onClick={() => openEducationDetails(education)}
              >
                <div className="bg-primary h-16 flex items-center justify-center">
                  <GraduationCap size={40} className="text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-roboto font-bold text-primary mb-2">{education.degree}</h3>
                  <p className="text-gray-700 mb-3">{education.institution}</p>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {education.year}
                    </div>
                    <div className="font-medium text-secondary">
                      GPA: {education.gpa}
                    </div>
                  </div>
                  
                  {/* <button 
                    className="mt-4 text-secondary hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ExternalLink size={16} />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Certification Badges */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div 
                key={cert.id}
                className="bg-white rounded-lg shadow-md overflow-hidden p-6 flex flex-col items-center text-center hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-light flex items-center justify-center mb-4">
                  <Award size={40} className="text-secondary" />
                </div>
                <h3 className="text-lg font-roboto font-bold text-primary mb-2">{cert.name}</h3>
                <p className="text-gray-700 mb-2">{cert.issuer}</p>
                <div className="text-gray-600 text-sm flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Education Details Modal */}
        {selectedEducation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-roboto font-bold text-primary">{selectedEducation.degree}</h3>
                <button 
                  onClick={closeEducationDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-lg text-gray-700">{selectedEducation.institution}</p>
                <div className="flex gap-4 text-gray-600 mt-2">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {selectedEducation.year}
                  </div>
                  <div className="font-medium text-secondary">
                    GPA: {selectedEducation.gpa}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-roboto font-medium text-primary mb-2">Program Details</h4>
                <p className="text-gray-700">{selectedEducation.details}</p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeEducationDetails}
                  className="bg-primary hover:bg-primary/90 text-white font-opensans py-2 px-4 rounded transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;