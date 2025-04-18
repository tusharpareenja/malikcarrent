import { CarList } from "./car-list"

export default function AdminPage() {
  return (
 
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Malik Car Rent - Admin Dashboard</h1>
          <CarList />
        </div>
      </div>
   
  )
}
