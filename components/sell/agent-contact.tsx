import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Phone, Mail, MessageCircle, Award, Users, TrendingUp } from "lucide-react"

export function AgentContact() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-3 py-2">Work with Top Agents</h2>
          <p className="text-xl text-gray-600 text-pretty">
            Connect with experienced professionals who know your local market
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    SJ
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900">Sarah Johnson</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          approved
                        </span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">4.8 (127 clients)</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-1">License: RE-2024-001</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-blue-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="text-sm">sarah.johnson@realestate.com</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center text-red-600">
                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">New York, NY</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 text-lg font-bold">$</span>
                          <span className="text-green-700 text-sm font-medium">Balance</span>
                        </div>
                        <div className="text-green-800 text-xl font-bold">$15,750</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span className="text-blue-700 text-sm font-medium">Commission</span>
                        </div>
                        <div className="text-blue-800 text-xl font-bold">2.5%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Award className="h-5 w-5 text-purple-600" />
                          <span className="text-purple-700 text-sm font-medium">Projects</span>
                        </div>
                        <div className="text-purple-800 text-xl font-bold">45</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Users className="h-5 w-5 text-orange-600" />
                          <span className="text-orange-700 text-sm font-medium">Sales</span>
                        </div>
                        <div className="text-orange-800 text-xl font-bold">$2,850,000</div>
                      </div>
                    </div>

                    {/* <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Specializations</h4>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Luxury Homes</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Commercial</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">+1</span>
                      </div>
                    </div> */}

                    {/* <p className="text-gray-600 text-sm mb-4">
                      Experienced real estate agent specializing in luxury properties and commercial real estate. Over 8
                      years...
                    </p> */}

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 text-white gradient-primary cursor-pointer hover:bg-blue-600">
                        <Phone className="h-4 w-4 mr-2 text-white" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>

                    <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

           
          </div>

          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                Get in Touch
              </CardTitle>
              <CardDescription className="text-gray-600">
                Ready to sell? Let's discuss your goals and create a winning strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-gray-700">
                    First Name
                  </Label>
                  <Input id="first-name" placeholder="John" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-gray-700">
                    Last Name
                  </Label>
                  <Input id="last-name" placeholder="Doe" className="border-gray-300" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="john@example.com" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number
                </Label>
                <Input id="phone" placeholder="(555) 123-4567" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property-address" className="text-gray-700">
                  Property Address
                </Label>
                <Input id="property-address" placeholder="123 Main Street, City, State" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your selling timeline and any questions you have..."
                  rows={4}
                  className="border-gray-300"
                />
              </div>
              <Button className="w-full gradient-primary text-white cursor-pointer transition-all duration-300 ease-in-out" size="lg">
                Send Message
              </Button>
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
