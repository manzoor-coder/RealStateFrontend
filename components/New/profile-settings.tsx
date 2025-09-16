"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Camera, Save, Eye, EyeOff, Bell, Shield, User, Settings, CheckCircle, AlertCircle } from "lucide-react"

export function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "Real Estate Pro",
    bio: "Experienced real estate professional with over 10 years in the industry, specializing in residential and commercial properties.",
    title: "Senior Real Estate Agent",
    license: "RE-12345678",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notifications, setNotifications] = useState({
    emailInquiries: true,
    emailViews: false,
    emailAnalytics: true,
    pushInquiries: true,
    pushViews: false,
    pushAnalytics: false,
    marketingEmails: false,
    weeklyReports: true,
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [saveStates, setSaveStates] = useState({
    profile: false,
    password: false,
    notifications: false,
  })

  const updateProfileData = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const updatePasswordData = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  const updateNotification = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handleProfileSave = async () => {
    setSaveStates((prev) => ({ ...prev, profile: true }))
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Profile saved:", profileData)
    setSaveStates((prev) => ({ ...prev, profile: false }))
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!")
      return
    }

    setSaveStates((prev) => ({ ...prev, password: true }))
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Password changed")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setSaveStates((prev) => ({ ...prev, password: false }))
  }

  const handleNotificationsSave = async () => {
    setSaveStates((prev) => ({ ...prev, notifications: true }))
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Notifications saved:", notifications)
    setSaveStates((prev) => ({ ...prev, notifications: false }))
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateProfileData("avatar", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "weak", color: "destructive" }
    if (password.length < 10) return { strength: "medium", color: "warning" }
    return { strength: "strong", color: "success" }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6 animate-fade-in">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold gradient-text-primary mb-2 text-shadow">Account Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your professional profile and account preferences</p>
      </div>

      <div className="grid gap-8 ">
        {/* Profile Information - Takes 2 columns */}
        <div className="space-y-6">
          <Card className="shadow-gradient hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Professional Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-transparent bg-gradient-primary p-1 shadow-lg">
                    <div className="h-full w-full rounded-full overflow-hidden bg-background">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                      <AvatarFallback className="text-lg font-semibold">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </div>
                  </Avatar>
                  <Badge
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 gradient-success text-gray-900 font-semibold border-0 shadow-gradient-teal"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer gradient-secondary text-gray-900 font-semibold border-0 hover-lift bg-transparent"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Update Photo
                    </Button>
                  </label>
                  <p className="text-sm text-muted-foreground mt-2">
                    Professional headshot recommended. JPG or PNG, max 2MB
                  </p>
                </div>
              </div>

              <Separator />

              {/* Personal & Professional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => updateProfileData("name", e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Professional Title
                  </Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => updateProfileData("title", e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => updateProfileData("company", e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license" className="text-sm font-medium">
                    License Number
                  </Label>
                  <Input
                    id="license"
                    value={profileData.license}
                    onChange={(e) => updateProfileData("license", e.target.value)}
                    className="h-11"
                  />
                </div>

                 <div className="flex gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => updateProfileData("email", e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => updateProfileData("phone", e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
              </div>

             

              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => updatePasswordData("currentPassword", e.target.value)}
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => updatePasswordData("newPassword", e.target.value)}
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {passwordData.newPassword && (
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`h-1 w-full rounded-full ${
                        getPasswordStrength(passwordData.newPassword).strength === "weak"
                          ? "bg-red-200"
                          : getPasswordStrength(passwordData.newPassword).strength === "medium"
                            ? "bg-yellow-200"
                            : "bg-green-200"
                      }`}
                    >
                      <div
                        className={`h-full rounded-full transition-all ${
                          getPasswordStrength(passwordData.newPassword).strength === "weak"
                            ? "w-1/3 gradient-warning"
                            : getPasswordStrength(passwordData.newPassword).strength === "medium"
                              ? "w-2/3 gradient-warning"
                              : "w-full gradient-success"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {getPasswordStrength(passwordData.newPassword).strength}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => updatePasswordData("confirmPassword", e.target.value)}
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <div className="flex items-center gap-1 text-red-600 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    Passwords do not match
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => updateProfileData("bio", e.target.value)}
                  placeholder="Share your professional background, expertise, and what makes you unique..."
                  className="min-h-[100px] resize-none"
                />
                <p className="text-xs text-muted-foreground">{profileData.bio.length}/500 characters</p>
              </div>
              

              <Button
                onClick={handleProfileSave}
                className="w-full h-11 gradient-primary text-white border-0 hover-lift shadow-gradient-blue"
                disabled={saveStates.profile}
              >
                {saveStates.profile ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving Profile...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
        </div>

      </div>
    </div>
  )
}
