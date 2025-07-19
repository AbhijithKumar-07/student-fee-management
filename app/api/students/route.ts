export const dynamic = "force-dynamic";  

// Forces dynamic behavior (no caching)
// Do not cache this route's result. Always re-run the code when it's called.

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    await connectDB()
    const students = await User.find({}).select("-password")
    console.log("Fetched students:", students)

    return NextResponse.json({ students })
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

