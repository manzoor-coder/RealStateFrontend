"use client"
import { DashboardLayout } from "@/components/New/dashboard-layout"
import { MessagesInbox } from "@/components/New/messages-inbox"

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <MessagesInbox />
    </DashboardLayout>
  )
}
