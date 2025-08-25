"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const riskData = [
  { name: "Risk", value: 70 }, // 70% risk score
  { name: "Remaining", value: 30 },
]

const COLORS = ["#ef4444", "#1f2937"] // Red for risk, gray for background

export default function PRSummary() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Pull Request Summary</h1>

      {/* Section 1: Summary Stats */}
      <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">📊 Summary Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-6 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-zinc-800 rounded-2xl shadow">
            <p className="text-gray-400">Files Changed</p>
            <p className="text-2xl font-bold">12</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-zinc-800 rounded-2xl shadow">
            <p className="text-gray-400">Lines Added</p>
            <p className="text-2xl font-bold text-green-400">+152</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-zinc-800 rounded-2xl shadow">
            <p className="text-gray-400">Lines Removed</p>
            <p className="text-2xl font-bold text-red-400">-47</p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Section 2: Dependency Changes */}
      <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">📦 Dependency Changes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p
             className="font-bold text-red-400" >spring-boot-starter-web : 2.7.3 → 3.1.0{" "}
            <span className="text-red-500">(Major – Breaking Risk)</span>
          </p>
          <p
             className="font-bold text-yellow-400">lombok: 1.18.24 → 1.18.26 (Minor)
          </p>
        </CardContent>
      </Card>

      {/* Section 3: Change Categories */}
      <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">🗂 Change Categories</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-white">
          <p>✅ Feature: Added password reset API</p>
          <p>🔄 Refactor: Removed deprecated AuthService method</p>
          <p>🛠 Config Change: application.yml updated</p>
        </CardContent>
      </Card>

      {/* Section 4: File Changes List */}
      <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">📄 File Changes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2  text-white">
          <p>src/main/java/com/example/AuthService.java – <span className="text-green-400">+10</span>, <span className="text-red-400">-4</span></p>
          <p>pom.xml – dependency version bumps</p>
          <p>application.yml – DB config updated</p>
        </CardContent>
      </Card>

      {/* Section 5 & 6: Risk + Actions */}
      <div className="grid grid-cols-2 gap-6">
        {/* Risk Circle */}
        <Card className="bg-black border-zinc-800 shadow-xl flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                startAngle={90}
                endAngle={-270}
                paddingAngle={3}
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center">
            <p className="text-xl font-bold text-red-400">70%</p>
            <p className="text-gray-400 text-sm">Risk Score</p>
          </div>
        </Card>

        {/* Actions */}
        <Card className="bg-black border-zinc-800 shadow-xl flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle className="text-white">⚡ Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Export Summary PDF</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Send to Slack</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
