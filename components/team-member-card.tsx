"use client"

import { DataProvider, useEmployeeData } from "@/app/data-context"
import { femaleImages, maleImages } from "@/lib/team-data"
import Link from "next/link"


type TeamMember = {
  employeeId: string
  name: string
  skills: string[]
  yearsOfExperience: number
  designation: string
  certifications: string[]
  pastProjects: string[]
  availability: string
}

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: any) {

const {employee} =   useEmployeeData();
console.log(employee,"this is the employee Data from member card");
  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Generate a consistent color based on employee ID
  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-teal-500",
    ]

    // Simple hash function to pick a color
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

//   console.log(member ,"data of member");

  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden text-gray-800 flex flex-col md:flex-row w-full max-w-md md:max-w-xl"
      style={{ cursor: "pointer" }}
    >
        <DataProvider>
      {/* Avatar/Profile Picture */}
      <Link href={`/team-member/${member.employeeId}`} className="flex flex-col md:flex-row w-full">
      <div className={`p-4 flex items-center justify-center`}>
  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
    <img
      src={member.image}
      alt={`Avatar`}
      className="w-full h-full object-cover rounded-full"
    />
  </div>
</div>

        {/* Member Details */}
        <div className="p-4 flex-1">
          <h3 className="font-bold text-lg">{member.name}</h3>

          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="font-semibold"></span> {member.designation}
            </p>
          
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
              {member.skills.length > 3 && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">+{member.skills.length - 3} more</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      </DataProvider>
    </div>
  )
}