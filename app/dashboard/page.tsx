"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"
// import withAuth from "@/utils/withAuth"

function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}

export default DashboardPage
