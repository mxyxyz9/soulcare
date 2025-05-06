import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400">Soul Care</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              AI-powered mental health support that's accessible, private, and compassionate.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  AI Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/resources"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  Mental Health Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/crisis"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  Crisis Support
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-neutral-600 hover:text-teal-600 dark:text-neutral-400 dark:hover:text-teal-400"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          <p>
            Soul Care is not a replacement for professional mental health services. If you're in crisis, please contact
            emergency services or a mental health professional.
          </p>
          <p className="mt-4">© {new Date().getFullYear()} Soul Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
