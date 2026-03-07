import React from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Car, Menu, X, User } from "lucide-react"
import { Button } from "./ui/Button"

export function Layout() {
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()
  
  // Close menu on route change
  React.useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const isDashboard = location.pathname.includes("/dashboard") || location.pathname.includes("/track") || location.pathname.includes("/payment") || location.pathname.includes("/cabs") || location.pathname.includes("/history")

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Car size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">UCab</span>
          </Link>
          
          {!isDashboard ? (
            <>
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/" className="hover:text-blue-600 transition-colors">About</Link>
                <Link to="/" className="hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/" className="hover:text-blue-600 transition-colors">Contact</Link>
              </nav>

              <div className="hidden md:flex items-center gap-3">
                <Link to="/driver/login">
                  <Button variant="ghost">Driver Login</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">User Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button className="md:hidden p-2 text-zinc-600" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/history" className="hidden sm:block text-sm font-medium text-zinc-600 hover:text-blue-600">
                My Rides
              </Link>
              <div className="flex items-center gap-2 cursor-pointer p-1.5 rounded-full hover:bg-zinc-100">
                <div className="bg-zinc-200 p-2 rounded-full">
                  <User size={18} className="text-zinc-600" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        {isOpen && !isDashboard && (
          <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-4 shadow-lg">
            <nav className="flex flex-col gap-4 text-base font-medium text-zinc-600">
              <Link to="/">Home</Link>
              <Link to="/">About</Link>
              <Link to="/">Services</Link>
              <Link to="/">Contact</Link>
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-zinc-100">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full justify-center">User Login</Button>
              </Link>
              <Link to="/driver/login" className="w-full">
                <Button variant="ghost" className="w-full justify-center">Driver Login</Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full justify-center">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {!isDashboard && (
        <footer className="bg-zinc-900 text-zinc-400 py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 text-white">
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <Car size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight">UCab</span>
              </Link>
              <p className="text-sm">Book your ride instantly and travel safe across the city.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-medium">Download App</h3>
              <div className="flex gap-2">
                <div className="bg-zinc-800 rounded px-3 py-2 cursor-pointer hover:bg-zinc-700 transition-colors">
                  <span className="text-xs block">Get it on</span>
                  <span className="text-sm font-semibold text-white">Google Play</span>
                </div>
                <div className="bg-zinc-800 rounded px-3 py-2 cursor-pointer hover:bg-zinc-700 transition-colors">
                  <span className="text-xs block">Download on</span>
                  <span className="text-sm font-semibold text-white">App Store</span>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-800 text-sm text-center">
            &copy; {new Date().getFullYear()} UCab. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  )
}
