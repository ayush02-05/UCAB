import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Navigation,
} from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "../../components/Footer";

export function LandingPage() {
  const features = [
    {
      title: "Quick Booking",
      description:
        "Book a ride in seconds. Enter your destination and get an estimate instantly.",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Safe & Secure",
      description:
        "All our drivers are background checked and vehicles are regularly inspected.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Cashless Payments",
      description:
        "Pay securely with your preferred method - credit card, wallet, or net banking.",
      icon: <CreditCard className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Real-time Tracking",
      description:
        "Track your cab in real-time on the map as it approaches your pickup location.",
      icon: <MapPin className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1741021800716-445a352792d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXIlMjBjaXR5JTIwc3RyZWV0fGVufDF8fHx8MTc3Mjg1NzQ2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern Cab in City"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              Get anywhere,
              <br />
              <span className="text-blue-500">faster.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 mb-10"
            >
              Request a ride, hop in, and go. UCab is the smartest way to get
              around the city.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link
                to="/login"
                className="bg-white text-black hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-center text-lg transition-colors"
              >
                Book a Ride
              </Link>
              <Link
                to="/captain-login"
                className="bg-black border border-white text-white hover:bg-gray-900 font-bold py-4 px-8 rounded-full text-center text-lg transition-colors"
              >
                Become a Driver
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why choose UCab?
            </h2>
            <p className="text-lg text-gray-600">
              We're more than just an app. We're your daily travel companion,
              dedicated to providing the best riding experience in the city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to roll?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Sign up in seconds and get moving.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Create an Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
