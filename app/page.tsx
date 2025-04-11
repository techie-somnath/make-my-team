"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { motion,useInView } from "framer-motion";
import { 
  ArrowRight,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// Ensure the correct path to the ParticleCanvas component
import { ParticleCanvas } from "../components/particle-canvas";
import AnimatedText from "@/components/animated-text";
import AnimatedButton from "@/components/animated-button";

export default function Home() {

  const router = useRouter();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const handleNavigation = () => {
    router.push('/home-page');
  }

  return (
    <div className="relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#002C3F] backdrop-blur-md border-b border-gray-100">
        <div className=" mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="MakeMyTeam Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </nav>

      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
        ref={heroRef}
      >
        <div className="absolute inset-0 pointer-events-none">
          <ParticleCanvas />
        </div>

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-12 text-center">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-800 inline-flex items-center"
                >
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Create your team in minutes
                </motion.div>
              </div>

              <AnimatedText
                text="Make My Team"
                className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900"
                handwriting={true}
              />

              <AnimatedText
                text="Find the perfect teammates for your next big project."
                className="max-w-2xl mx-auto text-xl text-gray-600"
                delay={0.5}
              />

              <AnimatedButton delay={1}>
                <Link href="/home-page">
                  <Button
                 
                    size="lg"
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-800 inline-flex items-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
