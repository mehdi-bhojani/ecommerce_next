"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Heart } from 'lucide-react'

const fabricOptions = [
  "Sunbrella Performance Canvas",
  "Sunbrella Tranquil",
  "Sunbrella Sailcloth Rain",
  "Perennials Performance Basketweave",
]

const colorOptions = [
  { name: "White", value: "white", class: "bg-white" },
  { name: "Beige", value: "beige", class: "bg-[#E8E6E1]" },
  { name: "Gray", value: "gray", class: "bg-gray-400" },
  { name: "Navy", value: "navy", class: "bg-navy-600" },
]

export function ProductInfo() {
  const [selectedFabric, setSelectedFabric] = useState(fabricOptions[0])
  const [selectedColor, setSelectedColor] = useState(colorOptions[0])

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Calistoga Outdoor Cushions</h1>
        <p className="text-xl text-muted-foreground">$395 - $2,295</p>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">Select Fabric</h2>
          <RadioGroup
            defaultValue={selectedFabric}
            onValueChange={(value) => setSelectedFabric(value)}
            className="grid gap-2 mt-2"
          >
            {fabricOptions.map((fabric) => (
              <div key={fabric} className="flex items-center space-x-2">
                <RadioGroupItem value={fabric} id={fabric} />
                <Label htmlFor={fabric}>{fabric}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h2 className="text-lg font-medium">Select Color</h2>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color)}
                className={`h-12 w-12 rounded-full ${color.class} ${
                  selectedColor.value === color.value
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <Button className="w-full bg-red-600 hover:bg-red-700">
          ADD TO CART
        </Button>
        <Button variant="outline" className="w-full">
          REQUEST A FREE DESIGN APPOINTMENT
        </Button>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">ADD TO REGISTRY</Button>
          <Button variant="outline">
            <Heart className="mr-2 h-4 w-4" />
            ADD TO FAVORITES
          </Button>
        </div>
      </div>
    </div>
  )
}

