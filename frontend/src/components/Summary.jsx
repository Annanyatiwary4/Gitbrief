"use client"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import BackButton from "@/utils/Backbutton"
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#ef4444", "#1f2937"]

export default function PRSummary() {
  const { owner, repo, prNumber } = useParams()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/repos/${owner}/${repo}/pull-requests/${prNumber}/summary`,
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


if (loading) {
  return (
     <div className="min-h-screen w-full bg-black p-6">
    <div className="p-6 grid gap-6 md:grid-cols-2">
      {/* Card 1 Skeleton */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-4">
        <Skeleton className="h-6 w-1/3" /> {/* Card title */}
        <Skeleton className="h-4 w-full" /> {/* Line 1 */}
        <Skeleton className="h-4 w-2/3" /> {/* Line 2 */}
      </div>

      {/* Card 2 Skeleton */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-4">
        <Skeleton className="h-6 w-1/2" /> {/* Card title */}
        <Skeleton className="h-4 w-full" /> {/* Line 1 */}
        <Skeleton className="h-4 w-4/5" /> {/* Line 2 */}
      </div>

      {/* Card 3 Skeleton */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-4">
        <Skeleton className="h-6 w-1/4" /> {/* Card title */}
        <Skeleton className="h-4 w-full" /> {/* Line 1 */}
        <Skeleton className="h-4 w-3/4" /> {/* Line 2 */}
      </div>

      {/* Card 4 Skeleton */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-4">
        <Skeleton className="h-6 w-1/3" /> {/* Card title */}
        <Skeleton className="h-4 w-full" /> {/* Line 1 */}
        <Skeleton className="h-4 w-2/3" /> {/* Line 2 */}
      </div>
    </div>
    </div>
  );
}

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
      <BackButton />
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
          <CardTitle className="text-white text-3xl">Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-2 font-sans">
          <p>{aiSummaryText}</p>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
