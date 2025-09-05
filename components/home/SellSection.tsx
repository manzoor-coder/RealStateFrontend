import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SellSection() {
  return (
    <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Teal gradient background */}
      <div className="absolute inset-0 gradient-indigo" />

      {/* City skyline background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/beautiful-modern-houses-neighborhood-aerial-view (1).png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-balance">
          Sell/Rent? - Post Property - Free
        </h1>

        <Link href="/sell-rent">
          <Button
            size="lg"
            className="gradient-warning text-white font-semibold px-8 py-3 text-lg shadow-lg"
          >
            Add New Property
          </Button>
        </Link>
      </div>
    </section>
  );
}
