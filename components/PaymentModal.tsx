"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useSocket } from "@/contexts/SocketContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Lock } from "lucide-react"
import toast from "react-hot-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { user, updateUser } = useAuth()
  const socket = useSocket()
  const [loading, setLoading] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    amount: "5000", // Fixed fee amount
  })

  const handlePayment = async () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName) {
      toast.error("Please fill in all payment details")
      return
    }

    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          paymentMethod: "card",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        updateUser({ ...user!, feesPaid: true })

        // Emit socket event for real-time update
        if (socket) {
          socket.emit("feeStatusUpdate", { userId: user!._id, feesPaid: true })
        }

        toast.success("Payment successful! Your fees have been paid.")
        onClose()
      } else {
        toast.error("Payment failed. Please try again.")
      }
    } catch (error) {
      toast.error("Payment processing error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Pay Fees</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Amount to Pay</p>
                <p className="text-2xl font-bold text-blue-600">₹5,000</p>
                <p className="text-xs text-gray-500">Annual Fee</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={paymentData.cardholderName}
                onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} disabled={loading} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={loading} className="flex-1">
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
