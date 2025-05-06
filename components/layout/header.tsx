"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b border-neutral-200 bg-white py-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-teal-600 dark:text-teal-400">Soul Care</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="rounded-2xl">
              <Link href="/chat">Start Chat</Link>
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <NavLinks mobile />
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full rounded-2xl">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full rounded-2xl">
                <Link href="/chat">Start Chat</Link>
              </Button>
              <div className="mt-2 flex justify-center">
                <ModeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "py-2 text-neutral-700 hover:text-teal-600 dark:text-neutral-300 dark:hover:text-teal-400"
    : "text-neutral-700 hover:text-teal-600 dark:text-neutral-300 dark:hover:text-teal-400"

  return (
    <>
      <Link href="/about" className={linkClass}>
        About
      </Link>
      <Link href="/community" className={linkClass}>
        Community
      </Link>
      <Link href="/resources" className={linkClass}>
        Resources
      </Link>
    </>
  )
}
