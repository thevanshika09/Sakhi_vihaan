"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BottomNavigation from "@/components/bottom-navigation"
import { ArrowLeft, Bell, Globe, Lock, Moon, Shield, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [autoScan, setAutoScan] = useState(true)
  const [advancedProtection, setAdvancedProtection] = useState(false)

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-6 w-6 text-slate-300" />
        </Button>
        <h1 className="text-xl font-bold">Settings</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-4 py-2 space-y-6">
        {/* Profile Section */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-900 flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="font-medium">User Name</p>
                <p className="text-sm text-slate-400">user@example.com</p>
              </div>
              <Button variant="ghost" className="ml-auto">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Moon className="h-5 w-5 mr-3 text-slate-300" />
                <span>Dark Mode</span>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle>Security</CardTitle>
            <CardDescription className="text-slate-400">Configure your security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-3 text-slate-300" />
                <span>Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3 text-slate-300" />
                <span>Auto-scan QR codes</span>
              </div>
              <Switch checked={autoScan} onCheckedChange={setAutoScan} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-3 text-slate-300" />
                <span>Advanced Protection</span>
              </div>
              <Switch checked={advancedProtection} onCheckedChange={setAdvancedProtection} />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle>Language</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-3 text-slate-300" />
                <span>Language</span>
              </div>
              <Button variant="outline" className="bg-slate-700 border-slate-600">
                English
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-slate-300">SakhiPay v1.0.0</p>
            <div className="flex space-x-4">
              <Button variant="link" className="text-emerald-400 p-0 h-auto">
                Privacy Policy
              </Button>
              <Button variant="link" className="text-emerald-400 p-0 h-auto">
                Terms of Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="settings" />
    </main>
  )
}
