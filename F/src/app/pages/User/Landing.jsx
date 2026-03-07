import React from "react"
import { Link } from "react-router-dom"
import { MapPin, ArrowRight, Zap, ShieldCheck, Map, Smartphone, Car } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "../../components/ui/Button"

export function Landing() {
  return (
    <div className="flex flex-col bg-zinc-50">
      {/* Hero Section */}
      <section className="relative bg-zinc-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1730317195705-8a265a59ed1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwdmlldyUyMHRvcHxlbnwxfHx8fDE3NzI4NTcwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="City Map Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white space-y-6"
          >
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              Book Your Ride <span className="text-yellow-400">Instantly</span>
            </h1>
            <p className="text-xl text-zinc-300">
              Get an affordable, safe, and comfortable ride in minutes. Your city, covered.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl mt-8">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-blue-100 p-1.5 rounded-full z-10">
                    <MapPin size={18} className="text-blue-600" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter pickup location" 
                    className="w-full h-14 pl-12 pr-4 bg-white text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 border border-transparent shadow-sm"
                  />
                </div>
                <div className="relative">
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-yellow-100 p-1.5 rounded-full z-10">
                    <MapPin size={18} className="text-yellow-600" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter drop location" 
                    className="w-full h-14 pl-12 pr-4 bg-white text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-transparent shadow-sm"
                  />
                </div>
                <Link to="/dashboard" className="block w-full">
                  <Button className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg">
                    Find Cabs
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1560274764-23edb5769bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjB0YXhpJTIwbmV3JTIweW9yayUyMGNpdHl8ZW58MXx8fHwxNzcyODU3MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Yellow Taxi" 
              className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white/10"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Why choose UCab?</h2>
            <p className="text-zinc-600 text-lg">We provide the best cab booking experience with modern features designed for your safety and comfort.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Instant cab booking", desc: "Book a cab in less than 30 seconds and get matched instantly.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Map, title: "Real-time tracking", desc: "Track your ride live on the map from booking to destination.", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Smartphone, title: "Secure payments", desc: "Pay seamlessly with cards, UPI, or in-app wallets.", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: ShieldCheck, title: "Reliable drivers", desc: "All our drivers are background verified and highly rated.", color: "text-amber-600", bg: "bg-amber-50" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow group"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {React.createElement(feature.icon, { size: 28, className: feature.color })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-zinc-600 text-lg">Your quick and comfortable ride is just three simple steps away.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-200 via-yellow-200 to-blue-200 z-0"></div>

            {[
              { step: "1", title: "Enter pickup & drop", desc: "Open the app and enter your destination to get an estimated fare.", icon: MapPin },
              { step: "2", title: "Choose a cab", desc: "Select from a variety of cabs that suit your needs and budget.", icon: Car },
              { step: "3", title: "Ride and pay", desc: "Enjoy your ride and pay seamlessly using your preferred method.", icon: Zap },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-zinc-50 shadow-xl mb-6 relative">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm border-2 border-white shadow-sm">
                    {item.step}
                  </div>
                  {React.createElement(item.icon, { size: 36, className: "text-zinc-800" })}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Ready to start riding?</h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">Join thousands of users who trust UCab for their daily commute.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-zinc-100 border-none font-semibold shadow-lg text-lg">
                Create User Account
              </Button>
            </Link>
            <Link to="/driver/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/30 hover:bg-blue-700 font-semibold shadow-sm text-lg">
                Become a Driver <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
