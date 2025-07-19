import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { userId: string }
    const { amount, paymentMethod } = await request.json()

    await connectDB()

    // Simulate payment processing
    const paymentSuccess = Math.random() > 0.1 // 90% success rate

    if (!paymentSuccess) {
      return NextResponse.json({ message: "Payment failed" }, { status: 400 })
    }

    const user = await User.findByIdAndUpdate(decoded.userId, { feesPaid: true }, { new: true }).select("-password")

    return NextResponse.json({
      success: true,
      user,
      transactionId: `TXN${Date.now()}`,
    })
  } catch (error) {
    return NextResponse.json({ message: "Payment processing error" }, { status: 500 })
  }
}
