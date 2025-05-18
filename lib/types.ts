export interface Restaurant {
  id: string
  name: string
  image: string
  description: string
  rating: number
  priceLevel: number
  distance: number
  cuisines: string[]
  isOpen: boolean
  reactions?: {
    love: number
    yummy: number
    meh: number
    nope: number
  }
}
