import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
    
  useEffect(() => {
    const heading = headingRef.current;
    if (heading) {
      heading.classList.add('animate-in');
    }
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToCars = () => {
    const carsSection = document.getElementById('cars');
    if (carsSection) {
      carsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury car background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-purple-900/40 to-gray-800"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20 ">
        <div className="max-w-3xl">
          <h1 
            ref={headingRef}
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <span className="block">Find Your</span>
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              Perfect Ride
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 mt-8 animate-fade-in-up">
            Luxury cars at the best prices. Experience the thrill of driving your dream car today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-bold text-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Rent Now
            </button>
            <button 
              onClick={scrollToCars}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-bold text-lg transform transition-all duration-300 hover:bg-white/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
            >
              View Cars
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated shapes */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent z-10"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-20 -left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
    </section>
  );
};

export default HeroSection;