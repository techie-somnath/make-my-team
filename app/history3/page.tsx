"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import Link from "next/link";


export default function HistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex min-h-screen bg-white">

<nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-30 ">
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


      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        history={history}
      />

      {/* Main content */}
      <div className="flex-1 p-6 mt-24">
      

        {/* Requirements box */}
        <div className="bg-gray-50 p-4 rounded-md mb-8">
          <div className="text-sm">
            <p>
            <b>Query :</b>
              Give me a team of Associate 1 having knowledge of SalesForce and
              Consultant 1 for testing of a SalesForce Project
            </p>
            <p className="text-gray-500 text-xs mt-2">02:40 PM</p>
          </div>
        </div>

        {/* Current Team */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Balanced Team</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Team Member 1 */}
            <div className="flex gap-4">
              <Image
                src="/Rectangle (11).png"
                alt="Alice Johnson"
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="font-medium">Alice Johnson</h3>
                <p className="text-sm text-gray-600 mb-2">Associate 2</p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    SalesForce
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                   LWC
                  </Badge>
                 
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Image
                src="/Rectangle (10).png"
                alt="Alice Johnson"
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="font-medium">Alice Johnson</h3>
                <p className="text-sm text-gray-600 mb-2">Consultant 1</p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    Javascript
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                   Salesforces
                  </Badge>
                 
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Team */}
        <div>
          <h2 className="text-lg font-medium mb-4">Specialized Team</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Team Member 3 */}
            <div className="flex gap-4">
              <Image
                src="/Rectangle (27).png"
                alt="Sophia Williams"
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="font-medium">Sophia Williams</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Associate 1
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    Salesforce
                  </Badge>
                
                </div>
              </div>
            </div>



            <div className="flex gap-4">
              <Image
                src="/Rectangle (21).png"
                alt="Sophia Williams"
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="font-medium">Sophia Williams</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Consultant 1
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    Salesforce
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                   Salesforce Agent
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                  LWC
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
