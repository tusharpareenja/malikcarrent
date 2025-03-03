"use client"

import React, { useState, Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "./date-picker"
import { format } from "date-fns"

// Define the Car interface to match what's coming from CarsSection
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

// Define props for CarBookingForm
interface CarBookingFormProps {
  car: Car;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CarBookingForm({ car, setIsOpen }: CarBookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    fromDate: null as Date | null,
    toDate: null as Date | null,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (field: "fromDate" | "toDate", date: Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: date }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate dates
    if (!formData.fromDate || !formData.toDate) {
      setError("Please select both from and to dates")
      setIsSubmitting(false)
      return
    }

    // Format dates for API
    const fromDateFormatted = format(formData.fromDate, "yyyy-MM-dd")
    const toDateFormatted = format(formData.toDate, "yyyy-MM-dd")

    try {
      const response = await fetch("/api/carbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pickup: formData.pickupLocation,
          from: fromDateFormatted,
          to: toDateFormatted,
          car: car.name
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit booking")
      }

      // Success
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Booking error:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <Card className="w-full max-w-md border-gray-800 bg-gray-900 text-gray-100 shadow-xl">
        {!isSubmitted ? (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white">Book {car.name}</CardTitle>
              <CardDescription className="text-gray-400">
                {car.category} | {car.seats} Seats | ₹{car.price}/day
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-md text-red-200 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupLocation" className="text-gray-300">Pickup Location</Label>
                  <Input
                    id="pickupLocation"
                    name="pickupLocation"
                    placeholder="Airport, Hotel, etc."
                    required
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromDate" className="text-gray-300">From Date</Label>
                    <DatePicker date={formData.fromDate} setDate={(date) => handleDateChange("fromDate", date)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toDate" className="text-gray-300">To Date</Label>
                    <DatePicker date={formData.toDate} setDate={(date) => handleDateChange("toDate", date)} />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Book Now"}
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <CardContent className="pt-6 pb-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>
            <p className="text-gray-400 mb-6">
              Thank you for booking the {car.name}. We will contact you shortly.
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
            >
              Close
            </Button>
          </CardContent>
        )}
        <CardFooter className="border-t border-gray-800 bg-gray-900/50 px-6 py-3 flex justify-between">
          {!isSubmitted && (
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          )}
          {!isSubmitted && (
            <div className="text-right">
              <p className="text-sm text-gray-400 font-medium">Total: ₹{car.price}/day</p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}