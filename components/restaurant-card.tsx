"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Restaurant } from "@/lib/types"
import { motion } from "framer-motion"

interface EmojiReaction {
  emoji: string
  label: string
  count: number
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [reactions, setReactions] = useState<EmojiReaction[]>([
    { emoji: "😍", label: "Love it", count: restaurant.reactions?.love || 0 },
    { emoji: "🤤", label: "Yummy", count: restaurant.reactions?.yummy || 0 },
    { emoji: "😐", label: "Meh", count: restaurant.reactions?.meh || 0 },
    { emoji: "👎", label: "Nope", count: restaurant.reactions?.nope || 0 },
  ])

  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)

  const handleReaction = (emoji: string) => {
    if (selectedReaction === emoji) {
      // Remove reaction
      setSelectedReaction(null)
      setReactions(reactions.map((r) => (r.emoji === emoji ? { ...r, count: Math.max(0, r.count - 1) } : r)))
    } else {
      // If there was a previous reaction, decrement it
      if (selectedReaction) {
        setReactions(
          reactions.map((r) => (r.emoji === selectedReaction ? { ...r, count: Math.max(0, r.count - 1) } : r)),
        )
      }

      // Add new reaction with a random boost (simulating other users also reacting)
      const randomBoost = Math.floor(Math.random() * 3) + 1 // Add 1-3 extra reactions
      setSelectedReaction(emoji)
      setReactions(reactions.map((r) => (r.emoji === emoji ? { ...r, count: r.count + randomBoost } : r)))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {restaurant.isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="absolute right-2 top-2 bg-green-500 text-white hover:bg-green-600">
                <Clock className="mr-1 h-3 w-3" /> Open Now
              </Badge>
            </motion.div>
          )}
        </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">{restaurant.name}</h3>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mb-3 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3 w-3" />
          <span>{restaurant.distance} miles away</span>
          <span className="mx-2">•</span>
          <span>{"$".repeat(restaurant.priceLevel)}</span>
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {restaurant.cuisines.map((cuisine) => (
            <Badge key={cuisine} variant="secondary" className="text-xs">
              {cuisine}
            </Badge>
          ))}
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{restaurant.description}</p>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center gap-1 border-t p-3">
        {reactions.map((reaction) => (
          <Button
            key={reaction.emoji}
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 gap-1 rounded-full px-3 text-xs",
              selectedReaction === reaction.emoji && "bg-primary/10",
            )}
            onClick={() => handleReaction(reaction.emoji)}
          >
            <motion.span 
              whileHover={{ scale: 1.4 }} 
              whileTap={{ scale: 0.8, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {reaction.emoji}
            </motion.span>
            {reaction.count > 0 && (
              <motion.span 
                className="font-medium"
                key={reaction.count} // Force animation on count change
                initial={{ scale: 1.5, color: "#f97316" }}
                animate={{ scale: 1, color: selectedReaction === reaction.emoji ? "#f97316" : "#64748b" }}
                transition={{ duration: 0.3 }}
              >
                {reaction.count}
              </motion.span>
            )}
          </Button>
        ))}
      </CardFooter>
    </Card>
    </motion.div>
  )
}
