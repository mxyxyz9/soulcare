import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-foreground">Soul Care</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your private companion for mental and emotional wellbeing.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/chat">AI Chat</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/resources">Mental Health Guides</FooterLink>
              <FooterLink href="/crisis">Crisis Support</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/accessibility">Accessibility</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-4">
              Soul Care is intended for informational and emotional support purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            <p>© {new Date().getFullYear()} Soul Care. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-muted-foreground transition-colors hover:text-foreground">
        {children}
      </Link>
    </li>
  )
}
