"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock history data
const mockHistoryData = [
  {
    id: 1,
    date: "2023-04-05",
    requirement: "I need a team of frontend developers having 1-3 years of experience",
    teamMembers: [
      { id: 1, name: "Alex Johnson", status: "Accepted" },
      { id: 3, name: "Jamie Smith", status: "Accepted" },
      { id: 2, name: "Sam Williams", status: "Rejected" },
    ],
  },
  {
    id: 2,
    date: "2023-03-20",
    requirement: "Looking for backend developers with Node.js experience",
    teamMembers: [
      { id: 5, name: "Jordan Lee", status: "Accepted" },
      { id: 6, name: "Casey Miller", status: "Accepted" },
    ],
  },
]

export default function History() {
  const [historyData] = useState(mockHistoryData)
  const router = useRouter()

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
    } catch (error) {
      return dateString
    }
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

        <h1 className="text-2xl font-bold text-app-heading mb-6">Team Formation History</h1>

        {historyData.length > 0 ? (
          historyData.map((history) => (
            <Card key={history.id} className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-app-heading">{formatDate(history.date)}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {history.date}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-medium mb-1 text-app-heading">Requirement:</h3>
                  <p>{history.requirement}</p>
                </div>

                <h3 className="font-medium mb-2 text-app-heading">Team Members:</h3>
                <div className="space-y-2">
                  {history.teamMembers.map((member) => (
                    <div key={member.id} className="flex justify-between items-center p-2 bg-secondary rounded">
                      <span>{member.name}</span>
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          member.status === "Accepted"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              <p>No history available yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
