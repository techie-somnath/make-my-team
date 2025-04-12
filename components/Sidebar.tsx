"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

type HistoryItem = {
  id: string
  prompt: string
  timestamp: Date
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  history: HistoryItem[]
}

export default function Sidebar({ isOpen, onClose, history }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 768
      ) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Format timestamp to readable format
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10" onClick={onClose} />}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed md:relative z-20 w-64 h-full bg-white border-r transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <h2 className="font-semibold">History</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden md:block p-4 border-b">
            <h2 className="font-semibold">History</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {history.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>No history yet</p>
                <p className="text-sm mt-2">Your prompts will appear here</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {history.map((item) => (
                  <li key={item.id} className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium truncate">{item.prompt}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTime(item.timestamp)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
