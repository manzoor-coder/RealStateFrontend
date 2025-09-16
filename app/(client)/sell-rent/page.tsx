import { SellHero } from "@/components/sell/sell-hero"
import { PropertyListingForm } from "@/components/sell/property-listing-form"
import { MarketInsights } from "@/components/sell/market-insights"
import { AgentContact } from "@/components/sell/agent-contact"
// import { SellNavigation } from "@/components/sell/sell-navigation"
// import { SellFooter } from "@/components/sell-footer"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <SellHero />
        <PropertyListingForm />
        <MarketInsights />
        <AgentContact />
      </main>
      {/* <SellFooter /> */}
    </div>
  )
}
