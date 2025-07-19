"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Users, User, LogOut } from "lucide-react"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-800">Student Fee Management</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("all-students")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === "all-students" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>All Students</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === "profile" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <Button variant="outline" size="sm" onClick={logout} className="flex items-center space-x-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
