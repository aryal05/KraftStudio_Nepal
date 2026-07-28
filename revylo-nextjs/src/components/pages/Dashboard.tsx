"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ShoppingCart, Eye, Package, ArrowRight, RefreshCw, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { formatNPR } from "@/lib/utils";

// Sample data for charts
const salesData = [
  { date: "Aug 01, 2024", sales: 19000, revenue: 23000 },
  { date: "Aug 05", sales: 21000, revenue: 25000 },
  { date: "Aug 10", sales: 23000, revenue: 27000 },
  { date: "Aug 12, 2024", sales: 24500, revenue: 28000 },
  { date: "Aug 15", sales: 22000, revenue: 26000 },
  { date: "Aug 20", sales: 19500, revenue: 24000 },
  { date: "Aug 25", sales: 21500, revenue: 25500 },
  { date: "Aug 32, 2024", sales: 20000, revenue: 24000 },
];

const conversionData = [
  { name: "Product Views", value: 6545, percentage: "15%" },
  { name: "Add to cart", value: 3491, percentage: "8%" },
  { name: "Checkout Initiated", value: 1342, percentage: "4%" },
  { name: "Completed purchases", value: 1200, percentage: "1.89%" },
];

const productList = [
  { id: 1, name: "Cooper, Kristin", image: "", price: 11992, stock: 34, sold: 340, active: true },
  { id: 2, name: "Mid-Century Lounge Chair", image: "", price: 29900, stock: 12, sold: 156, active: true },
  { id: 3, name: "Minimalist Desk Lamp", image: "", price: 8950, stock: 45, sold: 203, active: false },
  { id: 4, name: "Scandinavian Coffee Table", image: "", price: 44999, stock: 8, sold: 87, active: true },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-8 py-6"
        style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              Welcome back to KRAFTSTUDIO Admin
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Team avatars */}
            <div className="flex -space-x-2">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="" />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6m-5-7h10" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </Button>
            <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white rounded-lg">
              <span className="mr-2">Export</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Stats Cards Row 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* New Net Income */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">New Net Income</p>
                  <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>NPR 5,37,650</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-emerald-500 font-medium">10.5%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">+NPR 21,560 from last month</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Average Sales */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Average Sales</p>
                  <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>NPR 1,25,490</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-emerald-500 font-medium">13.5%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">+NPR 42,750 from last month</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Total Orders */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Order</p>
                  <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>13,439</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500 font-medium">0.5%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">+2,156 from last month</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Impression */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Impression</p>
                  <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>349K</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500 font-medium">25.1%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">-98.5K from last month</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Overall Sales</p>
                    <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>NPR 6,33,320</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-emerald-500 font-medium">10.5%</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <Select defaultValue="dashboard">
                    <SelectTrigger className="w-[140px] bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[160px] bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="lighting">Lighting</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      <span className="text-sm text-gray-600">This Period</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-sm text-gray-600">Last Period</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      tickFormatter={(value) => value.includes(',') ? value : ''}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      tickFormatter={(value) => formatNPR(value / 1000, { shortForm: true }).replace(' ', '') + 'k'}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        padding: '12px'
                      }}
                      formatter={(value: number) => [formatNPR(value), '']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#9ca3af" 
                      strokeWidth={2}
                      fill="url(#colorRevenue)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fill="url(#colorSales)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">NET SALES</p>
                      <p className="text-xs text-gray-500 mt-1">Aug 12, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-600" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{formatNPR(53500, { shortForm: true })}</p>
                      <p className="text-xs text-gray-500 mt-1">Aug 12, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Conversion Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white border-0 shadow-sm h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Conversion Rate</p>
                    <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>4.55%</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-emerald-500 font-medium">0.5%</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {conversionData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{item.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: item.percentage }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{item.percentage}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Premium Plan Upgrade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Upgrade</p>
                    <h3 className="text-xl font-bold text-gray-900">Premium Plan</h3>
                  </div>
                  <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white rounded-lg">
                    Upgrade
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Supercharge your sales management and unlock your full potential for extraordinary success.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Performance</p>
                    <p className="text-2xl font-bold text-emerald-600" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>79%</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Tools</p>
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>30+</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Product List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Product List</p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>390</h3>
                      <span className="text-sm text-emerald-500 font-medium">+12</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-emerald-600">
                    <PlusCircle className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="relative flex-1">
                    <Input 
                      placeholder="Search" 
                      className="pl-10 bg-gray-50 border-0"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <Button variant="ghost" size="icon">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-5 gap-4 text-xs text-gray-500 uppercase tracking-wider pb-2 border-b">
                    <span className="col-span-2">Product Info</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span>Sold</span>
                    <span>Active</span>
                  </div>
                  {productList.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="grid grid-cols-5 gap-4 items-center py-3 rounded-lg transition-colors"
                    >
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar className="w-10 h-10 rounded-lg">
                          <AvatarImage src={product.image} />
                          <AvatarFallback className="rounded-lg bg-gray-100">
                            {product.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                      </div>
                      <span className="text-sm text-gray-700" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{formatNPR(product.price, { shortForm: true })}</span>
                      <span className="text-sm text-gray-700" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{product.stock}</span>
                      <span className="text-sm text-gray-700" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{product.sold}</span>
                      <Switch checked={product.active} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
