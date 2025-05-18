"use client"

import { Button } from "@/components/ui/button"
import { ButtonProps } from "@/components/ui/button"
import { ReactNode } from "react"

interface ClientButtonProps extends ButtonProps {
  href?: string
  children: ReactNode
}

export default function ClientButton({ href, children, ...props }: ClientButtonProps) {
  const handleClick = () => {
    if (href) {
      window.location.href = href
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}