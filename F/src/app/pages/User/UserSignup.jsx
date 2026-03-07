import React from "react"
import { Link } from "react-router-dom"
import { UserPlus, Mail, Lock, Phone, User } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { motion } from "motion/react"

export function UserSignup() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-zinc-50 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 border border-zinc-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-yellow-400 p-3 rounded-2xl text-zinc-900 mb-4 shadow-lg shadow-yellow-400/20">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">Create Account</h1>
          <p className="text-zinc-500 mt-2 text-center">Join UCab to book affordable rides instantly</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">First Name</label>
              <div className="relative">
                <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
                  <User size={18} />
                </div>
                <Input type="text" placeholder="John" className="pl-10 h-12" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">Last Name</label>
              <div className="relative">
                <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
                  <User size={18} />
                </div>
                <Input type="text" placeholder="Doe" className="pl-10 h-12" required />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700">Email Address</label>
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
                <Mail size={18} />
              </div>
              <Input type="email" placeholder="john@example.com" className="pl-10 h-12" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700">Phone Number</label>
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
                <Phone size={18} />
              </div>
              <Input type="tel" placeholder="+1 (555) 000-0000" className="pl-10 h-12" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">Password</label>
              <div className="relative">
                <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
                  <Lock size={18} />
                </div>
                <Input type="password" placeholder="••••••••" className="pl-10 h-12" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
                  <Lock size={18} />
                </div>
                <Input type="password" placeholder="••••••••" className="pl-10 h-12" required />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold shadow-md">
            Create Account
          </Button>

          <p className="text-center text-sm text-zinc-600 mt-6">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
