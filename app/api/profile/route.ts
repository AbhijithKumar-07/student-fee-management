import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { userId: string }
    const { name, email } = await request.json()

    await connectDB()
    const user = await User.findByIdAndUpdate(decoded.userId, { name, email }, { new: true }).select("-password")

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
