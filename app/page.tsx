import Link from "next/link"
import { Suspense } from "react"
import { ArrowRight, ChevronDown, Utensils, MapPin, Star } from "lucide-react"
import RestaurantGrid from "@/components/restaurant-grid"
import SearchFilters from "@/components/search-filters"
import TrendingSection from "@/components/trending-section"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimatedBackground from "@/components/animated-background"
import AnimatedHero from "@/components/animated-hero"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import ClientButton from "@/components/client-button"
import UserProfile from "@/components/user-profile"
import WelcomeBanner from "@/components/welcome-banner"
import { MotionWrapper } from "@/components/motion-wrapper"

// Example list of Indian names; replace or expand as needed
const indianNames = [
  "Arjun",
  "Anjali",
  "Vikram",
  "Priya",
  "Rohan",
  "Sneha",
  "Amit",
  "Neha",
  "Rahul",
  "Pooja"
]
const randomName = indianNames[Math.floor(Math.random() * indianNames.length)]

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Navbar at the very top */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M6.8 2h10.4a2 2 0 0 1 1.9 2.5l-2.8 9.5a2 2 0 0 1-1.9 1.5H5.6a2 2 0 0 1-1.9-1.5L1 4.5A2 2 0 0 1 2.8 2Z" />
              <path d="M6 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" />
              <path d="M9 20h6" />
              <path d="M8.8 2 7 7" />
              <path d="M15.2 2 17 7" />
            </svg>
            <h1 className="text-xl font-bold">TasteTrack</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex">
              <ul className="flex items-center gap-6">
                <li>
                  <Link href="#search-section" className="text-sm font-medium transition-colors hover:text-primary">
                    Discover
                  </Link>
                </li>
                <li>
                  <Link href="#trending-section" className="text-sm font-medium transition-colors hover:text-primary">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials-section" className="text-sm font-medium transition-colors hover:text-primary">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="hidden md:block">
              <UserProfile />
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Animated Hero Section */}
      <AnimatedHero />

      <main>
        {/* Features Section */}
        <section id="features-section" className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Why Food Lovers Choose TasteTrack</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Our platform is designed to make finding your next favorite restaurant simple, social, and personalized
                to your taste preferences.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <MotionWrapper
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <FeatureCard
                  icon={<Utensils className="h-10 w-10" />}
                  title="Personalized Recommendations"
                  description="Get restaurant suggestions tailored to your taste preferences, dietary restrictions, and past favorites."
                />
              </MotionWrapper>
              <MotionWrapper
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <FeatureCard
                  icon={<MapPin className="h-10 w-10" />}
                  title="Location-Based Discovery"
                  description="Find the best restaurants near you or explore options in areas you plan to visit."
                />
              </MotionWrapper>
              <MotionWrapper
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <FeatureCard
                  icon={<Star className="h-10 w-10" />}
                  title="Real-Time Reactions"
                  description="See what others think with our emoji reaction system that gives you instant feedback on restaurants."
                />
              </MotionWrapper>
            </div>
            
            {/* Rewards Program Highlight */}
            <div className="mt-12 rounded-xl bg-primary/10 p-6 backdrop-blur-sm dark:bg-primary/5">
              <div className="flex flex-col items-center text-center md:flex-row md:text-left">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 md:mb-0 md:mr-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="M16 6 7 22" />
                    <path d="m8 6 9 16" />
                    <path d="M12 6a4 4 0 0 0-4 4v10" />
                    <path d="M12 6a4 4 0 0 1 4 4v10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold">TasteTrack Rewards Program</h3>
                  <p className="mb-4 text-muted-foreground">
                    Earn points with every interaction and unlock exclusive benefits like discounts, free items, and VIP experiences at participating restaurants.
                  </p>
                  <ClientButton href="/auth" variant="default" size="sm">
                    Join Now - Get 100 Points Free
                  </ClientButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="search-section" className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Find Your Perfect Meal</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Search for restaurants by cuisine, location, or dietary preferences. Filter results to find exactly what
                you're craving.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>}>
                <SearchFilters />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section id="trending-section" className="py-16 md:py-24">
          <div className="container">
            <TrendingSection />
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Recommended for you</h2>
              <p className="text-muted-foreground">Based on your preferences and popular choices in your area.</p>
            </div>
            <Suspense
              fallback={
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[300px] animate-pulse rounded-xl bg-muted"></div>
                  ))}
                </div>
              }
            >
              <RestaurantGrid />
            </Suspense>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials-section" className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Join thousands of food enthusiasts who have discovered their new favorite restaurants with TasteTrack.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <TestimonialCard
                quote="TasteTrack helped me discover amazing restaurants serving authentic regional cuisines I never knew existed in my city!"
                author="Arjun Sharma"
                role="Food Critic"
                avatar="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=1974&auto=format&fit=crop"
                rating={5}
              />
              <TestimonialCard
                quote="The emoji reactions are brilliant! I can quickly see what my friends think about a restaurant before making reservations."
                author="Vikram Mehta"
                role="Tech Entrepreneur"
                avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
                rating={5}
              />
              <TestimonialCard
                quote="As a vegetarian, I love how easy it is to filter for restaurants that offer great plant-based options beyond the usual paneer dishes."
                author="Anjali Patel"
                role="Food & Travel Blogger"
                avatar="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                rating={4}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-section" className="relative overflow-hidden py-16 md:py-24">
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl rounded-xl bg-primary/10 p-8 text-center backdrop-blur-sm dark:bg-primary/5">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Discover Your Next Favorite Restaurant?
              </h2>
              <p className="mb-8 text-lg">
                Join TasteTrack today and start exploring the best dining options tailored just for you.
              </p>
              <ClientButton size="lg" className="animate-pulse" href="/auth">
                Sign Up — Get 100 Points Free
              </ClientButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
