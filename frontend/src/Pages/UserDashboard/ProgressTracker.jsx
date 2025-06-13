"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    Target,
    TrendingUp,
    Clock,
    CheckCircle,
    Trophy,
    Calendar,
    Star,
    Zap,
    Award,
    BookOpen,
    Loader2,
    AlertCircle,
} from "lucide-react"

const ProgressTracker = ({ userEmail }) => {
    const navigate = useNavigate()
    const [progressData, setProgressData] = useState(null)
    const [weeklyGoal, setWeeklyGoal] = useState(300) // minutes
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (userEmail) {
            fetchProgressData()
        }
    }, [userEmail])

    const fetchProgressData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Update the API URL to point to your localhost:9000 server
            const response = await fetch(`http://localhost:9000/api/user/dashboard/${userEmail}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Remove Authorization header
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            if (result.success) {
                setProgressData(result.data)
            } else {
                throw new Error(result.message || "Failed to fetch progress data")
            }
        } catch (error) {
            console.error("Error fetching progress data:", error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateWeeklyGoal = async (newGoal) => {
        try {
            // This would be an API call to update the user's weekly goal
            setWeeklyGoal(newGoal)
            // You can implement the API call here
        } catch (error) {
            console.error("Error updating weekly goal:", error)
        }
    }

    const calculateWeeklyProgress = () => {
        // This would calculate based on actual learning time this week
        // For now, we'll simulate it
        const simulatedWeeklyMinutes = Math.floor(Math.random() * weeklyGoal)
        return Math.min(simulatedWeeklyMinutes, weeklyGoal)
    }

    const getAchievementIcon = (iconName) => {
        const icons = {
            Trophy,
            BookOpen,
            Zap,
            Star,
            Award,
            CheckCircle,
        }
        return icons[iconName] || Trophy
    }

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin">
                            <Loader2 size={48} />
                        </div>
                        <p className="text-gray-400">Loading progress data...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="text-center py-12">
                    <div className="w-12 h-12 text-red-500 mx-auto mb-4">
                        <AlertCircle size={48} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Failed to load progress</h3>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button
                        onClick={fetchProgressData}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    const { stats, achievements, recentActivity, enrolledCourses } = progressData
    const weeklyProgress = calculateWeeklyProgress()
    const weeklyGoalProgress = (weeklyProgress / weeklyGoal) * 100
    const overallProgress = stats.totalCourses > 0 ? (stats.completedCourses / stats.totalCourses) * 100 : 0

    return (
        <div className="space-y-8">
            {/* Overall Progress Card */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Target size={20} className="text-white" />
                    </div>
                    Learning Progress
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Course Completion */}
                    <div className="bg-gray-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-blue-400" />
                                <span className="text-gray-300 text-sm font-medium">Courses</span>
                            </div>
                            <span className="text-white text-sm font-semibold">
                                {stats.completedCourses}/{stats.totalCourses}
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${overallProgress}%` }}
                            ></div>
                        </div>
                        <span className="text-gray-400 text-xs">{Math.round(overallProgress)}% complete</span>
                    </div>

                    {/* Study Time */}
                    <div className="bg-gray-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-purple-400" />
                                <span className="text-gray-300 text-sm font-medium">Study Time</span>
                            </div>
                            <span className="text-white text-sm font-semibold">{stats.totalHours}h</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            <TrendingUp size={14} className="text-green-400" />
                            <span className="text-green-400 text-xs">+2.5h this week</span>
                        </div>
                        <span className="text-gray-400 text-xs">Total time invested</span>
                    </div>

                    {/* Certificates */}
                    <div className="bg-gray-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Award size={16} className="text-yellow-400" />
                                <span className="text-gray-300 text-sm font-medium">Certificates</span>
                            </div>
                            <span className="text-white text-sm font-semibold">{stats.certificates}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            <CheckCircle size={14} className="text-green-400" />
                            <span className="text-green-400 text-xs">Earned</span>
                        </div>
                        <span className="text-gray-400 text-xs">Completion certificates</span>
                    </div>
                </div>
            </div>

            {/* Weekly Goal Card */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <Target size={20} className="text-white" />
                        </div>
                        Weekly Goal
                    </h3>
                    <button
                        onClick={() => {
                            const newGoal = prompt("Set your weekly study goal (minutes):", weeklyGoal)
                            if (newGoal && !isNaN(newGoal)) {
                                updateWeeklyGoal(Number.parseInt(newGoal))
                            }
                        }}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                    >
                        Edit Goal
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300 font-medium">Study Time Goal</span>
                        <span className="text-white text-sm font-semibold">
                            {Math.floor(weeklyProgress / 60)}h {weeklyProgress % 60}m / {Math.floor(weeklyGoal / 60)}h{" "}
                            {weeklyGoal % 60}m
                        </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-4">
                        <div
                            className={`bg-gradient-to-r h-4 rounded-full transition-all duration-500 ${weeklyGoalProgress >= 100
                                ? "from-green-500 to-emerald-500"
                                : weeklyGoalProgress >= 75
                                    ? "from-blue-500 to-cyan-500"
                                    : weeklyGoalProgress >= 50
                                        ? "from-yellow-500 to-orange-500"
                                        : "from-purple-500 to-pink-500"
                                }`}
                            style={{ width: `${Math.min(weeklyGoalProgress, 100)}%` }}
                        ></div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                            {weeklyGoalProgress >= 100 ? "🎉 Goal achieved!" : `${Math.round(weeklyGoalProgress)}% complete`}
                        </span>
                        {weeklyGoalProgress >= 100 && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-600/20 border border-green-600/30 text-green-400 rounded-full text-xs">
                                <Trophy size={12} />
                                Achieved
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Achievements Grid */}
            {achievements && achievements.length > 0 && (
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <Trophy size={20} className="text-white" />
                        </div>
                        Recent Achievements
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {achievements.slice(0, 6).map((achievement) => {
                            const IconComponent = getAchievementIcon(achievement.icon)
                            return (
                                <div
                                    key={achievement.id}
                                    className={`p-4 rounded-xl border transition-all ${achievement.earned
                                        ? "bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-600/30"
                                        : "bg-gray-800/50 border-gray-700/50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${achievement.earned ? "bg-yellow-500/20" : "bg-gray-700/50"
                                                }`}
                                        >
                                            <IconComponent size={20} className={achievement.earned ? "text-yellow-400" : "text-gray-500"} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-semibold ${achievement.earned ? "text-yellow-300" : "text-gray-400"}`}>
                                                {achievement.title}
                                            </h4>
                                        </div>
                                    </div>
                                    {achievement.earned && achievement.date && (
                                        <p className="text-gray-400 text-xs">Earned {new Date(achievement.date).toLocaleDateString()}</p>
                                    )}
                                    {!achievement.earned && <p className="text-gray-500 text-xs">Not earned yet</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Recent Activity */}
            {recentActivity && recentActivity.length > 0 && (
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Calendar size={20} className="text-white" />
                        </div>
                        Recent Activity
                    </h3>

                    <div className="space-y-3">
                        {recentActivity.slice(0, 8).map((activity) => {
                            const iconMap = {
                                BookOpen,
                                CheckCircle,
                                Award,
                                Star,
                            }
                            const IconComponent = iconMap[activity.icon] || BookOpen

                            return (
                                <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                                        <IconComponent size={16} className="text-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white text-sm font-medium">{activity.course}</div>
                                        <div className="text-gray-400 text-xs capitalize">{activity.type}</div>
                                    </div>
                                    <div className="text-gray-400 text-xs">{activity.date}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProgressTracker
