"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Car, Info, Moon, Sun, ChevronLeft, Star, Cog, Fuel, CircleGauge, LifeBuoy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/app/components/Navbar"
import { cars } from "@/app/components/CarsSection" // Import cars data

type Theme = "light" | "dark";

export default function CarDetailPage({ params }: { params: { name: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("id");
  
  // Find the car based on ID or slug
  const car = cars.find(c => c.id.toString() === carId) || 
              cars.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === params.name);
  
  const [pickupLocation, setPickupLocation] = useState("kharar")
  const [dropLocation, setDropLocation] = useState("kharar")

  const [totalPrice, setTotalPrice] = useState(car?.price || 2500)
  const [additionalFees, setAdditionalFees] = useState(0)
  const [theme, setTheme] = useState<Theme>("light");




  // Calculate price based on pickup and drop locations
  useEffect(() => {
    let fees = 0

    if (pickupLocation !== "kharar") {
      fees += 500
    }

    if (dropLocation !== "kharar") {
      fees += 500
    }

    setAdditionalFees(fees)
    setTotalPrice(basePrice + fees)
  }, [pickupLocation, dropLocation, basePrice])

  const locations = [
    { value: "kharar", label: "Kharar" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "mohali", label: "Mohali" },
    { value: "panchkula", label: "Panchkula" },
    { value: "zirakpur", label: "Zirakpur" },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const preferredTheme = savedTheme || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

      setTheme(preferredTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // If car not found, display error message
  if (!car) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <Button onClick={() => router.push("/#cars")}>Back to Cars</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar darkMode={theme === "dark"} toggleDarkMode={toggleTheme} />
      <Button
        onClick={toggleTheme}
        className="fixed right-4 top-4 w-10 h-10 hover:cursor-pointer flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full z-50"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? (
          <Sun className="h-[1.5rem] w-[1.5rem] text-yellow-500 transition-transform duration-300" />
        ) : (
          <Moon className="h-[1.5rem] w-[1.5rem] text-gray-800 transition-transform duration-300" />
        )}
      </Button>
      <div className="container mx-auto py-8 px-4 mt-7">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2 mb-4 mt-4"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
          {/* Car Image Section - Left */}
          <div className="order-2 md:order-1">
            <div className="rounded-xl overflow-hidden border shadow-sm dark:border-gray-800">
              <div className="relative h-96">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="dark:border-gray-800">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Car className="h-5 w-5 mb-2 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm font-medium">{car.seats} Seater</p>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-800">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Cog className="h-5 w-5 mb-2 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm font-medium">{car.transmission}</p>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-800">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Fuel className="h-5 w-5 mb-2 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm font-medium">{car.fuelType}</p>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-800">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <CircleGauge className="h-5 w-5 mb-2 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm font-medium">{car.mileage}</p>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-800">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <LifeBuoy className="h-5 w-5 mb-2 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm font-medium">{car.wheeldrive}</p>
                </CardContent>
              </Card>


            </div>
          </div>

          {/* Car Details Section - Right */}
          <div className="order-1 md:order-2">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{car.category}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    {car.rating}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold">{car.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{car.mileage} • {car.seats} Seats • {car.transmission}</p>
              </div>

              <div className="flex items-center">
                <div className="text-3xl font-bold">₹{totalPrice}</div>
                <span className="text-gray-500 dark:text-gray-400 ml-2">per day</span>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-4 flex items-start">
                <Info className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-green-700 dark:text-green-400 text-sm">
                  <span className="font-medium">Free pickup and drop in Kharar.</span> Additional charges apply for
                  other locations.
                </p>
              </div>

              <Separator className="dark:border-gray-800" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Location</label>
                  <Select value={pickupLocation} onValueChange={setPickupLocation}>
                    <SelectTrigger className="dark:border-gray-800">
                      <SelectValue placeholder="Select pickup location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {pickupLocation !== "kharar" && (
                    <p className="text-amber-600 dark:text-amber-500 text-xs flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      Additional ₹500 for pickup outside Kharar
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Drop Location</label>
                  <Select value={dropLocation} onValueChange={setDropLocation}>
                    <SelectTrigger className="dark:border-gray-800">
                      <SelectValue placeholder="Select drop location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {dropLocation !== "kharar" && (
                    <p className="text-amber-600 dark:text-amber-500 text-xs flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      Additional ₹500 for drop outside Kharar
                    </p>
                  )}
                </div>
              </div>

              <Separator className="dark:border-gray-800" />

              <div className="space-y-3">
                <h3 className="font-medium">Price Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Base price</span>
                    <span>₹{basePrice}</span>
                  </div>
                  {additionalFees > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Location fees</span>
                      <span>₹{additionalFees}</span>
                    </div>
                  )}
                  <Separator className="dark:border-gray-800" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full">
                Book Now
              </Button>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>* Fuel policy: Return with same fuel level</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}