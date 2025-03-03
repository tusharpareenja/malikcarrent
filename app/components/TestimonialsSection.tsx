"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Business Traveler',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Malik Car Rent provided me with an exceptional experience. The car was in pristine condition, and the service was top-notch. I highly recommend them for business travel!'
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Tourist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 4,
    text: 'I rented an SUV for my family trip, and it was perfect! The booking process was smooth, and the staff was very helpful. Will definitely use their service again.'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Corporate Client',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Our company has been using Malik Car Rent for all our transportation needs. Their fleet is always well-maintained, and their customer service is unmatched. Highly recommended!'
  },
  {
    id: 4,
    name: 'Ananya Gupta',
    role: 'Weekend Traveler',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 4,
    text: 'Rented a luxury car for a weekend getaway, and it made the trip so much more special! The car was spotless and drove like a dream. Great value for money.'
  }
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Testimonials</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 p-4">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-4">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prevTestimonial} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
          <button onClick={nextTestimonial} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
