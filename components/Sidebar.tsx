"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";

type HistoryItem = {
  id: string;
  prompt: string;
  timestamp: Date;
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
}

const testData = [
  {
    id: 1,
    prompt: "What is the capital of France?",
    timestamp: "2025-04-12T08:00:00Z",
  },
  {
    id: 2,
    prompt: "Explain the theory of relativity.",
    timestamp: "2025-04-12T08:30:00Z",
  },
  {
    id: 3,
    prompt: "How do I create a React component?",
    timestamp: "2025-04-12T09:00:00Z",
  },
  {
    id: 4,
    prompt: "What are JavaScript closures?",
    timestamp: "2025-04-12T09:15:00Z",
  },
  {
    id: 5,
    prompt: "How does the blockchain work?",
    timestamp: "2025-04-12T09:30:00Z",
  },
];

export default function Sidebar({ isOpen, onClose, history }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 768
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Format timestamp to readable format
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed md:relative z-20 w-64 h-full bg-white border-r transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
             
        `}
        style={{ width: "25rem" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <h2 className="font-semibold">History</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden md:block p-4 border-b">
            <h2 className="font-semibold">History</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-3">
              <Link href="/history1">
                <li className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer m-4">
                  <p className="text-sm font-medium truncate">
                    Build a team consist of Consultant 1...
                  </p>
                </li>
              </Link>

              <Link href="/history2">
                <li className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer m-4">
                  <p className="text-sm font-medium truncate">
                    Give me a team of Managers having knowledge of Azure and
                    dot Net{" "}
                  </p>
                </li>
              </Link>

              <Link href="/history3">
                <li className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer m-4">
                  <p className="text-sm font-medium truncate">
                    Give me a team of Associate 1 having knowledge of SalesForce
                    and Consultant 1 for testing of a SalesForce Project{" "}
                  </p>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
