"use client"

import { useState, useEffect } from "react"
import { useSocket } from "@/contexts/SocketContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Users } from "lucide-react"

interface Student {
  _id: string
  name: string
  email: string
  feesPaid: boolean
}

export default function AllStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const socket = useSocket()

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on("feeStatusUpdated", (data: { userId: string; feesPaid: boolean }) => {
        setStudents((prev) =>
          prev.map((student) => (student._id === data.userId ? { ...student, feesPaid: data.feesPaid } : student)),
        )
      })

      return () => {
        socket.off("feeStatusUpdated")
      }
    }
  }, [socket])

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students")
      const data = await response.json()
      setStudents(data.students)
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">All Students</h2>
        <Badge variant="secondary">{students.length} students</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <Card key={student._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{student.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{student.email}</p>
              <div className="flex items-center space-x-2">
                {student.feesPaid ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Fees Paid
                    </Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <Badge variant="destructive" className="bg-red-100 text-red-800">
                      Fees Pending
                    </Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No students found</p>
        </div>
      )}
    </div>
  )
}
