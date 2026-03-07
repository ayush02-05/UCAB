import React from "react"
import { Link } from "react-router-dom"
import { CarFront, Mail, Lock } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { motion } from "motion/react"

export function DriverLogin() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-zinc-900 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-zinc-800 rounded-3xl shadow-2xl p-8 border border-zinc-700"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-yellow-400 p-3 rounded-2xl text-zinc-900 mb-4 shadow-lg shadow-yellow-400/20">
            <CarFront size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Driver Partner Login</h1>
          <p className="text-zinc-400 mt-2 text-center">Login to your driver account to accept rides</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/driver/dashboard'; }}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300">Email Address</label>
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500">
                <Mail size={18} />
              </div>
              <Input 
                type="email" 
                placeholder="driver@example.com" 
                className="pl-10 h-12 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-yellow-400" 
                required 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-300">Password</label>
              <Link to="#" className="text-sm text-yellow-400 hover:underline font-medium">Forgot Password?</Link>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500">
                <Lock size={18} />
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="pl-10 h-12 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-yellow-400" 
                required 
              />
            </div>
          </div>

          <Button type="submit" variant="secondary" className="w-full h-12 text-base font-semibold shadow-md mt-6">
            Login as Driver
          </Button>

          <p className="text-center text-sm text-zinc-400 mt-6 pt-4 border-t border-zinc-700">
            Want to drive with us? <Link to="/driver/signup" className="text-yellow-400 font-semibold hover:underline">Register as Driver</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
