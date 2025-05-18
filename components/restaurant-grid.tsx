"use client"

import RestaurantCard from "@/components/restaurant-card"
import { restaurants } from "@/lib/data"

export default function RestaurantGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}
