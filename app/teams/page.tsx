"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { ChevronRight, History, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  type TeamMember,
  teamScenarios,
  storeTeamMembers,
  getTeamMembers,
  mockRoles,
  mockExperience,
  mockSkills,
  mockAvailability,
} from "@/lib/team-data"
import Navbar from "@/components/navbar"

export default function Teams() {
  const [requirement, setRequirement] = useState("")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get the requirement from localStorage
    const storedRequirement = localStorage.getItem("teamRequirement")
    if (storedRequirement) {
      setRequirement(storedRequirement)
    }

    // Check if we already have team members in localStorage
    const storedMembers = getTeamMembers()
    if (storedMembers.length > 0) {
      setTeamMembers(storedMembers)
      setLoading(false)
      return
    }

    // If not, fetch new team members
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://randomuser.me/api/?results=4&seed=makemyteam")
        const data = await response.json()

        // Map the random user data to our team member structure
        const members: TeamMember[] = data.results.map((user: any, index: number) => ({
          id: index + 1,
          name: `${user.name.first} ${user.name.last}`,
          role: mockRoles[index],
          experience: mockExperience[index],
          skills: mockSkills[index],
          availability: mockAvailability[index],
          image: user.picture.large,
        }))

        setTeamMembers(members)
        // Store in localStorage for persistence across pages
        storeTeamMembers(members)
      } catch (error) {
        console.error("Error fetching team members:", error)
        // Fallback to placeholder images if the API fails
        const fallbackMembers: TeamMember[] = [
          {
            id: 1,
            name: "Alex Johnson",
            role: mockRoles[0],
            experience: mockExperience[0],
            skills: mockSkills[0],
            availability: mockAvailability[0],
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 2,
            name: "Sam Williams",
            role: mockRoles[1],
            experience: mockExperience[1],
            skills: mockSkills[1],
            availability: mockAvailability[1],
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 3,
            name: "Jamie Smith",
            role: mockRoles[2],
            experience: mockExperience[2],
            skills: mockSkills[2],
            availability: mockAvailability[2],
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 4,
            name: "Taylor Brown",
            role: mockRoles[3],
            experience: mockExperience[3],
            skills: mockSkills[3],
            availability: mockAvailability[3],
            image: "/placeholder.svg?height=100&width=100",
          },
        ]
        setTeamMembers(fallbackMembers)
        storeTeamMembers(fallbackMembers)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4">
              <img src={member.image || "/placeholder.svg"} alt={member.name} />
            </Avatar>
            <div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">
                {member.role} • {member.experience}
              </p>
            </div>
          </div>
          <Link href={`/team-member/${member.id}`}>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="absolute top-4 right-4">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-app-heading">Recommended Teams</h1>
          <Link href="/history">
            <Button variant="outline" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="font-medium mb-2 text-app-heading">Your Requirement:</h2>
            <p>{requirement || "No requirement specified"}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="Balanced Team">
          <TabsList className="mb-6">
            {Object.keys(teamScenarios).map((scenario) => (
              <TabsTrigger
                key={scenario}
                value={scenario}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {scenario}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(teamScenarios).map(([scenario, memberIds]) => (
            <TabsContent key={scenario} value={scenario}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-app-heading">{scenario}</CardTitle>
                </CardHeader>
                <CardContent>
                  {memberIds.map((id) => {
                    const member = teamMembers.find((m) => m.id === id)
                    return member ? <TeamMemberCard key={id} member={member} /> : null
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  )
}
