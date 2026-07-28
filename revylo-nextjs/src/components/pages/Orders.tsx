"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
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

// Sample orders data
const orders = [
  {
    id: "#ORD-2024-001",
    customer: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    avatar: "",
    items: 3,
    total: 129900,
    status: "delivered",
    date: "2024-02-15",
    time: "10:30 AM",
    payment: "paid"
  },
  {
    id: "#ORD-2024-002",
    customer: "Michael Chen",
    customerEmail: "m.chen@email.com",
    avatar: "",
    items: 1,
    total: 44900,
    status: "shipping",
    date: "2024-02-16",
    time: "2:15 PM",
    payment: "paid"
  },
  {
    id: "#ORD-2024-003",
    customer: "Emma Davis",
    customerEmail: "emma.d@email.com",
    avatar: "",
    items: 5,
    total: 219950,
    status: "processing",
    date: "2024-02-17",
    time: "9:45 AM",
    payment: "paid"
  },
  {
    id: "#ORD-2024-004",
    customer: "James Wilson",
    customerEmail: "james.w@email.com",
    avatar: "",
    items: 2,
    total: 69900,
    status: "pending",
    date: "2024-02-17",
    time: "11:20 AM",
    payment: "pending"
  },
  {
    id: "#ORD-2024-005",
    customer: "Olivia Brown",
    customerEmail: "olivia.b@email.com",
    avatar: "",
    items: 4,
    total: 154900,
    status: "cancelled",
    date: "2024-02-14",
    time: "4:30 PM",
    payment: "refunded"
  },
];

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock, label: "Pending" },
  processing: { color: "bg-blue-100 text-blue-700", icon: Package, label: "Processing" },
  shipping: { color: "bg-purple-100 text-purple-700", icon: Truck, label: "Shipping" },
  delivered: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle, label: "Delivered" },
  cancelled: { color: "bg-red-100 text-red-700", icon: XCircle, label: "Cancelled" },
};

const stats = [
  { label: "Total Orders", value: "248", change: "+12.5%", positive: true },
  { label: "Pending", value: "23", change: "+5", positive: false },
  { label: "Processing", value: "45", change: "+8", positive: true },
  { label: "Delivered", value: "180", change: "+15.3%", positive: true },
];

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">{filteredOrders.length} total orders</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</h3>
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
          className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                placeholder="Search by order ID, customer name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-10 bg-gray-50 border-0"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-0">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Orders Table */}
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order, index) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-mono font-semibold text-gray-900">{order.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={order.avatar} />
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                              {order.customer.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{order.customer}</p>
                            <p className="text-xs text-gray-500">{order.customerEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{order.date}</p>
                        <p className="text-xs text-gray-500">{order.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{order.items} items</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">NPR {order.total.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={order.payment === "paid" 
                            ? "bg-emerald-100 text-emerald-700" 
                            : order.payment === "pending" 
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                          }
                        >
                          {order.payment}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`${statusConfig[order.status as keyof typeof statusConfig].color} gap-1.5`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
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
