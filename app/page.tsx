"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Users,
  Briefcase,
  MessageSquare,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleCanvas } from "@/components/particle-canvas";
import AnimatedButton from "@/components/animated-button";
import { DataProvider } from "./data-context";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.2,
  });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <>
      <DataProvider>
        <div className="relative overflow-hidden">
          {/* Navbar */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  alt="MakeMyTeam Logo"
                  className="h-10 w-auto"
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

            <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-purple-50 via-white to-white -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                      Find your dream team in minutes
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={heroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="text-xl md:text-5xl text-gray-600 font-bold font-roboto leading-[10]"
                    >
                      Right People. <br />
                      Right Projects.
                      <br /> Right Now!
                    </motion.p>
                  </div>

                  <div className="space-y-4">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={heroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed"
                    >
                      Connect with talented professionals who share your vision
                      and complement your skills for your next big project.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <AnimatedButton delay={1}>
                      <Link href="/home-page">
                        <Button
                          //onClick={handleNavigation}
                          size="lg"
                          className="px-8 py-2 bg-[#FFB81C] text-[#0023CA] inline-flex items-center"
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </AnimatedButton>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={heroInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex items-center space-x-4 text-sm text-gray-500"
                  >
                    <div className="flex -space-x-2">
                      {[
                        "/image1.png",
                        "/image2.png",
                        "/image3.png",
                        "/image4.png",
                      ].map((src, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center overflow-hidden"
                        >
                          <img
                            src={src}
                            alt={`Avatar ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span>
                       <b>2,000+</b> Project teams already formed
                    </span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                  className="relative"
                >
                  <div className="relative">
                    <div className="absolute"></div>
                    <Image
                      src="/landing-image.png"
                      alt="Team collaboration"
                      width={600}
                      height={500}
                      className="w-full h-auto relative z-10"
                    />
                  </div>

                  <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </DataProvider>
    </>
  );
}
