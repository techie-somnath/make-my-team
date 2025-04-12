"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { type TeamMemberDetail } from "@/lib/team-data";
import { useEmployeeData } from "@/app/data-context";

export default function TeamMemberDetail({
  params,
}: {
  params: { id: string };
}) {
  const [member, setMember] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { employee,SetEmployees  } = useEmployeeData();
  console.log(employee);
  const getTeamMemberById = (id: any) => {
    const employees = [
      ...employee.currentTeam, // Spread currentTeam
      ...employee.specializedTeam, // Spread specializedTeam
    ];

    console.log(employees, "All employees data");

    // Find the team member by ID
    const teamMember = employees.find((member) => member.employeeId === id);

    // Return the found member or null if not found
    if (!teamMember) {
      console.warn(`No team member found with ID: ${id}`);
      return null;
    }

    return teamMember;
  };
  useEffect(() => {
    try {
      setLoading(true);
      const id = params.id;

      // Get the member from our stored data to ensure consistency
      const memberData = getTeamMemberById(id);

      if (memberData) {
        setMember(memberData);
      } else {
        console.error("Member not found");
      }
    } catch (error) {
      console.error("Error loading team member:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);


  function filterRejectedEmployees(employees:any): any {
    
    return {
      currentTeam: employees.currentTeam.filter(member => !member.isRejected),
      specializedTeam: employees.specializedTeam.filter(member => !member.isRejected),
    };
  }

  const handleReject = (id: string) => {
    // Update the isRejected field for the employee with the given ID
    const updatedEmployee = {
      currentTeam: employee.currentTeam.map((member) =>
        member.employeeId === id ? { ...member, isRejected: true } : member
      ),
      specializedTeam: employee.specializedTeam.map((member) =>
        member.employeeId === id ? { ...member, isRejected: true } : member
      ),
    };
  
    console.log("Updated Employee After Reject:", updatedEmployee);
  
    // Update the state/context with the modified employees
    SetEmployees(updatedEmployee);
  
    // Navigate to the home page
    router.push("/home-page");
  };
  
  const handleAccept = (id: string) => {
    // Update the isRejected field for the employee with the given ID
    const updatedEmployee = {
      currentTeam: employee.currentTeam.map((member) =>
        member.employeeId === id ? { ...member, isRejected: false } : member
      ),
      specializedTeam: employee.specializedTeam.map((member) =>
        member.employeeId === id ? { ...member, isRejected: false } : member
      ),
    };
  
    console.log("Updated Employee After Accept:", updatedEmployee);
  
    // Update the state/context with the modified employees
    SetEmployees(updatedEmployee);
  
    // Navigate to the home page
    router.push("/home-page");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Team member not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center"
          onClick={() => router.push("/home-page")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teams
        </Button>

        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                />
              </Avatar>
            </div>
            <CardTitle className="text-2xl text-app-heading">
              {member.name}
            </CardTitle>
            <div className="text-muted-foreground">
            Designation  {member.designation} 
            </div>
            <div className="text-muted-foreground">
             {member.yearsOfExperience} Years of Experience 
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
              <h3 className="font-medium mb-2 text-app-heading">
                Previous Projects
              </h3>
              <ul className="list-disc pl-5">
                {member.pastProjects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-app-heading">
                Availability
              </h3>
              <p>{member.availability}</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className="flex items-center text-destructive border-destructive/20 hover:bg-destructive/10"
              onClick={()=>handleReject(member.employeeId)}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>

            <Button
              className="flex items-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
              onClick={()=>handleAccept(member.employeeId)}
            >
              <Check className="mr-2 h-4 w-4" />
              Accept
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
