"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Check, X, User, Briefcase, Calendar, Award, Clock, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEmployeeData } from "@/app/data-context"
import { motion } from "framer-motion"

export default function TeamMemberDetail({
  params,
}: {
  params: { id: string }
}) {
  const [member, setMember] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { employee, SetEmployees } = useEmployeeData()
  const [activeTab, setActiveTab] = useState("profile")

  const getTeamMemberById = (id: any) => {
    const employees = [...employee.currentTeam, ...employee.specializedTeam]

    const teamMember = employees.find((member) => member.employeeId === id)

    if (!teamMember) {
      console.warn(`No team member found with ID: ${id}`)
      return null
    }

    return teamMember
  }

  useEffect(() => {
    try {
      setLoading(true)
      const id = params.id
      const memberData = getTeamMemberById(id)

      if (memberData) {
        setMember(memberData)
      } else {
        console.error("Member not found")
      }
    } catch (error) {
      console.error("Error loading team member:", error)
    } finally {
      setTimeout(() => setLoading(false), 800) // Add slight delay for smoother transition
    }
  }, [params.id])

  const handleReject = (id: string) => {
    const updatedEmployee = {
      currentTeam: employee.currentTeam.map((member) =>
        member.employeeId === id ? { ...member, isRejected: true } : member,
      ),
      specializedTeam: employee.specializedTeam.map((member) =>
        member.employeeId === id ? { ...member, isRejected: true } : member,
      ),
    }

    SetEmployees(updatedEmployee)
    router.push("/home-page")
  }

  const handleAccept = (id: string) => {
    const updatedEmployee = {
      currentTeam: employee.currentTeam.map((member) =>
        member.employeeId === id ? { ...member, isRejected: false } : member,
      ),
      specializedTeam: employee.specializedTeam.map((member) =>
        member.employeeId === id ? { ...member, isRejected: false } : member,
      ),
    }

    SetEmployees(updatedEmployee)
    router.push("/home-page")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-300 animate-pulse">Loading team member profile...</p>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-red-500 text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Team Member Not Found</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">We couldn't find the team member you're looking for.</p>
        <Button onClick={() => router.push("/home-page")} className="transition-all duration-300 hover:scale-105">
          Return to Team
        </Button>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const getExperienceLevelText = (years: number) => {
    if (years < 2) return "Junior level with promising talent"
    if (years < 5) return "Mid-level with solid expertise"
    if (years < 8) return "Senior level with extensive knowledge"
    return "Expert level with industry-leading experience"
  }

  const getSkillLevel = (skill: string) => {
    // This would ideally come from your data, but for demo purposes:
    const levels: Record<string, number> = {
      React: 90,
      JavaScript: 85,
      TypeScript: 80,
      "Node.js": 75,
      "HTML/CSS": 95,
      "UI/UX": 85,
      Python: 70,
      Java: 65,
      "C#": 60,
      SQL: 80,
      MongoDB: 75,
      AWS: 70,
      Docker: 65,
      Kubernetes: 60,
      Git: 90,
      Agile: 85,
      Scrum: 80,
      "Project Management": 75,
    }

    return levels[skill] || Math.floor(Math.random() * 30) + 70 // Fallback to random 70-100%
  }

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <Button
            variant="ghost"
            className="mb-6 flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 transform hover:scale-105"
            onClick={() => router.push("/home-page")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <Card className="shadow-xl rounded-xl overflow-hidden border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="relative h-48 bg-[#002C3A] flex justify-center items-center">
              <motion.div
                className="absolute -bottom-16 flex justify-center items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Avatar className="h-32 w-32 ring-4 ring-white dark:ring-slate-700 shadow-lg">
                  <img
                    src={"/" + member.image}
                    alt={member.name}
                    className="rounded-full object-cover"
                  />
                </Avatar>
              </motion.div>
            </div>

            <CardHeader className="pt-20 text-center">
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold text-slate-800 dark:text-white">{member.name}</CardTitle>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-2">
                <Badge className="px-3 py-1 text-sm bg-[#FFB81C] text-[#28519E] dark:bg-emerald-800 dark:text-emerald-100">
                  {member.designation}
                </Badge>
                <div className="flex items-center text-amber-500 dark:text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {getExperienceLevelText(member.yearsOfExperience)}
                </p>
              </motion.div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-[#FFB81C] data-[state=active]:text-[#002C3A] dark:data-[state=active]:bg-emerald-800 dark:data-[state=active]:text-emerald-100"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="data-[state=active]:bg-[#FFB81C] data-[state=active]:text-[#002C3A] dark:data-[state=active]:bg-emerald-800 dark:data-[state=active]:text-emerald-100"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-[#FFB81C] data-[state=active]:text-[#002C3A] dark:data-[state=active]:bg-emerald-800 dark:data-[state=active]:text-emerald-100"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="availability"
                    className="data-[state=active]:bg-[#FFB81C] data-[state=active]:text-[#002C3A] dark:data-[state=active]:bg-emerald-800 dark:data-[state=active]:text-emerald-100"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Availability
                  </TabsTrigger>
                </TabsList>

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[300px]"
                >
                  <TabsContent value="profile" className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                          <User className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                          Professional Summary
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {member.bio ||
                            "A dedicated professional with a passion for delivering exceptional results. Known for strong problem-solving abilities and collaborative approach to work."}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                          Experience
                        </h3>
                        <div className="flex items-center">
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div
                              className="bg-[#002C3A] dark:bg-emerald-500 h-2.5 rounded-full"
                              style={{ width: `${Math.min(member.yearsOfExperience * 10, 100)}%` }}
                            ></div>
                          </div>
                          <span className="ml-3 text-slate-700 dark:text-slate-300 font-medium">
                            {member.yearsOfExperience} years
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                        Technical Expertise
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {member.skills.map((skill: string, index: number) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-700 dark:text-slate-300 font-medium">{skill}</span>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {getSkillLevel(skill)}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <motion.div
                                className="bg-[#002C3A] dark:bg-emerald-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${getSkillLevel(skill)}%` }}
                                transition={{ duration: 1, delay: 0.1 * index }}
                              ></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="projects" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                        Previous Projects
                      </h3>
                      <div className="space-y-4">
                        {member.pastProjects.map((project: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <h4 className="font-medium text-slate-800 dark:text-white mb-1">{project}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              Successfully delivered this project with attention to detail and commitment to quality.
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="availability" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                        Availability Status
                      </h3>
                      <div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-800 mb-4">
                          <Clock className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Current Status</h4>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">{member.availability}</p>
                        <Badge className="px-3 py-1 bg-emerald-100 text-[#28519E] dark:bg-emerald-800 dark:text-emerald-100">
                          {member.availability.includes("Available") ? "Ready to Join" : "Limited Availability"}
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                </motion.div>
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-between pt-6 pb-8 px-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="flex items-center border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300 dark:hover:border-red-700 px-6"
                  onClick={() => handleReject(member.employeeId)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Decline Suggestion
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="flex items-center bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white px-6"
                  onClick={() => handleAccept(member.employeeId)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve 
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.main>
  )
}