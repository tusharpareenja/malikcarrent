"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { format } from "date-fns"

type Car = {
  id: number
  name: string
  available: boolean
  availableDate: Date | null
}

const initialCars: Car[] = [
  { id: 1, name: "Toyota Camry", available: true, availableDate: null },
  { id: 2, name: "Honda Accord", available: true, availableDate: null },
  { id: 3, name: "BMW 3 Series", available: true, availableDate: null },
  { id: 4, name: "Mercedes C-Class", available: true, availableDate: null },
  { id: 5, name: "Audi A4", available: true, availableDate: null },
  { id: 6, name: "Tesla Model 3", available: true, availableDate: null },
]

export function CarList() {
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleAvailabilityToggle = (carId: number, available: boolean) => {
    if (available) {
      setCars(cars.map((car) => (car.id === carId ? { ...car, available: true, availableDate: null } : car)))
    } else {
      const car = cars.find((c) => c.id === carId)
      if (car) {
        setSelectedCar(car)
        setIsDatePickerOpen(true)
      }
    }
  }

  const handleDateConfirm = () => {
    if (selectedCar && selectedDate) {
      setCars(
        cars.map((car) =>
          car.id === selectedCar.id ? { ...car, available: false, availableDate: selectedDate } : car,
        ),
      )
      setIsDatePickerOpen(false)
      setSelectedCar(null)
      setSelectedDate(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <Card key={car.id} className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-2 text-white">{car.name}</h2>
            {car.available ? (
              <Badge className="bg-green-600 hover:bg-green-700">Available</Badge>
            ) : (
              <div className="space-y-1">
                <Badge className="bg-red-600 hover:bg-red-700">Not Available</Badge>
                {car.availableDate && (
                  <p className="text-sm text-zinc-400">Available from: {format(car.availableDate, "PPP")}</p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              variant={car.available ? "default" : "outline"}
              className={car.available ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={() => handleAvailabilityToggle(car.id, true)}
            >
              Available
            </Button>
            <Button
              variant={!car.available ? "default" : "outline"}
              className={!car.available ? "bg-red-600 hover:bg-red-700" : ""}
              onClick={() => handleAvailabilityToggle(car.id, false)}
            >
              Not Available
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>When will this car be available again?</DialogTitle>
            <DialogDescription>
              Select a date when {selectedCar?.name} will be available for rent again.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-center">
          <Calendar
                mode="single"
                selected={selectedDate ?? undefined}
                onSelect={(date) => setSelectedDate(date ?? null)}
                className="rounded-md border border-zinc-800 text-white"
                disabled={(date) => date < new Date()}
                />


          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDatePickerOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDateConfirm} disabled={!selectedDate}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
