"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FiBell,
  FiSearch,
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiHome,
  FiUsers,
  FiUserCheck,
  FiMail,
  FiSmartphone,
  FiMonitor,
  FiCalendar,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"
import notificationsData from "@/json/admin-notifications.json"
import EditNotificationModal from "@/components/modals/NotificationEditModal"
import { toast } from "react-toastify"
import { NotificationApi } from "@/lib/api/notification"
import { RoleEnum } from "@/types/auth"
import { AppNotification } from "@/types"

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [editingNotification, setEditingNotification] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [AllNotifications, setAllNotifications] = useState<AppNotification[]>([])
  const [propertyNotifications, setPropertyNotifications] = useState<AppNotification[]>([])
  const [userNotifications, setUserNotifications] = useState<AppNotification[]>([])
  const [dealNotifications, setDealNotifications] = useState<AppNotification[]>([])

  useEffect(() => {
    const username = localStorage.getItem("user")
    console.log('All Data of user: ' + username)
    GetAllNotifcations()
  }, [])

  const GetAllNotifcations = async () => {
    try {
      const res: AppNotification[] = await NotificationApi.getAllNotifications()
      console.log("Notification Response Data", res)

      // Log any notifications with invalid purpose
      res.forEach((notification, index) => {
        if (!notification.purpose || typeof notification.purpose !== 'string') {
          console.warn(`Invalid purpose at index ${index}:`, notification)
        }
      })

      // Set all notifications
      setAllNotifications(res)
      setUserNotifications(res.filter((n) => n.relatedModel === "User"))
      setPropertyNotifications(res.filter((n) => n.relatedModel === "Property"))
      setDealNotifications(res.filter((n) => n.relatedModel === "Transaction"))
    } catch (error) {
      toast.error("Failed to fetch notifications")
    }
  }

  const getPurposeStyles = (purpose: string | undefined) => {
    if (!purpose || typeof purpose !== 'string') {
      return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200"
    }
    switch (purpose) {
      case "PROPERTY_CREATED":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
      case "PROPERTY_LISTED":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200"
      case "PROPERTY_SOLD":
        return "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200"
      case "AGENT_APPROVED":
        return "bg-gradient-to-r from-green-100 to-teal-100 text-green-800 border-green-200"
      case "AGENT_REJECTED":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200"
      case "USER_REGISTERED":
        return "bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border-indigo-200"
      case "ROLE_REQUEST":
        return "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200"
      case "DEAL_REQUEST":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <FiMail className="w-4 h-4 text-blue-600" />
      case "sms":
        return <FiSmartphone className="w-4 h-4 text-green-600" />
      case "in-app":
        return <FiMonitor className="w-4 h-4 text-purple-600" />
      default:
        return <FiBell className="w-4 h-4 text-gray-600" />
    }
  }

  // Format purpose for display
  const formatPurpose = (purpose: string | undefined) => {
    if (!purpose || typeof purpose !== 'string') {
      return "Unknown"
    }
    return purpose
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  // Use AllNotifications for pagination in "All Notifications" tab
  const totalPages = Math.ceil(AllNotifications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotifications = AllNotifications.slice(startIndex, startIndex + itemsPerPage)

  const handleEditNotification = (notification: any) => {
    setEditingNotification(notification)
  }

  const handleSaveNotification = (updatedNotification: any) => {
    setNotifications((prev) => prev.map((n) => (n.id === updatedNotification.id ? updatedNotification : n)))
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notifications Management
          </h1>
          <p className="text-gray-600 mt-1">Manage and monitor all platform notifications</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
          <FiPlus className="w-4 h-4 mr-2" />
          Create Notification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Notifications</p>
                <p className="text-2xl font-bold">{AllNotifications.length}</p>
              </div>
              <FiBell className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Property Related</p>
                <p className="text-2xl font-bold">{propertyNotifications.length}</p>
              </div>
              <FiHome className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">User Related</p>
                <p className="text-2xl font-bold">{userNotifications.length}</p>
              </div>
              <FiUsers className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Unread</p>
                <p className="text-2xl font-bold">{AllNotifications.filter((n) => !n.read).length}</p>
              </div>
              <FiEye className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search notifications or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-blue-200 focus:border-blue-500"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 border-2 border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="in-app">In-App</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 border-2 border-blue-200 focus:border-blue-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-100 to-purple-100 p-1 rounded-lg">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md font-semibold"
          >
            <FiBell className="w-4 h-4 mr-2" />
            All Notifications
          </TabsTrigger>
          <TabsTrigger
            value="property"
            className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-md font-semibold"
          >
            <FiHome className="w-4 h-4 mr-2" />
            Property
          </TabsTrigger>
          <TabsTrigger
            value="user"
            className="data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-md font-semibold"
          >
            <FiUsers className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger
            value="deals"
            className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md font-semibold"
          >
            <FiUserCheck className="w-4 h-4 mr-2" />
            Deals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <FiBell className="w-5 h-5 mr-2" />
                All Notifications Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <TableHead className="font-semibold text-blue-900">User</TableHead>
                    <TableHead className="font-semibold text-blue-900">Message</TableHead>
                    <TableHead className="font-semibold text-blue-900">Type</TableHead>
                    <TableHead className="font-semibold text-blue-900">Purpose</TableHead>
                    <TableHead className="font-semibold text-blue-900">Status</TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      <FiCalendar className="w-4 h-4 inline mr-1" />
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedNotifications.map((notification) => (
                    <TableRow
                      key={notification._id}
                      className={`transition-colors ${
                        notification.relatedModel === "Property" ? "hover:bg-green-50" : "hover:bg-blue-50"
                      }`}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback
                              className={`text-white ${
                                notification.relatedModel === "Property"
                                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                  : "bg-gradient-to-r from-blue-500 to-purple-500"
                              }`}
                            >
                              {notification.userId?.slice(0, 2).toUpperCase() || "NA"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">{notification.userId || "Unknown User"}</p>
                            <p className="text-sm text-gray-500">Model: {notification.relatedModel || "Unknown"}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate text-gray-700">{notification.message || "No message"}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(notification.type)}
                          <span className="capitalize text-sm font-medium">{notification.type || "unknown"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPurposeStyles(notification.purpose)}>
                          {formatPurpose(notification.purpose)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={notification.read ? "secondary" : "default"}
                          className={
                            notification.read
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {notification.read ? "Read" : "Unread"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {notification.createdAt
                          ? new Date(notification.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditNotification(notification)}
                            className={`hover:border-green-300 hover:text-green-600 ${
                              notification.relatedModel === "Property" ? "hover:bg-green-50" : "hover:bg-blue-50"
                            }`}
                          >
                            <FiEdit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNotification(notification._id)}
                            className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between p-4 border-t bg-gray-50">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, AllNotifications.length)} of{" "}
                  {AllNotifications.length} notifications
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="hover:bg-blue-50"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "hover:bg-blue-50"
                        }
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="hover:bg-blue-50"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="property">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <FiHome className="w-5 h-5 mr-2" />
                Property Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {propertyNotifications.length > 0 ? (
                  propertyNotifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          {notification.userId?.slice(0, 2).toUpperCase() || "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{notification.userId || "Unknown User"}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPurposeStyles(notification.purpose)}>
                              {formatPurpose(notification.purpose)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {notification.createdAt
                                ? new Date(notification.createdAt).toLocaleDateString()
                                : "Unknown"}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-1">{notification.message || "No message"}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(notification.type)}
                            <span className="text-sm text-gray-600 capitalize">{notification.type || "unknown"}</span>
                            <span className="text-sm">{notification.read ? "✅ Read" : "📩 Unread"}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-green-100 bg-transparent"
                              onClick={() => handleEditNotification(notification)}
                            >
                              <FiEdit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-100 bg-transparent"
                              onClick={() => handleDeleteNotification(notification._id)}
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-6">No Notifications</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <FiUsers className="w-5 h-5 mr-2" />
                User Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {userNotifications.length > 0 ? (
                  userNotifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">
                          {notification.userId?.slice(0, 2).toUpperCase() || "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{notification.userId || "Unknown User"}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPurposeStyles(notification.purpose)}>
                              {formatPurpose(notification.purpose)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {notification.createdAt
                                ? new Date(notification.createdAt).toLocaleDateString()
                                : "Unknown"}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-1">{notification.message || "No message"}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(notification.type)}
                            <span className="text-sm text-gray-600 capitalize">{notification.type || "unknown"}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-purple-100 bg-transparent"
                              onClick={() => handleEditNotification(notification)}
                            >
                              <FiEdit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-100 bg-transparent"
                              onClick={() => handleDeleteNotification(notification._id)}
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-6">No Notifications</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <FiUserCheck className="w-5 h-5 mr-2" />
                Deal Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {dealNotifications.length > 0 ? (
                  dealNotifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                          {notification.userId?.slice(0, 2).toUpperCase() || "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{notification.userId || "Unknown User"}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPurposeStyles(notification.purpose)}>
                              {formatPurpose(notification.purpose)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {notification.createdAt
                                ? new Date(notification.createdAt).toLocaleDateString()
                                : "Unknown"}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-1">{notification.message || "No message"}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(notification.type)}
                            <span className="text-sm text-gray-600 capitalize">{notification.type || "unknown"}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-orange-100 bg-transparent"
                              onClick={() => handleEditNotification(notification)}
                            >
                              <FiEdit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-100 bg-transparent"
                              onClick={() => handleDeleteNotification(notification._id)}
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-6">No Notifications</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditNotificationModal
        isOpen={!!editingNotification}
        onClose={() => setEditingNotification(null)}
        notification={editingNotification}
        onSave={handleSaveNotification}
      />
    </div>
  )
}