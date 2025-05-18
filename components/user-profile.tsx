"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Gift } from "lucide-react"

interface UserData {
  name: string
  email: string
  points: number
  isLoggedIn: boolean
}

export default function UserProfile() {
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
    }
    setIsLoading(false)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    setUserData(null)
    router.push("/")
  }

  const handleSignIn = () => {
    router.push("/auth")
  }

  if (isLoading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
  }

  if (!userData) {
    return (
      <Button variant="outline" size="sm" onClick={handleSignIn}>
        Sign In
      </Button>
    )
  }

  // Get first name for display
  const getFirstName = (name: string) => {
    return name.split(" ")[0]
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt={userData.name} />
            <AvatarFallback>{userData.name.split(" ")[0][0]}{userData.name.split(" ")[1]?.[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{getFirstName(userData.name)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <Gift className="mr-2 h-4 w-4 text-primary" />
          <span>Reward Points:</span>
          <span className="ml-auto font-medium">{userData.points}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}