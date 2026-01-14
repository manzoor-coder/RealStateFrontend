'use client';

import {DashboardLayout} from "@/components/New/dashboard-layout"
import { DashboardOverview } from "@/components/New/dashboard-overview"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
