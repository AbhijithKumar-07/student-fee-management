"use client"

import { useAuth } from "@/contexts/AuthContext"
import Navigation from "@/components/Navigation"
import AllStudents from "@/components/AllStudents"
import Profile from "@/components/Profile"
import AuthForm from "@/components/AuthForm"
import { useState } from "react"

export default function Home() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("all-students")

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === "all-students" ? <AllStudents /> : <Profile />}
      </main>
    </div>
  )
}
