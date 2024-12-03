import Link from "next/link"
import { ChevronRight } from 'lucide-react'

export function Breadcrumb() {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground py-4 px-6">
      <Link href="/" className="hover:text-primary">
        Outdoor
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/outdoor-cushions" className="hover:text-primary">
        Outdoor Cushions & Covers
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground">Calistoga Outdoor Cushions</span>
    </nav>
  )
}

