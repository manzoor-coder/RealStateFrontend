import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaUsers, FaHome, FaDollarSign, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa"

export function MarketInsights() {

   const stats = [
      {
        title: "Total Users",
        value: `243`,
        change: "+12%",
        trend: "up",
        icon: FaUsers,
        gradient: "gradient-primary",
      },
      {
        title: "Properties",
        value: `1028`,
        change: "+8%",
        trend: "up",
        icon: FaHome,
        gradient: "gradient-secondary",
      },
      {
        title: "Revenue",
        value: "$2.4M",
        change: "+15%",
        trend: "up",
        icon: FaDollarSign,
        gradient: "gradient-success",
      },
      {
        title: "Growth",
        value: "+12%",
        change: "-2%",
        trend: "down",
        icon: FaChartLine,
        gradient: "gradient-warning",
      },
    ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-3 py-2">Market Insights</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Stay informed with the latest market trends and data
          </p>
        </div>

        <div className="py-8">
         {/* Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {stats.map((stat, index) => (
                   <Card key={index} className={`${stat.gradient} transition-transform duration-300 ease-in-out text-white overflow-hidden relative`}>
                     <CardContent className="p-6">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="text-white/80 text-sm">{stat.title}</p>
                           <p className="text-3xl font-bold">{stat.value}</p>
                           <div className="flex items-center mt-2">
                             {stat.trend === "up" ? (
                               <FaArrowUp className="text-white/80 mr-1" />
                             ) : (
                               <FaArrowDown className="text-white/80 mr-1" />
                             )}
                             <span className="text-white/80 text-sm">{stat.change}</span>
                           </div>
                         </div>
                         <stat.icon className="text-4xl text-white/60" />
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>Key insights for sellers in your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-chart-1 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Seller's Market</h4>
                  <p className="text-sm text-muted-foreground">
                    Low inventory and high demand are driving prices up 12% year-over-year
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-chart-2 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Fast Sales</h4>
                  <p className="text-sm text-muted-foreground">
                    Well-priced homes are selling 40% faster than the national average
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-chart-3 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Premium Pricing</h4>
                  <p className="text-sm text-muted-foreground">
                    Homes with professional staging sell for an average of $50,000 more
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selling Tips</CardTitle>
              <CardDescription>Maximize your home's value and appeal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Professional Photography</h4>
                  <p className="text-sm text-muted-foreground">
                    High-quality photos can increase online views by up to 118%
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Strategic Pricing</h4>
                  <p className="text-sm text-muted-foreground">
                    Price competitively from the start to generate multiple offers
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Home Staging</h4>
                  <p className="text-sm text-muted-foreground">Staged homes sell 73% faster than non-staged homes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
