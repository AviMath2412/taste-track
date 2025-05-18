"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, X, MapPin, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { restaurants } from "@/lib/data"

const cuisines = [
  "Indian",
  "South Indian",
  "North Indian",
  "Punjabi",
  "Mughlai",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "Japanese",
  "Mediterranean",
  "Continental",
  "Street Food",
  "Biryani",
  "Vegetarian",
  "Vegan",
]

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Jain", "Sattvic", "Halal"]

const locations = ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "MG Road", "JP Nagar", "Jayanagar", "Electronic City"]

export default function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([2])
  const [distance, setDistance] = useState([5])
  const [isFiltering, setIsFiltering] = useState(false)
  const [filteredCount, setFilteredCount] = useState(restaurants.length)
  const [showFilterResults, setShowFilterResults] = useState(false)

  // Apply filters effect
  useEffect(() => {
    // Simulate filtering
    const timer = setTimeout(() => {
      if (selectedCuisines.length > 0 || selectedDietary.length > 0 || 
          selectedLocation || searchQuery.trim() !== "") {
        // Calculate a realistic filtered count based on applied filters
        let count = restaurants.length
        
        if (selectedCuisines.length > 0) {
          count = Math.floor(count * 0.7) // Reduce by 30%
        }
        
        if (selectedDietary.length > 0) {
          count = Math.floor(count * 0.8) // Reduce by another 20%
        }
        
        if (selectedLocation) {
          count = Math.floor(count * 0.6) // Reduce by another 40%
        }
        
        if (searchQuery.trim() !== "") {
          count = Math.max(1, Math.floor(count * 0.5)) // Reduce by 50% but ensure at least 1
        }
        
        setFilteredCount(count)
        setShowFilterResults(true)
      } else {
        setFilteredCount(restaurants.length)
        setShowFilterResults(false)
      }
      setIsFiltering(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [selectedCuisines, selectedDietary, selectedLocation, searchQuery])

  const toggleCuisine = (cuisine: string) => {
    setIsFiltering(true)
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine))
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine])
    }
  }

  const toggleDietary = (option: string) => {
    setIsFiltering(true)
    if (selectedDietary.includes(option)) {
      setSelectedDietary(selectedDietary.filter((o) => o !== option))
    } else {
      setSelectedDietary([...selectedDietary, option])
    }
  }
  
  const selectLocation = (location: string) => {
    setIsFiltering(true)
    setSelectedLocation(location === selectedLocation ? null : location)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltering(true)
    setSearchQuery(e.target.value)
  }

  const clearFilters = () => {
    setIsFiltering(true)
    setSearchQuery("")
    setSelectedCuisines([])
    setSelectedDietary([])
    setSelectedLocation(null)
    setPriceRange([2])
    setDistance([5])
  }

  return (
    <div className="space-y-4">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search for restaurants, dishes, or cuisines..." 
          className="pl-10 pr-4 h-12 text-base" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </motion.div>

      <AnimatePresence>
        {(selectedCuisines.length > 0 || selectedDietary.length > 0 || selectedLocation) && (
          <motion.div 
            className="flex flex-wrap items-center gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedCuisines.map((cuisine) => (
              <motion.div
                key={cuisine}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Badge variant="secondary" className="flex items-center gap-1">
                  {cuisine}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCuisine(cuisine)} />
                </Badge>
              </motion.div>
            ))}
            
            {selectedDietary.map((option) => (
              <motion.div
                key={option}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  {option}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleDietary(option)} />
                </Badge>
              </motion.div>
            ))}
            
            {selectedLocation && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Badge variant="secondary" className="flex items-center gap-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  <MapPin className="h-3 w-3" />
                  {selectedLocation}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation(null)} />
                </Badge>
              </motion.div>
            )}

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.1 }}
            >
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                Clear all
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        {cuisines.slice(0, 6).map((cuisine) => (
          <motion.div
            key={cuisine}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCuisine(cuisine)}
            >
              {cuisine}
            </Badge>
          </motion.div>
        ))}
        
        {locations.slice(0, 3).map((location) => (
          <motion.div
            key={location}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant={selectedLocation === location ? "default" : "outline"}
              className={`cursor-pointer ${selectedLocation === location ? "bg-blue-600" : ""}`}
              onClick={() => selectLocation(location)}
            >
              <MapPin className="mr-1 h-3 w-3" />
              {location}
            </Badge>
          </motion.div>
        ))}

        <Sheet>
          <SheetTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                More Filters
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your restaurant search with these filters.</SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium">Cuisine Types</h3>
                <div className="flex flex-wrap gap-2">
                  {cuisines.map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCuisine(cuisine)}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedDietary.includes(option) ? "default" : "outline"}
                      className={`cursor-pointer ${selectedDietary.includes(option) ? "bg-green-600" : ""}`}
                      onClick={() => toggleDietary(option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-sm font-medium">Location</h3>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Badge
                      key={location}
                      variant={selectedLocation === location ? "default" : "outline"}
                      className={`cursor-pointer ${selectedLocation === location ? "bg-blue-600" : ""}`}
                      onClick={() => selectLocation(location)}
                    >
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Price Range</h3>
                <div className="px-2">
                  <Slider defaultValue={priceRange} max={4} min={1} step={1} onValueChange={setPriceRange} />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>₹</span>
                    <span>₹₹</span>
                    <span>₹₹₹</span>
                    <span>₹₹₹₹</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Distance (km)</h3>
                <div className="px-2">
                  <Slider defaultValue={distance} max={20} min={1} step={1} onValueChange={setDistance} />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Sort By</h3>
                <Select defaultValue="relevance">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Filter results indicator */}
      <AnimatePresence>
        {showFilterResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-between rounded-md bg-muted p-2 text-sm"
          >
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-primary" />
              <span>
                <strong>{filteredCount}</strong> {filteredCount === 1 ? "restaurant" : "restaurants"} found
              </span>
            </div>
            {isFiltering && (
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <span className="text-xs text-muted-foreground">Updating...</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
