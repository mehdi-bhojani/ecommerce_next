"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsDown, ThumbsUp } from 'lucide-react'

export function QASection() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Questions</h2>
      <div className="space-y-2">
        <Input
          type="search"
          placeholder="Start typing your question"
          className="max-w-md"
        />
        <p className="text-sm text-muted-foreground">
          Start typing your question and we&apos;ll check if it was already asked and answered.
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-6">
          <div className="flex justify-between">
            <h3 className="font-medium">Do the cushion covers zip on and off?</h3>
            <span className="text-sm text-muted-foreground">7 months ago</span>
          </div>
          <p className="mt-2">
            These cushions do feature a cover that have a zipper closure. However, the covers are not
            machine washable. We only suggest spot cleaning with mild soap and warm water, letting them
            air dry after.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Helpful?</span>
            <Button variant="outline" size="icon">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

