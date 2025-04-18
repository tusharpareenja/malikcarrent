"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Car, Info, Moon, Sun, ChevronLeft, Star, Cog, Fuel, CircleGauge, LifeBuoy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/app/components/Navbar"
import { cars, type CarType } from "@/app/components/CarsSection" // Import cars data
// Add these imports at the top with the other imports
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, addDays, differenceInDays } from "date-fns"

type Theme = "light" | "dark"

export default function CarDetailClient() {
  const router = useRouter()
  const [car, setCar] = useState<CarType | null>(null)

  // Load the car data from localStorage on component mount
  useEffect(() => {
    const carId = localStorage.getItem("selectedCar")
    if (carId) {
      const selectedCar = cars.find((c) => c.id === Number.parseInt(carId))
      if (selectedCar) {
        setCar(selectedCar)
      } else {
        // If car not found, go back to cars section
        router.push("/#cars")
      }
    } else {
      // If no car selected, go back to cars section
      router.push("/#cars")
    }
  }, [router])

  const [pickupLocation, setPickupLocation] = useState("kharar")
  const [dropLocation, setDropLocation] = useState("kharar")
  const [basePrice, setBasePrice] = useState(2500)
  const [totalPrice, setTotalPrice] = useState(2500)
  const [additionalFees, setAdditionalFees] = useState(0)
  const [theme, setTheme] = useState<Theme>("light")

  // Add these state variables in the component after the existing useState declarations
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date())
  const [toDate, setToDate] = useState<Date | undefined>(addDays(new Date(), 1))
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  })

  // Update base price when car changes
  useEffect(() => {
    if (car) {
      setBasePrice(car.price)
      setTotalPrice(car.price)
    }
  }, [car])

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

  // Add this useEffect after the other useEffect hooks to calculate days and update price
  useEffect(() => {
    if (fromDate && toDate) {
      const days = Math.max(1, differenceInDays(toDate, fromDate))
      setNumberOfDays(days)
      setTotalPrice((basePrice + additionalFees) * days)
    }
  }, [fromDate, toDate, basePrice, additionalFees])

  // Add this function to handle booking form input changes
  const handleBookingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add this function to handle booking submission
  const handleBookingSubmit = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted:", {
      car: car?.name,
      fromDate,
      toDate,
      numberOfDays,
      totalPrice,
      pickupLocation,
      dropLocation,
      ...bookingForm,
    })

    // Close the dialog
    setBookingOpen(false)

    // Show confirmation (you could add a toast notification here)
    alert("Proceeding to payment...")
  }

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
      const savedTheme = localStorage.getItem("theme") as Theme | null
      const preferredTheme =
        savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

      setTheme(preferredTheme)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(theme)
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  // If car data is still loading or not found
  if (!car) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
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
          <Sun className="h-6 w-6 text-yellow-500 transition-transform duration-300" />
        ) : (
          <Moon className="h-6 w-6 text-gray-800 transition-transform duration-300" />
        )}
      </Button>
      <div className="container mx-auto py-8 px-4 mt-7">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" className="flex items-center gap-2 mb-4 mt-4" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
          {/* Car Image Section - Left */}
          <div className="order-2 md:order-1">
            <div className="rounded-xl overflow-hidden border shadow-sm dark:border-gray-800">
              <div className="relative h-96">
                <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
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
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {car.mileage} • {car.seats} Seats • {car.transmission}
                </p>
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
                <h3 className="font-medium">Date Selection</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal dark:border-gray-800"
                        >
                          {fromDate ? format(fromDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={(date) => {
                            setFromDate(date)
                            if (date && toDate && date >= toDate) {
                              setToDate(addDays(date, 1))
                            }
                          }}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">To Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal dark:border-gray-800"
                        >
                          {toDate ? format(toDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                          disabled={(date) => (fromDate ? date <= fromDate : date <= new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4 flex items-start">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    <span className="font-medium">
                      Duration: {numberOfDays} day{numberOfDays !== 1 ? "s" : ""}
                    </span>
                    <br />
                    Price is calculated per day and multiplied by the number of days.
                  </p>
                </div>

                <Separator className="dark:border-gray-800" />

                <h3 className="font-medium">Price Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Base price (per day)</span>
                    <span>₹{basePrice}</span>
                  </div>
                  {additionalFees > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Location fees</span>
                      <span>₹{additionalFees}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Number of days</span>
                    <span>× {numberOfDays}</span>
                  </div>
                  <Separator className="dark:border-gray-800" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Complete Your Booking</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={bookingForm.name}
                        onChange={handleBookingInput}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={bookingForm.email}
                        onChange={handleBookingInput}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={bookingForm.phone}
                        onChange={handleBookingInput}
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={bookingForm.dob}
                        onChange={handleBookingInput}
                        required
                      />
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md mt-2">
                      <p className="text-sm text-white font-medium">Booking Summary</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {car?.name} • {numberOfDays} day{numberOfDays !== 1 ? "s" : ""} • ₹{totalPrice}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {fromDate && format(fromDate, "PPP")} to {toDate && format(toDate, "PPP")}
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleBookingSubmit} className="w-full">
                    Proceed to Payment
                  </Button>
                </DialogContent>
              </Dialog>

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
