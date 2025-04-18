// Team member interfaces
export interface TeamMember {
  id: number
  name: string
  role: string
  experience: string
  skills: string[]
  availability: string
  image: string
}

export interface TeamMemberDetail extends TeamMember {
  bio: string
  projects: string[]
}

// Mock data for skills, roles, etc.
export const mockSkills = [
  ["React", "TypeScript", "Tailwind CSS"],
  ["Vue.js", "JavaScript", "SCSS"],
  ["React", "JavaScript", "Bootstrap"],
  ["Angular", "TypeScript", "Material UI"],
]

export const mockRoles = ["Frontend Developer", "UI/UX Developer", "Frontend Engineer", "Web Developer"]
export const mockExperience = ["2 years", "3 years", "1.5 years", "2.5 years"]
export const mockAvailability = ["Immediate", "2 weeks", "Immediate", "1 week"]
export const mockBios = [
  "Passionate frontend developer with experience in building responsive web applications. Strong focus on user experience and clean code.",
  "Frontend specialist with a background in design. Creates beautiful and functional user interfaces with attention to detail.",
  "Junior developer with a strong learning curve. Specializes in React and is currently expanding knowledge in state management.",
  "Angular expert with experience in enterprise applications. Strong TypeScript skills and focus on scalable architecture.",
]
export const mockProjects = [
  ["E-commerce Platform", "Dashboard UI Redesign"],
  ["Social Media App", "CRM System"],
  ["Portfolio Website", "Internal Tool UI"],
  ["Healthcare Dashboard", "Analytics Platform"],
]

// Team scenarios
export const teamScenarios = {
  "Balanced Team": [1, 2, 3],
  "Specialized Team": [1, 3, 4],
}

// Function to store team members in localStorage
export const storeTeamMembers = (members: TeamMember[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("teamMembers", JSON.stringify(members))
  }
}

// Function to retrieve team members from localStorage
export const getTeamMembers = (): TeamMember[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("teamMembers")
    if (stored) {
      return JSON.parse(stored)
    }
  }
  return []
}

// Function to get a specific team member by ID
export const getTeamMemberById = (id: number): TeamMemberDetail | null => {
  const members = getTeamMembers()
  const member = members.find((m) => m.id === id)

  if (!member) return null

  // Find the index to get the corresponding bio and projects
  const index = (id - 1) % 4

  return {
    ...member,
    bio: mockBios[index],
    projects: mockProjects[index],
  }
}


export const maleImages = [
  { src: "Rectangle (1).png", isUsed: false },
  { src: "Rectangle (2).png", isUsed: false },
  { src: "Rectangle (3).png", isUsed: false },
  { src: "Rectangle (4).png", isUsed: false },
  { src: "Rectangle (5).png", isUsed: false },
  { src: "Rectangle (6).png", isUsed: false },
  { src: "Rectangle (7).png", isUsed: false },
  { src: "Rectangle (8).png", isUsed: false },
  { src: "Rectangle (9).png", isUsed: false },
  { src: "Rectangle (10).png", isUsed: false },
  { src: "Rectangle (11).png", isUsed: false },
  { src: "Rectangle (12).png", isUsed: false },
  { src: "Rectangle (13).png", isUsed: false },
  { src: "Rectangle (14).png", isUsed: false },
  { src: "Rectangle (15).png", isUsed: false },
];

export const femaleImages = [
  { src: "Rectangle (16).png", isUsed: false },
  { src: "Rectangle (17).png", isUsed: false },
  { src: "Rectangle (18).png", isUsed: false },
  { src: "Rectangle (19).png", isUsed: false },
  { src: "Rectangle (20).png", isUsed: false },
  { src: "Rectangle (21).png", isUsed: false },
  { src: "Rectangle (22).png", isUsed: false },
  { src: "Rectangle (23).png", isUsed: false },
  { src: "Rectangle (24).png", isUsed: false },
  { src: "Rectangle (25).png", isUsed: false },
  { src: "Rectangle (26).png", isUsed: false },
  { src: "Rectangle (27).png", isUsed: false },
];