import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import CarBookingForm from './BookingForm';
import type { StaticImageData } from 'next/image';
import Image from "next/image";
import baleno from'../../public/cars/baleno.webp'
import ciaz from'../../public/cars/ciaz.webp'
import oldfortuner from'../../public/cars/fortunerold.jpg'
import fortuner from'../../public/cars/fortunersigma.jpg'
import legender from'../../public/cars/legender.jpg'
import scorpio from'../../public/cars/scorpios11.jpg'
import thar from'../../public/cars/thar.jpg'
import roxx from'../../public/cars/roxx.webp'

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  image:  StaticImageData;
  seats: number;
  transmission: string;
  fuelType: string;
  mileage: string;
  rating: number;
  wheeldrive: String;
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Baleno',
    category: 'Hatchback',
    price: 2199,
    image: baleno,
    wheeldrive: '4x2',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Diesel',
    mileage: '25 km/l',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Ciaz',
    category: 'Sedan',
    price: 2499,
    image: ciaz,
    wheeldrive: '4x2',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Diesel',
    mileage: '25 km/l',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Fortuner Type 2',
    category: 'SUV',
    price: 4499,
    image: oldfortuner,
    seats: 7,
    transmission: 'Manual',
    wheeldrive: '4x4',
    fuelType: 'Diesel',
    mileage: '15 km/l',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Fortuner Sigma 4',
    category: 'SUV',
    price: 6999,
    image: fortuner,
    seats: 7,
    transmission: 'Automatic',
    wheeldrive: '4x4',
    fuelType: 'Diesel',
    mileage: '14 km/l',
    rating: 4.6
  },
  {
    id: 5,
    name: 'Fortuner Legender',
    category: 'SUV',
    price: 7999,
    image: legender,
    seats: 7,
    transmission: 'Automatic',
    wheeldrive: '4x4',
    fuelType: 'Diesel',
    mileage: '14 km/l',
    rating: 4.5
  },
  {
    id: 6,
    name: 'Scorpio s11',
    category: 'SUV',
    price: 3999,
    image: scorpio,
    seats: 7,
    wheeldrive: '4x2',
    transmission: 'Manual',
    fuelType: 'Petrol',
    mileage: '15 km/l',
    rating: 5.0
  },
  {
    id: 7,
    name: 'Thar',
    category: 'SUV',
    price: 3999,
    image: thar,
    seats: 5,
    transmission: 'Automatic',
    wheeldrive: '4x4',
    fuelType: 'Diesel',
    mileage: '14 km/l',
    rating: 4.5
  },
  {
    id: 8,
    name: 'Thar Roxx',
    category: 'SUV',
    price: 4999,
    image: roxx,
    seats: 5,
    transmission: 'Automatic',
    wheeldrive: '4x4',
    fuelType: 'Petrol',
    mileage: '15 km/l',
    rating: 5.0
  }
];

const CarsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(12000);
  const [open, setisopen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', 'Sedan', 'SUV', 'Hatchback'];

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

    // Add click event listener to handle clicks outside of car cards
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.car-card')) {
        setActiveCardId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleClickOutside);
    };
  }, [filteredCars]);

  const handleRentNow = (car: Car) => {
    setSelectedCar(car);
    setisopen(true);
  };

  const handleCardClick = (e: React.MouseEvent, carId: number) => {
    // Prevent triggering when clicking the Rent Now button
    if (!(e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      setActiveCardId(activeCardId === carId ? null : carId);
    }
  };

  return (
    <section 
      id="cars" 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 t dark:text-black text-black">
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
              onClick={(e) => handleCardClick(e, car.id)}
              className={`car-card bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group opacity-0 translate-y-8 cursor-pointer`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 flex items-end p-4 
                    ${activeCardId === car.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
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
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {car.mileage}
                      </span>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {car.wheeldrive}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">{car.name}</h3>
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