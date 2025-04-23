import React, { useState, useRef } from 'react';
import { Mail, Phone, Linkedin, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const result = await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formRef.current!,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        if (result.text === 'OK') {
          setSubmitted(true);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          
          setTimeout(() => {
            setSubmitted(false);
          }, 5000);
        }
      } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-roboto font-bold text-primary text-center mb-2">
          Get In Touch
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-roboto font-medium text-primary mb-6">Send Me a Message</h3>
            
            {submitted ? (
              <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded mb-6">
                <p className="font-medium">Thank you for your message!</p>
                <p>I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Job Opportunity"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="I'd like to discuss a potential opportunity..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center gap-2 w-full font-medium ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-roboto font-medium text-primary mt-6 p-4 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-full p-3 text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-roboto font-medium text-primary mb-1">Email</h4>
                  <a href="mailto:jankikadiya99@gmail.com" className="text-gray-700 hover:text-secondary transition-colors">
                    jankikadiya99@gmail.com
                  </a>
                </div>
              </div>
              
              {/* <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-full p-3 text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-roboto font-medium text-primary mb-1">Phone</h4>
                  <a href="tel:+917623846157" className="text-gray-700 hover:text-secondary transition-colors">
                    +91-7623846157
                  </a>
                </div>
              </div> */}
              
              <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-full p-3 text-white">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h4 className="font-roboto font-medium text-primary mb-1">LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/janki-kadiya-44ba3319a/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-secondary transition-colors">
                    linkedin.com/in/janki-kadiya
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-full p-3 text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-roboto font-medium text-primary mb-1">Location</h4>
                  <p className="text-gray-700">
                    Ahmedabad, Gujarat, India
                  </p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="mt-8 h-64 bg-light rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.2751004416!2d72.41493274591338!3d23.020158054034642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1697827990386!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;