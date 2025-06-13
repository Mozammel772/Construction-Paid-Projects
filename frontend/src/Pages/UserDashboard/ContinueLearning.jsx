"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, Clock, Play, CheckCircle, Target, Star, ArrowRight, Loader2, AlertCircle, Users } from "lucide-react"

const ContinueLearning = ({ userEmail = "masudrezaog5@gmail.com" }) => {
    const navigate = useNavigate()
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [progressData, setProgressData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (userEmail) {
            fetchContinueLearningData()
        }
    }, [userEmail])

    const fetchContinueLearningData = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`http://localhost:9000/api/user/dashboard/${userEmail}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            if (result.success) {
                setEnrolledCourses(result.data.enrolledCourses || [])
                setProgressData(result.data.stats || {})
            } else {
                throw new Error(result.message || "Failed to fetch learning data")
            }
        } catch (error) {
            console.error("Error fetching continue learning data:", error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleStartLearning = (course) => {
        // Navigate to course player
        navigate(`/course-player/${course._id}`)
    }

    const formatTimeAgo = (dateString) => {
        if (!dateString) return "Never"

        const now = new Date()
        const date = new Date(dateString)
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

        if (diffInHours < 1) return "Just now"
        if (diffInHours < 24) return `${diffInHours}h ago`
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) return `${diffInDays}d ago`
        return date.toLocaleDateString()
    }

    const getProgressColor = (progress) => {
        if (progress >= 100) return "from-green-500 to-emerald-500"
        if (progress >= 75) return "from-blue-500 to-cyan-500"
        if (progress >= 50) return "from-yellow-500 to-orange-500"
        if (progress >= 25) return "from-purple-500 to-pink-500"
        return "from-gray-500 to-gray-600"
    }

    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case "beginner":
                return "text-green-400 bg-green-600/20 border-green-600/30"
            case "intermediate":
                return "text-yellow-400 bg-yellow-600/20 border-yellow-600/30"
            case "advanced":
                return "text-red-400 bg-red-600/20 border-red-600/30"
            default:
                return "text-gray-400 bg-gray-600/20 border-gray-600/30"
        }
    }

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin">
                            <Loader2 size={48} />
                        </div>
                        <p className="text-gray-400">Loading your courses...</p>
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
                    <h3 className="text-xl font-semibold text-white mb-2">Failed to load courses</h3>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button
                        onClick={fetchContinueLearningData}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <BookOpen size={20} className="text-white" />
                        </div>
                        Continue Learning
                    </h2>
                    <button
                        onClick={() => navigate("/courses")}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <BookOpen size={16} />
                        Browse More
                    </button>
                </div>

                {/* Progress Overview */}
                {progressData && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Target size={20} className="text-blue-400" />
                                <span className="text-gray-300 text-sm">Total Courses</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{progressData.totalCourses || 0}</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle size={20} className="text-green-400" />
                                <span className="text-gray-300 text-sm">Completed</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{progressData.completedCourses || 0}</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock size={20} className="text-purple-400" />
                                <span className="text-gray-300 text-sm">Total Hours</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{progressData.totalHours || 0}h</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Courses Grid */}
            {enrolledCourses.length === 0 ? (
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 shadow-xl text-center">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No courses enrolled yet</h3>
                    <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course</p>
                    <button
                        onClick={() => navigate("/courses")}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Browse Courses
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {enrolledCourses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl hover:border-gray-600/50 transition-all group"
                        >
                            {/* Course Thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={course.thumbnailUrl || "/placeholder.svg?height=200&width=350"}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => handleStartLearning(course)}
                                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    >
                                        <Play size={24} className="text-white ml-1" />
                                    </button>
                                </div>
                                {course.progress >= 100 && (
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle size={16} className="text-white" />
                                    </div>
                                )}
                                <div className="absolute bottom-3 left-3 right-3">
                                    <div className="w-full bg-black/50 backdrop-blur-sm rounded-full h-2">
                                        <div
                                            className={`bg-gradient-to-r ${getProgressColor(course.progress || 0)} h-2 rounded-full transition-all duration-500`}
                                            style={{ width: `${course.progress || 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">{course.title}</h3>
                                    <div className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(course.level)}`}>
                                        {course.level || "Beginner"}
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm mb-3">{course.instructor?.name || "Unknown Instructor"}</p>

                                {/* Course Stats */}
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{course.duration || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-400 fill-current" />
                                        <span>{course.rating || "4.5"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={14} />
                                        <span>{course.enrollmentCount || 0}</span>
                                    </div>
                                </div>

                                {/* Progress Info */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300 text-sm font-medium">Progress</span>
                                        <span className="text-white text-sm font-semibold">{course.progress || 0}%</span>
                                    </div>
                                    <div className="text-xs text-gray-400 mb-3">Last accessed {formatTimeAgo(course.lastAccessed)}</div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleStartLearning(course)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all transform hover:scale-105"
                                    >
                                        <Play size={16} />
                                        {course.progress > 0 ? "Continue" : "Start"}
                                    </button>
                                    <button
                                        onClick={() => navigate(`/course-details/${course._id}`)}
                                        className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Stats */}
            {enrolledCourses.length > 0 && (
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <h3 className="text-lg font-semibold text-white mb-4">Learning Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400 mb-1">{enrolledCourses.length}</div>
                            <div className="text-gray-400 text-sm">Enrolled</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">
                                {enrolledCourses.filter((c) => c.progress >= 100).length}
                            </div>
                            <div className="text-gray-400 text-sm">Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400 mb-1">
                                {enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length}
                            </div>
                            <div className="text-gray-400 text-sm">In Progress</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400 mb-1">
                                {Math.round(
                                    enrolledCourses.reduce((acc, course) => acc + (course.progress || 0), 0) / enrolledCourses.length,
                                ) || 0}
                                %
                            </div>
                            <div className="text-gray-400 text-sm">Avg Progress</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContinueLearning
