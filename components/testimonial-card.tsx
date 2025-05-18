import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
}

export default function TestimonialCard({ quote, author, role, avatar, rating }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="flex flex-col p-6">
        <div className="mb-4 text-lg italic text-muted-foreground">"{quote}"</div>

        <div className="mt-auto flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src={avatar || "/placeholder.svg"} alt={author} fill className="object-cover" sizes="48px" />
          </div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>

        <div className="mt-4 flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
