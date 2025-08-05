"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Settings, Type, Volume2 } from "lucide-react"

export function AccessibilityControls() {
  const [fontSize, setFontSize] = useState(100)
  const [speechRate, setSpeechRate] = useState(1)
  const [highContrast, setHighContrast] = useState(false)

  // Apply font size to document root
  const updateFontSize = (value: number[]) => {
    const newSize = value[0]
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
  }

  // Apply speech rate
  const updateSpeechRate = (value: number[]) => {
    setSpeechRate(value[0])
    // This would be used by the speech synthesis in a real implementation
  }

  // Toggle high contrast
  const toggleHighContrast = (checked: boolean) => {
    setHighContrast(checked)
    if (checked) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Accessibility settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">Accessibility Settings</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Text Size</span>
              </div>
              <span className="text-sm">{fontSize}%</span>
            </div>
            <Slider value={[fontSize]} min={75} max={150} step={5} onValueChange={updateFontSize} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span>Speech Rate</span>
              </div>
              <span className="text-sm">{speechRate}x</span>
            </div>
            <Slider value={[speechRate]} min={0.5} max={2} step={0.1} onValueChange={updateSpeechRate} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>High Contrast</span>
            </div>
            <Switch checked={highContrast} onCheckedChange={toggleHighContrast} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
