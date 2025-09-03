import { Button } from "@/components/ui/button"
import { ArrowRight, Star, TrendingUp } from "lucide-react"

export function SellHero() {
  return (
    <section className="relative animated-gradient py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-white/80">Trusted by 50,000+ sellers</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white text-balance text-shadow-lg">
                Sell Your Home with <span className="gradient-text-blue">Confidence</span>
              </h1>
              <p className="text-xl text-white/90 text-pretty leading-relaxed">
                Get the best price for your property with our expert guidance, comprehensive market analysis, and proven
                selling strategies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 gradient-primary text-white shadow-gradient-blue transition-all duration-300 ease-in-out">
                Start Listing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Get Free Valuation
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-white/70">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15 Days</div>
                <div className="text-sm text-white/70">Avg. Sale Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$50K+</div>
                <div className="text-sm text-white/70">Avg. Premium</div>
              </div>
            </div>
          </div>
          <div className="relative animate-slide-in">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-gradient-blue">
              <img
                src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg"
                alt="Beautiful home for sale"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-gradient border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 gradient-teal rounded-full flex items-center justify-center shadow-gradient-teal">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Market Value Up</div>
                  <div className="text-sm text-muted-foreground">+12% this quarter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
