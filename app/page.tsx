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

      {/* Hero Section */}
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
                  Right People. <br/>Right Projects.<br/> Right Now!
                </motion.p>
              </div>

              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed"
                >
                  Connect with talented professionals who share your vision and
                  complement your skills for your next big project.
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
                      className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-xs font-medium text-purple-800 inline-flex items-center"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </AnimatedButton>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  Learn More
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex items-center space-x-4 text-sm text-gray-500"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>
                  Join <b>2,000+</b> teams already formed
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
                <Image
                  src="/team-illustration.svg"
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

      {/* Features Section */}
      <section
        id="features"
        className="py-20 md:py-32 bg-white relative overflow-hidden"
        ref={featuresRef}
      >
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-50 to-white"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600"
            >
              Everything you need to build your perfect team
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Our platform provides all the tools you need to find, connect, and
              collaborate with the right people for your project.
            </motion.p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 md:py-32 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600"
              ref={ref}
            >
              How it works
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Finding your perfect team is just a few steps away
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-purple-400 to-pink-400 hidden md:block"></div>

            <div className="space-y-16 md:space-y-24 relative">
              {[
                {
                  number: "01",
                  title: "Create your project",
                  description:
                    "Define your project goals, requirements, and the skills you need from team members.",
                  image: "/create-project.svg",
                },
                {
                  number: "02",
                  title: "Find team members",
                  description:
                    "Browse profiles or let our matching algorithm suggest the perfect teammates for your project.",
                  image: "/find-members.svg",
                },
                {
                  number: "03",
                  title: "Collaborate and succeed",
                  description:
                    "Use our built-in tools to communicate, manage tasks, and bring your project to life.",
                  image: "/collaborate.svg",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`space-y-6 ${
                      index % 2 === 1 ? "md:text-right md:ml-auto" : ""
                    }`}
                  >
                    <div className="inline-flex items-center space-x-2">
                      <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                        {step.number}
                      </span>
                      <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="text-lg text-gray-600 max-w-md">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className={`relative ${
                      index % 2 === 1 ? "md:order-first" : ""
                    }`}
                  >
                    <div className="relative z-10 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
                      <Image
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        width={500}
                        height={300}
                        className="w-full h-auto relative z-10"
                      />
                    </div>

                    <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-2xl"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 md:py-32 bg-white relative overflow-hidden"
        ref={testimonialsRef}
      >
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-50 to-white"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600"
            >
              What our users say
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Thousands of teams have already found success with our platform
            </motion.p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 md:py-32 bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden"
        ref={ctaRef}
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to build your dream team?
            </h2>

            <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto">
              Join thousands of successful projects and find the perfect
              teammates today.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-6"
            >
              <Link href="/create-team">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Get Started Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  <span className="relative z-10">M</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg opacity-70 blur-sm"></div>
                </div>
                <span className="font-bold text-xl text-white">MakeMyTeam</span>
              </Link>

              <p className="text-gray-400">
                Find the perfect teammates for your next big project.
              </p>

              <div className="flex space-x-4 pt-2">
                {["twitter", "facebook", "instagram", "linkedin"].map(
                  (social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-xs">
                          {social[0].toUpperCase()}
                        </span>
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Testimonials", "FAQ"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-3">
                {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MakeMyTeam. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </DataProvider>
    </>
  );
}
