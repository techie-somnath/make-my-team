"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { getTeamMemberById, type TeamMemberDetail } from "@/lib/team-data"

export default function TeamMemberDetail({ params }: { params: { id: string } }) {
  const [member, setMember] = useState<TeamMemberDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    try {
      setLoading(true)
      const id = Number.parseInt(params.id)

      // Get the member from our stored data to ensure consistency
      const memberData = getTeamMemberById(id)

      if (memberData) {
        setMember(memberData)
      } else {
        console.error("Member not found")
      }
    } catch (error) {
      console.error("Error loading team member:", error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  const handleReject = () => {
    // In a real app, you would update state/context or make an API call
    const rejectedMembers = JSON.parse(localStorage.getItem("rejectedMembers") || "[]")
    if (member) {
      localStorage.setItem("rejectedMembers", JSON.stringify([...rejectedMembers, member.id]))
    }
    router.push("/teams")
  }

  const handleAccept = () => {
    // In a real app, you would update state/context or make an API call
    const acceptedMembers = JSON.parse(localStorage.getItem("acceptedMembers") || "[]")
    if (member) {
      localStorage.setItem("acceptedMembers", JSON.stringify([...acceptedMembers, member.id]))
    }
    router.push("/teams")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Team member not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 flex items-center" onClick={() => router.push("/teams")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teams
        </Button>

        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <img src={member.image || "/placeholder.svg"} alt={member.name} />
              </Avatar>
            </div>
            <CardTitle className="text-2xl text-app-heading">{member.name}</CardTitle>
            <div className="text-muted-foreground">
              {member.role} • {member.experience}
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-app-heading">Bio</h3>
              <p>{member.bio}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-app-heading">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-app-heading">Previous Projects</h3>
              <ul className="list-disc pl-5">
                {member.projects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-app-heading">Availability</h3>
              <p>{member.availability}</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className="flex items-center text-destructive border-destructive/20 hover:bg-destructive/10"
              onClick={handleReject}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>

            <Button
              className="flex items-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
              onClick={handleAccept}
            >
              <Check className="mr-2 h-4 w-4" />
              Accept
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
