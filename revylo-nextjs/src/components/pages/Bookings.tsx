"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Calendar, CheckCircle, XCircle, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample bookings data
const bookings = [
  {
    id: "#BK-2024-001",
    customer: "Sarah Mitchell",
    customerEmail: "sarah.mitchell@email.com",
    phone: "+1 (555) 123-4567",
    date: "2024-02-20",
    time: "10:00 AM",
    status: "confirmed",
    type: "Design Consultation",
    message: "Looking for furniture for new apartment",
    avatar: "",
  },
  {
    id: "#BK-2024-002",
    customer: "James Wilson",
    customerEmail: "j.wilson@email.com",
    phone: "+1 (555) 234-5678",
    date: "2024-02-21",
    time: "02:00 PM",
    status: "pending",
    type: "Virtual Consultation",
    message: "Office workspace design",
    avatar: "",
  },
  {
    id: "#BK-2024-003",
    customer: "Emma Davis",
    customerEmail: "emma.d@email.com",
    phone: "+1 (555) 345-6789",
    date: "2024-02-22",
    time: "11:00 AM",
    status: "confirmed",
    type: "In-Store Visit",
    message: "Living room furniture shopping",
    avatar: "",
  },
  {
    id: "#BK-2024-004",
    customer: "Michael Brown",
    customerEmail: "m.brown@email.com",
    phone: "+1 (555) 456-7890",
    date: "2024-02-23",
    time: "03:00 PM",
    status: "completed",
    type: "Design Consultation",
    message: "Full home interior design",
    avatar: "",
  },
  {
    id: "#BK-2024-005",
    customer: "Olivia Garcia",
    customerEmail: "olivia.g@email.com",
    phone: "+1 (555) 567-8901",
    date: "2024-02-24",
    time: "09:00 AM",
    status: "cancelled",
    type: "Virtual Consultation",
    message: "Bedroom makeover ideas",
    avatar: "",
  },
];

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock, label: "Pending" },
  confirmed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle, label: "Confirmed" },
  completed: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle, label: "Completed" },
  cancelled: { color: "bg-red-100 text-red-700", icon: XCircle, label: "Cancelled" },
};

const stats = [
  { label: "Total Bookings", value: "124", change: "+8.2%", positive: true },
  { label: "Pending", value: "12", change: "+3", positive: false },
  { label: "Confirmed", value: "45", change: "+15", positive: true },
  { label: "Completed", value: "67", change: "+12.5%", positive: true },
];

export default function AdminBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-8 py-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Consultation Bookings
            </h1>
            <p className="text-gray-500 mt-1">Manage design consultations and appointments</p>
          </div>
          <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white gap-2">
            <Calendar className="w-4 h-4" />
            View Calendar
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {stat.value}
                </h3>
                <span className={`text-sm font-medium ${stat.positive ? 'text-emerald-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by booking ID, customer name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-gray-50 border-0">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking, index) => {
                  const StatusIcon = statusConfig[booking.status as keyof typeof statusConfig].icon;
                  return (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-mono font-semibold text-gray-900 text-sm">{booking.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={booking.avatar} />
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                              {booking.customer.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{booking.customer}</p>
                            <p className="text-xs text-gray-500">{booking.customerEmail}</p>
                            <p className="text-xs text-gray-500">{booking.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{booking.date}</p>
                            <p className="text-xs text-gray-500">{booking.time}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-xs">
                          {booking.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 max-w-xs truncate">{booking.message}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`${statusConfig[booking.status as keyof typeof statusConfig].color} gap-1.5`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig[booking.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {booking.status === "pending" && (
                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white h-8 px-3 text-xs">
                              Confirm
                            </Button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
