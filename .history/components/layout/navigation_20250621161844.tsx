"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronUp, ChevronDown } from "lucide-react"

interface NavItem {
  name: string
  href: string
  subItems?: { name: string; href: string }[]
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Team",
    href: "/team",
    subItems: [
      { name: "Faculty", href: "/team/faculty" },
      { name: "Research Scholars", href: "/team/research-scholars" }
    ]
  },
  { name: "Facilities", href: "/facilities" },
  {
    name: "Research",
    href: "/research",
    subItems: [
      { name: "Journals", href: "/research/journals" },
      { name: "Conference", href: "/research/conference" },
      { name: "Book Chapter", href: "/research/book-chapter" },
      { name: "Events", href: "/research/events" }
    ]
  },
  { name: "Achievement and Awards", href: "/achievements" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
  { name: "Join Us", href: "/join-us" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Navigation Bar - Always white background with shadow */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/iit-palakkad-logo.png.jpg"
                alt="IIT Palakkad"
                width={200}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.subItems ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`transition-colors hover:bg-gray-50 hover:text-gray-900 font-medium flex items-center gap-1 ${
                          pathname.startsWith(item.href) ? "text-blue-600 font-semibold" : "text-gray-900"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 bg-white border border-gray-200 shadow-lg">
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild className="focus:bg-gray-50 hover:bg-gray-50 data-[highlighted]:bg-gray-50">
                          <Link
                            href={subItem.href}
                            className={`w-full px-3 py-2 transition-colors text-gray-900 hover:text-gray-900 ${
                              pathname === subItem.href ? "text-blue-600 font-semibold" : ""
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors hover:bg-gray-50 px-3 py-2 rounded font-medium ${
                      pathname === item.href ? "text-blue-600 font-semibold" : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-900 hover:bg-gray-100">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.subItems ? (
                        <div className="space-y-2">
                          <div className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                            {item.name}
                          </div>
                          <div className="pl-4 space-y-2">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block text-base transition-colors hover:text-blue-600 ${
                                  pathname === subItem.href ? "text-blue-600 font-semibold" : "text-gray-600"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-lg transition-colors hover:text-blue-600 ${
                            pathname === item.href ? "text-blue-600 font-semibold" : "text-gray-700"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </>
  )
}
