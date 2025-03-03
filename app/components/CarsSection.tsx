import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import CarBookingForm from './BookingForm';
import Image from "next/image";

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  seats: number;
  transmission: string;
  fuelType: string;
  mileage: string;
  rating: number;
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Audi A4',
    category: 'Sedan',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    mileage: '14 km/l',
    rating: 4.8
  },
  {
    id: 2,
    name: 'BMW X5',
    category: 'SUV',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    mileage: '12 km/l',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Mercedes C-Class',
    category: 'Sedan',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    mileage: '15 km/l',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Toyota Fortuner',
    category: 'SUV',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1625695325335-8c3df2a458cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    mileage: '14 km/l',
    rating: 4.6
  },
  {
    id: 5,
    name: 'Honda City',
    category: 'Sedan',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol',
    mileage: '18 km/l',
    rating: 4.5
  },
  {
    id: 6,
    name: 'Porsche 911',
    category: 'Sports',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    mileage: '10 km/l',
    rating: 5.0
  }
];

const CarsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(12000);
  const [open, setisopen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', 'Sedan', 'SUV', 'Sports'];

  const filteredCars = cars.filter(car => {
    const categoryMatch = activeFilter === 'All' || car.category === activeFilter;
    const priceMatch = car.price <= priceRange;
    return categoryMatch && priceMatch;
  });

  useEffect(() => {
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

    // Observe the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe all car cards
    document.querySelectorAll('.car-card').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredCars]);

  const handleRentNow = (car: Car) => {
    setSelectedCar(car);
    setisopen(true);
  };

  return (
    <section 
      id="cars" 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Premium <span className="text-purple-600 dark:text-purple-400">Fleet</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our wide range of premium cars for your next journey. We offer the best rates and exceptional service.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 animation-delay-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Price: ₹{priceRange}
              </label>
              <input
                type="range"
                min="1000"
                max="12000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <div
              key={car.id}
              className="car-card bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group opacity-0 translate-y-8"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">{car.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {car.seats} Seats
                      </span>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {car.transmission}
                      </span>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {car.fuelType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{car.name}</h3>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                    {car.category}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-2xl font-bold dark:text-black text-black">₹{car.price}</span>
                    <span className="text-gray-700 dark:text-gray-400 text-sm ml-1">/day</span>
                  </div>
                  <button 
                   onClick={() => handleRentNow(car)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {open && selectedCar && <CarBookingForm car={selectedCar} setIsOpen={setisopen} />}
    </section>
    
  );
};

export default CarsSection;