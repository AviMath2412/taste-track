"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gift, Star, Award, Clock } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"

interface UserData {
  name: string
  email: string
  points: number
  isLoggedIn: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUserData(parsedUser)
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    } else {
      // Redirect to auth page if not logged in
      router.push("/auth")
    }
    setIsLoading(false)
  }, [router])

  // Get initials for avatar
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-muted animate-pulse"></div>
      </div>
    )
  }

  if (!userData) {
    return null // Will redirect in useEffect
  }

  // Calculate user level based on points
  const getUserLevel = (points: number) => {
    if (points >= 500) return "Gourmet Explorer"
    if (points >= 300) return "Food Enthusiast"
    if (points >= 100) return "Taste Adventurer"
    return "Flavor Seeker"
  }

  // Calculate progress to next level
  const getNextLevelPoints = (points: number) => {
    if (points < 100) return 100
    if (points < 300) return 300
    if (points < 500) return 500
    return 1000
  }

  const nextLevel = getNextLevelPoints(userData.points)
  const progress = (userData.points / nextLevel) * 100

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatedBackground />
      
      <div className="container max-w-4xl py-8">
        <div className="mb-8 flex items-center">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* User Profile Card */}
          <Card className="md:col-span-1 backdrop-blur-sm bg-background/80 border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" alt={userData.name} />
                  <AvatarFallback className="text-2xl">{getInitials(userData.name)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{userData.name}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
              <Badge className="mt-2 bg-primary/20 text-primary hover:bg-primary/30">
                {getUserLevel(userData.points)}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Reward Points</span>
                  <span className="font-bold text-primary">{userData.points}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress to {userData.points < 100 ? "Taste Adventurer" : 
                           userData.points < 300 ? "Food Enthusiast" : 
                           userData.points < 500 ? "Gourmet Explorer" : "Master Chef"}</span>
                    <span>{userData.points} / {nextLevel}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div 
                      className="h-2 rounded-full bg-primary" 
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Edit Profile</Button>
            </CardFooter>
          </Card>
          
          {/* Rewards and Activity */}
          <div className="md:col-span-2 space-y-6">
            {/* Rewards Card */}
            <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
              <CardHeader>
                <div className="flex items-center">
                  <Gift className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Rewards</CardTitle>
                </div>
                <CardDescription>Earn points and unlock exclusive benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">10% Off Next Order</h4>
                        <p className="text-xs text-muted-foreground">100 points</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Free Dessert</h4>
                        <p className="text-xs text-muted-foreground">200 points</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Priority Reservation</h4>
                        <p className="text-xs text-muted-foreground">300 points</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <Gift className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Chef's Special Tasting</h4>
                        <p className="text-xs text-muted-foreground">500 points</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>Your latest interactions and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.points >= 100 ? (
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <div className="mr-3 rounded-full bg-green-100 p-1 dark:bg-green-900">
                          <Gift className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Sign-up Bonus</p>
                          <p className="text-xs text-muted-foreground">Welcome reward</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">+100 points</p>
                        <p className="text-xs text-muted-foreground">Just now</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <div className="mr-3 rounded-full bg-green-100 p-1 dark:bg-green-900">
                          <Gift className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Account Created</p>
                          <p className="text-xs text-muted-foreground">Welcome to TasteTrack</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">+50 points</p>
                        <p className="text-xs text-muted-foreground">Just now</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Start exploring restaurants to earn more points!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}