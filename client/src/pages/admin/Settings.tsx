import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Store, Mail, Bell, Shield, Palette, Globe, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

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
              Settings
            </h1>
            <p className="text-gray-500 mt-1">Manage your store settings and preferences</p>
          </div>
          <Button 
            className="bg-[#2d4a3e] hover:bg-[#234136] text-white gap-2"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="bg-white border border-gray-200 p-1">
              <TabsTrigger value="general" className="gap-2">
                <Store className="w-4 h-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2">
                <Palette className="w-4 h-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="payments" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Payments
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Store Information
                    </CardTitle>
                    <CardDescription>Basic information about your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Store Name</Label>
                        <Input defaultValue="KRAFTSTUDIO" placeholder="Your store name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Store Email</Label>
                        <Input defaultValue="info@kraftstudio.com" type="email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Store Description</Label>
                      <Textarea 
                        defaultValue="Premium furniture and interior design solutions for modern homes and workspaces." 
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input defaultValue="+977 9841234567" />
                      </div>
                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <Select defaultValue="npr">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="npr">NPR - Nepalese Rupee</SelectItem>
                            <SelectItem value="usd">USD - US Dollar</SelectItem>
                            <SelectItem value="inr">INR - Indian Rupee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Store Address
                    </CardTitle>
                    <CardDescription>Physical location of your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Street Address</Label>
                      <Input defaultValue="Durbar Marg, Kathmandu" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input defaultValue="Kathmandu" />
                      </div>
                      <div className="space-y-2">
                        <Label>Province</Label>
                        <Select defaultValue="bagmati">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bagmati">Bagmati</SelectItem>
                            <SelectItem value="gandaki">Gandaki</SelectItem>
                            <SelectItem value="lumbini">Lumbini</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Postal Code</Label>
                        <Input defaultValue="44600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Email Notifications
                    </CardTitle>
                    <CardDescription>Manage email notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "New Orders", description: "Receive emails when new orders are placed" },
                      { label: "Order Updates", description: "Get notified about order status changes" },
                      { label: "New Customers", description: "Notification when new customers register" },
                      { label: "Low Stock Alerts", description: "Alert when product stock is running low" },
                      { label: "New Reviews", description: "Notification when customers leave reviews" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      SMS Notifications
                    </CardTitle>
                    <CardDescription>Manage SMS notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "Urgent Orders", description: "SMS for high-priority orders" },
                      { label: "Booking Confirmations", description: "SMS for consultation bookings" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <Switch />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Appearance */}
            <TabsContent value="appearance" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Theme Settings
                    </CardTitle>
                    <CardDescription>Customize your admin panel appearance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Color Scheme</Label>
                      <Select defaultValue="green">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="green">Forest Green (Default)</SelectItem>
                          <SelectItem value="blue">Ocean Blue</SelectItem>
                          <SelectItem value="purple">Royal Purple</SelectItem>
                          <SelectItem value="dark">Dark Mode</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Compact Sidebar</p>
                        <p className="text-sm text-gray-500">Use a smaller sidebar for more space</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Animations</p>
                        <p className="text-sm text-gray-500">Enable smooth page transitions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Password & Authentication
                    </CardTitle>
                    <CardDescription>Manage your security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>Add an extra layer of security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Enable 2FA</p>
                        <p className="text-sm text-gray-500">Require a code from your phone to sign in</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Payments */}
            <TabsContent value="payments" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Payment Methods
                    </CardTitle>
                    <CardDescription>Configure accepted payment methods</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Cash on Delivery", description: "Accept cash payments on delivery" },
                      { name: "eSewa", description: "Digital wallet payment" },
                      { name: "Khalti", description: "Digital wallet payment" },
                      { name: "IME Pay", description: "Digital wallet payment" },
                      { name: "Bank Transfer", description: "Direct bank account transfer" },
                    ].map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                        <Switch defaultChecked={index === 0} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Tax Settings
                    </CardTitle>
                    <CardDescription>Configure tax rates for products</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>VAT Rate (%)</Label>
                      <Input type="number" defaultValue="13" placeholder="13" />
                      <p className="text-xs text-gray-500">Nepal standard VAT rate is 13%</p>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Include Tax in Prices</p>
                        <p className="text-sm text-gray-500">Show prices with tax included</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
