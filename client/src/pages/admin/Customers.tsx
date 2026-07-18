import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Mail, Phone, MapPin, ShoppingBag, Calendar, MoreVertical, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample customer data
const customers = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+977 9841234567",
    location: "Kathmandu, Nepal",
    totalOrders: 12,
    totalSpent: 459000, // NPR
    lastOrder: "2024-02-15",
    status: "vip",
    avatar: "/api/placeholder/40/40",
    joinDate: "2023-06-15",
  },
  {
    id: 2,
    name: "Rajesh Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+977 9851234567",
    location: "Pokhara, Nepal",
    totalOrders: 8,
    totalSpent: 289000,
    lastOrder: "2024-02-12",
    status: "regular",
    avatar: "/api/placeholder/40/40",
    joinDate: "2023-08-20",
  },
  {
    id: 3,
    name: "Priya Thapa",
    email: "priya.thapa@email.com",
    phone: "+977 9861234567",
    location: "Lalitpur, Nepal",
    totalOrders: 15,
    totalSpent: 678000,
    lastOrder: "2024-02-18",
    status: "vip",
    avatar: "/api/placeholder/40/40",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "Anil Gurung",
    email: "anil.gurung@email.com",
    phone: "+977 9871234567",
    location: "Bhaktapur, Nepal",
    totalOrders: 3,
    totalSpent: 125000,
    lastOrder: "2024-01-28",
    status: "new",
    avatar: "/api/placeholder/40/40",
    joinDate: "2024-01-05",
  },
  {
    id: 5,
    name: "Sita Rai",
    email: "sita.rai@email.com",
    phone: "+977 9881234567",
    location: "Biratnagar, Nepal",
    totalOrders: 6,
    totalSpent: 234000,
    lastOrder: "2024-02-10",
    status: "regular",
    avatar: "/api/placeholder/40/40",
    joinDate: "2023-09-18",
  },
];

const statusConfig = {
  vip: { color: "bg-purple-100 text-purple-700", label: "VIP" },
  regular: { color: "bg-blue-100 text-blue-700", label: "Regular" },
  new: { color: "bg-green-100 text-green-700", label: "New" },
};

const stats = [
  { label: "Total Customers", value: "1,248", change: "+12.5%", positive: true, icon: ShoppingBag },
  { label: "New This Month", value: "45", change: "+8", positive: true, icon: UserPlus },
  { label: "VIP Customers", value: "124", change: "+15", positive: true, icon: ShoppingBag },
  { label: "Avg. Lifetime Value", value: "NPR 185,000", change: "+5.3%", positive: true, icon: ShoppingBag },
];

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
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
              Customers
            </h1>
            <p className="text-gray-500 mt-1">{filteredCustomers.length} customers found</p>
          </div>
          <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white gap-2">
            <UserPlus className="w-4 h-4" />
            Add Customer
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
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#2d4a3e]/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#2d4a3e]" />
                  </div>
                  <span className={`text-sm font-semibold ${stat.positive ? 'text-emerald-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {stat.value}
                </h3>
              </motion.div>
            );
          })}
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
                placeholder="Search by name, email or phone..."
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
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCustomers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ y: -4 }}
              >
                <Card className="bg-white border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-14 h-14 border-2 border-gray-100">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback className="bg-[#2d4a3e] text-white text-lg">
                            {customer.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          <Badge className={statusConfig[customer.status as keyof typeof statusConfig].color}>
                            {statusConfig[customer.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{customer.location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                        <p className="text-lg font-bold text-gray-900">{customer.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                        <p className="text-lg font-bold text-[#2d4a3e]">
                          NPR {(customer.totalSpent / 1000).toFixed(0)}k
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Last order: {customer.lastOrder}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Spent
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
                  {filteredCustomers.map((customer, index) => (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={customer.avatar} />
                            <AvatarFallback className="bg-[#2d4a3e] text-white">
                              {customer.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-xs text-gray-500">Joined {customer.joinDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{customer.email}</p>
                        <p className="text-xs text-gray-500">{customer.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{customer.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">{customer.totalOrders}</p>
                        <p className="text-xs text-gray-500">orders</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-[#2d4a3e]">
                          NPR {customer.totalSpent.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={statusConfig[customer.status as keyof typeof statusConfig].color}>
                          {statusConfig[customer.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
