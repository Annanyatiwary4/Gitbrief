"use client"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const COLORS = ["#ef4444", "#1f2937"]

export default function PRSummary() {
  const { owner, repo, prNumber } = useParams()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/repos/${owner}/${repo}/pull-requests/${prNumber}/summary`,
          { credentials: "include" }
        )
        const data = await res.json()
        setSummary(data)
        console.log("PRSummary data:", data);

      } catch (err) {
        console.error("Error fetching summary:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [owner, repo, prNumber])

  if (loading) return <p className="text-white p-6">Loading Summary...</p>
  if (!summary) return <p className="text-white p-6">No summary found.</p>

  // 👇 Extract summary fields
const { stats, dependencies = [], categories = [], files = [], actions = [] } = summary
const riskScore = summary.riskScore ?? 0

const riskData = [
  { name: "Risk", value: riskScore },
  { name: "Remaining", value: 100 - riskScore },
]

 const aiSummaryText = summary?.summary ?? "No summary available";



  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        PR Summary – {owner}/{repo} #{prNumber}
      </h1>

      {/* Section 1: Summary Stats */}
      <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-3xl">Summary Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-6 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-black border-white rounded-2xl shadow">
            <p className="text-white text-2xl">Files Changed</p>
            <p className="text-2xl font-bold text-white ">{stats.filesChanged}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-black rounded-2xl shadow">
            <p className="text-white text-2xl">Lines Added</p>
            <p className="text-xl font-bold text-green-400">+{stats.linesAdded}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-black rounded-2xl shadow">
            <p className="text-white text-2xl">Lines Removed</p>
            <p className="text-2xl font-bold text-red-400">-{stats.linesRemoved}</p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Section 2: Dependency Changes */}
      <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-3xl">Dependency Changes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-white" >
          {dependencies.map((dep, i) => (
            <p key={i} className={`font-mono ${dep.risk === "Major" ? "text-red-400" : "text-yellow-400"}`}>
              {dep.name}: {dep.from} → {dep.to} ({dep.risk})
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Section 3: Change Categories */}
      <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-3xl">Change Categories</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-2 text-white font-medium">
          {categories.map((c, i) => <p key={i}>{c}</p>)}
        </CardContent>
      </Card>

      {/* Section 4: File Changes */}
      <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-3xl">📄 File Changes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-white">
          {files.map((f, i) => (
            <p key={i}>
              {f.path} – <span className="text-green-400">+{f.added}</span>, <span className="text-red-400">-{f.removed}</span>
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Section 5 & 6: Risk + Actions */}
      <div className="grid grid-cols-2 gap-6">
        {/* Risk Circle */}
        <Card className="bg-black border-zinc-800 shadow-xl flex items-center justify-center relative">
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
            <p className="text-xl font-bold text-red-400">{riskScore}%</p>
            <p className="text-gray-400 text-sm">Risk Score</p>
          </div>
        </Card>

        <Card className="bg-black border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-3xl">🤖 AI Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-2 font-sans">
          <p>{aiSummaryText}</p>
        </CardContent>
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
