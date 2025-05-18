"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("signin")
  
  // Form states
  const [signInData, setSignInData] = useState({ email: "", password: "" })
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" })
  
  // Suggested Indian names for the placeholder
  const indianNames = [
    "Aarav Patel", "Aditi Sharma", "Aryan Singh", "Diya Verma", 
    "Ishaan Gupta", "Kavya Reddy", "Rohan Malhotra", "Ananya Desai"
  ]
  const [randomName, setRandomName] = useState(indianNames[0])

  useEffect(() => {
    setRandomName(indianNames[Math.floor(Math.random() * indianNames.length)])
  }, [])
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify({
        name: indianNames[Math.floor(Math.random() * indianNames.length)], // Random Indian name for sign in
        email: signInData.email,
        points: 50, // Existing users have 50 points
        isLoggedIn: true
      }))
      
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Store user info in localStorage with bonus points
      localStorage.setItem("user", JSON.stringify({
        name: signUpData.name,
        email: signUpData.email,
        points: 100, // New users get 100 points
        isLoggedIn: true
      }))
      
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }
  
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background p-4">
      <AnimatedBackground />
      
      <Link href="/" className="absolute top-4 left-4 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>
      
      <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-background/80 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to TasteTrack</CardTitle>
          <CardDescription>Sign in to access your rewards and personalized recommendations</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required
                    value={signInData.email}
                    onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required
                    value={signInData.password}
                    onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <button 
                    type="button"
                    className="text-primary hover:underline" 
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign up
                  </button>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder={randomName}
                    required
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                  />
                </div>
                
                <div className="rounded-lg bg-primary/5 p-3 text-sm">
                  <p className="font-medium text-primary">Sign up bonus!</p>
                  <p className="text-muted-foreground">Get 100 reward points instantly when you create an account</p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button 
                    type="button"
                    className="text-primary hover:underline" 
                    onClick={() => setActiveTab("signin")}
                  >
                    Sign in
                  </button>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}