"use client"
import { DashboardLayout } from "@/components/New/dashboard-layout"
import { ProfileSettings } from "@/components/New/profile-settings"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <ProfileSettings />
    </DashboardLayout>
  )
}
