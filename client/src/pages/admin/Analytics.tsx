import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ShoppingBag, Users, Package, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Sample data
const revenueData = [
  { month: "Jan", revenue: 285000, orders: 45 },
  { month: "Feb", revenue: 312000, orders: 52 },
  { month: "Mar", revenue: 298000, orders: 48 },
  { month: "Apr", revenue: 345000, orders: 61 },
  { month: "May", revenue: 389000, orders: 68 },
  { month: "Jun", revenue: 412000, orders: 74 },
];

const categoryData = [
  { name: "Furniture", value: 45, sales: 1250000 },
  { name: "Lighting", value: 25, sales: 680000 },
  { name: "Decor", value: 20, sales: 520000 },
  { name: "Workspace", value: 10, sales: 340000 },
];

const topProducts = [
  { name: "Modern Leather Sofa", sales: 156, revenue: 202440000 },
  { name: "Industrial Pendant Light", sales: 342, revenue: 64638000 },
  { name: "Minimalist Coffee Table", sales: 78, revenue: 31122000 },
  { name: "Ergonomic Office Chair", sales: 124, revenue: 111476000 },
  { name: "Scandinavian Bookshelf", sales: 89, revenue: 62211000 },
];

const COLORS = ['#2d4a3e', '#10b981', '#3b82f6', '#f59e0b'];

const stats = [
  { 
    label: "Total Revenue", 
    value: "NPR 28,90,000", 
    change: "+15.3%", 
    positive: true, 
    icon: TrendingUp,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  { 
    label: "Total Orders", 
    value: "348", 
    change: "+8.2%", 
    positive: true, 
    icon: ShoppingBag,
    bg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  { 
    label: "New Customers", 
    value: "124", 
    change: "+12.5%", 
    positive: true, 
    icon: Users,
    bg: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  { 
    label: "Products Sold", 
    value: "789", 
    change: "-2.4%", 
    positive: false, 
    icon: Package,
    bg: "bg-orange-50",
    iconColor: "text-orange-600"
  },
];

export default function AdminAnalytics() {
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
              Analytics Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Track your business performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white">
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
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
              >
                <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                      </div>
                      <div className="flex items-center gap-1">
                        {stat.positive ? (
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-semibold ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {stat.value}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Revenue & Orders Trend
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Monthly performance overview</p>
                  </div>
                  <Select defaultValue="revenue">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="orders">Orders</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontFamily: "'Inter', sans-serif"
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === 'revenue') {
                          return [`NPR ${value.toLocaleString()}`, 'Revenue'];
                        }
                        return [value, 'Orders'];
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#2d4a3e" 
                      strokeWidth={3}
                      dot={{ fill: '#2d4a3e', r: 4 }}
                      name="Revenue (NPR)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', r: 3 }}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white border-0 shadow-sm h-full">
              <CardHeader>
                <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Sales by Category
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">Distribution overview</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontFamily: "'Inter', sans-serif"
                      }}
                      formatter={(value: number) => [`${value}%`, 'Share']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {categoryData.map((cat, index) => (
                    <div key={cat.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-gray-700">{cat.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        NPR {(cat.sales / 1000).toFixed(0)}k
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Top Selling Products
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Best performers this month</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    angle={-15}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: "'Inter', sans-serif"
                    }}
                    formatter={(value: number) => [`NPR ${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#2d4a3e" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
