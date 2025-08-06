"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, User, LogOut, Settings, BarChart3, Heart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">Soul Care</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <NavLinks />
          <div className="flex items-center space-x-3">
            <ModeToggle />
            {isAuthenticated ? (
              <UserMenu user={session.user} />
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/chat">Start Chat</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-3">
              <NavLinks mobile />
              <div className="border-t border-border/40 pt-4">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <MobileUserMenuItem href="/dashboard" icon={<BarChart3 />}>Dashboard</MobileUserMenuItem>
                    <MobileUserMenuItem href="/profile" icon={<User />}>Profile</MobileUserMenuItem>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => signOut()}>
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button asChild variant="ghost" size="sm" className="justify-start">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/chat">Start Chat</Link>
                    </Button>
                  </div>
                )}
                <div className="mt-4 flex justify-center">
                  <ModeToggle />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "block py-2 text-base font-medium text-muted-foreground hover:text-foreground"
    : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"

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

function UserMenu({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          {user?.image ? (
            <img
              src={user.image || "/placeholder-user.jpg"}
              alt={user.name || "User avatar"}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center justify-start gap-3 p-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <img
              src={user.image || "/placeholder-user.jpg"}
              alt={user.name || "User avatar"}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-semibold">{user.name}</p>}
            {user?.email && <p className="w-[180px] truncate text-sm text-muted-foreground">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileUserMenuItem({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center rounded-md p-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
      <div className="mr-3 h-5 w-5">{icon}</div>
      {children}
    </Link>
  )
}
