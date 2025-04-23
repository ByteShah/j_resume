import React, { useState } from 'react';
import { FileText, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  details: string;
  image: string;
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Feasibility Report on Hydraulic Cylinder',
      description: 'BBA 3rd Year Project',
      year: '2018',
      details: 'Evaluated market potential, cost analysis, and technical requirements for hydraulic cylinder production. The comprehensive study included market size estimation, competitor analysis, production cost calculations, and ROI projections. The findings were presented to a panel of industry experts and received recognition for analytical depth and practical recommendations.',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'Market Research on Mayonnaise',
      description: 'BBA 2nd Year Project',
      year: '2017',
      details: 'Surveyed consumer preferences and competitive landscapes, providing insights for product positioning. The research involved taste tests with over 100 participants, price sensitivity analysis, and packaging design evaluation. Key findings revealed an untapped market segment for herb-infused mayonnaise variants that could be targeted with specific marketing strategies.',
      image: 'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Opportunities of Digital Marketing during Covid-19',
      description: 'MBA Summer Project',
      year: '2020',
      details: 'Researched the shifting landscape of digital marketing with a focus on recruitment firms during the Covid-19 pandemic. The study analyzed how recruitment strategies evolved to adapt to remote hiring processes, the rise of virtual job fairs, and the increased importance of employer branding during uncertain times. The research provided actionable insights for HR professionals navigating the challenges of talent acquisition during global disruptions.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };
  
  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-light">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-roboto font-bold text-primary text-center mb-2">
          Academic Projects
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-roboto font-bold text-primary mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description} | {project.year}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {project.details.substring(0, 100)}...
                </p>
                <div className="mt-auto">
                  <button
                    onClick={() => openProjectDetails(project)}
                    className="mt-2 bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-2"
                  >
                    <FileText size={16} />
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden animate-fade-in">
              <div className="relative h-64">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={closeProjectDetails}
                  className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md text-gray-700 hover:text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-roboto font-bold text-primary mb-2">{selectedProject.title}</h3>
                <p className="text-gray-600 mb-4">{selectedProject.description} | {selectedProject.year}</p>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-roboto font-medium text-primary mb-2">Project Overview</h4>
                  <p className="text-gray-700">{selectedProject.details}</p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeProjectDetails}
                    className="bg-primary hover:bg-primary/90 text-white font-opensans py-2 px-4 rounded transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;