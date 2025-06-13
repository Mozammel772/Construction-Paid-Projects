"use client"

import {
  AlertCircle,
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookmarkPlus,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  Eye,
  Heart,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Play,
  RefreshCw,
  Settings,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  Zap,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const UserDashboard = () => {
  const {user} = useAuth()
  //  const [user] = useAuthState(auth);
  const navigate = useNavigate()

  // State Management
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  // Load dashboard data from API
  useEffect(() => {
    if (user?.email) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      // Get auth token (you'll need to implement this based on your auth system)
      const token = await user.getIdToken()

      const response = await fetch(`http://localhost:9000/api/user/dashboard/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setDashboardData(result.data)
      } else {
        throw new Error(result.message || "Failed to fetch dashboard data")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError(error.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    fetchDashboardData(true)
  }

  const handleCourseView = (course) => {
    navigate(`/course-details/${course._id}`)
  }

  const handleContinueLearning = (course) => {
    navigate(`/learn/${course._id}`)
  }

  const updateProgress = async (courseId, progressData) => {
    try {
      const token = await user.getIdToken()

      const response = await fetch("/api/user/progress", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          ...progressData,
        }),
      })

      if (response.ok) {
        // Refresh dashboard data to show updated progress
        fetchDashboardData(true)
      }
    } catch (error) {
      console.error("Error updating progress:", error)
    }
  }

  const progressPercentage = useMemo(() => {
    if (!dashboardData?.stats.totalCourses) return 0
    return Math.round((dashboardData.stats.completedCourses / dashboardData.stats.totalCourses) * 100)
  }, [dashboardData])

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
  ]

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Failed to load dashboard</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => fetchDashboardData()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const { stats, enrolledCourses, favorites, achievements, recentActivity, user: userData } = dashboardData

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Welcome back, {userData?.name || user?.displayName || "Student"}!</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-900/50 backdrop-blur-sm rounded-xl p-2 border border-gray-800/50">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
              >
                <IconComponent size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Enrolled Courses", value: stats.totalCourses, icon: BookOpen, color: "blue" },
                { label: "Completed", value: stats.completedCourses, icon: CheckCircle, color: "green" },
                { label: "Learning Hours", value: `${stats.totalHours}h`, icon: Clock, color: "purple" },
                { label: "Certificates", value: stats.certificates, icon: Award, color: "yellow" },
              ].map((stat, index) => {
                const IconComponent = stat.icon
                const colorClasses = {
                  blue: "from-blue-600/20 to-blue-800/20 border-blue-600/30 text-blue-400",
                  green: "from-green-600/20 to-green-800/20 border-green-600/30 text-green-400",
                  purple: "from-purple-600/20 to-purple-800/20 border-purple-600/30 text-purple-400",
                  yellow: "from-yellow-600/20 to-yellow-800/20 border-yellow-600/30 text-yellow-400",
                }[stat.color]

                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${colorClasses} backdrop-blur-sm rounded-xl p-6 border shadow-xl`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent size={24} />
                      <TrendingUp size={16} className="text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Progress Overview */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="text-blue-400" size={24} />
                Learning Progress
              </h2>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Overall Completion</span>
                    <span className="text-white font-semibold">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{stats.completedCourses}</div>
                  <div className="text-sm text-gray-400">of {stats.totalCourses}</div>
                </div>
              </div>
            </div>

            {/* Recent Activity & Continue Learning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Calendar className="text-purple-400" size={24} />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.slice(0, 5).map((activity) => {
                    const iconMap = {
                      BookOpen,
                      CheckCircle,
                      Award,
                      Heart,
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

              {/* Continue Learning */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Play className="text-green-400" size={24} />
                  Continue Learning
                </h2>
                <div className="space-y-4">
                  {enrolledCourses.slice(0, 3).map((course) => (
                    <div key={course._id} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                      <img
                        src={course.thumbnailUrl || "/placeholder.svg"}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium line-clamp-1">{course.title}</div>
                        <div className="text-gray-400 text-xs">{course.instructor?.name}</div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                          <div
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: `${course.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleContinueLearning(course)}
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                      >
                        <Play size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">My Courses ({enrolledCourses.length})</h2>
              <button
                onClick={() => navigate("/courses")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <BookmarkPlus size={16} />
                Browse More
              </button>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-xl hover:border-gray-600/50 transition-all"
                  >
                    <img
                      src={course.thumbnailUrl || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{course.instructor?.name}</p>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-sm">Progress</span>
                        <span className="text-white text-sm font-medium">{course.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleContinueLearning(course)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <Play size={14} />
                        Continue
                      </button>
                      <button
                        onClick={() => handleCourseView(course)}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Favorite Courses ({favorites.length})</h2>

            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <Heart size={48} className="text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No favorites yet</h3>
                <p className="text-gray-500 mb-6">Add courses to your favorites to find them easily</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((course) => (
                  <div
                    key={course._id}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-xl hover:border-gray-600/50 transition-all"
                  >
                    <img
                      src={course.thumbnailUrl || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{course.instructor?.name}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="text-white font-semibold">{course.price === 0 ? "Free" : `$${course.price}`}</div>
                    </div>

                    <button
                      onClick={() => handleCourseView(course)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <ArrowRight size={14} />
                      View Course
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Achievements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const iconMap = {
                  Trophy,
                  BookOpen,
                  Zap,
                  Star,
                }
                const IconComponent = iconMap[achievement.icon] || Trophy

                return (
                  <div
                    key={achievement.id}
                    className={`bg-gradient-to-br backdrop-blur-sm rounded-xl p-6 border shadow-xl ${achievement.earned
                      ? "from-yellow-600/20 to-yellow-800/20 border-yellow-600/30"
                      : "from-gray-900/80 to-gray-800/80 border-gray-700/50"
                      }`}
                  >
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${achievement.earned ? "bg-yellow-500/20" : "bg-gray-700/50"
                          }`}
                      >
                        <IconComponent size={32} className={achievement.earned ? "text-yellow-400" : "text-gray-500"} />
                      </div>
                      <h3 className={`font-semibold mb-2 ${achievement.earned ? "text-yellow-300" : "text-gray-400"}`}>
                        {achievement.title}
                      </h3>
                      {achievement.earned && achievement.date && (
                        <p className="text-gray-400 text-sm">
                          Earned on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                      {!achievement.earned && <p className="text-gray-500 text-sm">Not earned yet</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Profile Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Personal Information</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Edit3 size={16} />
                    Edit
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      {userData?.imgUrl ? (
                        <img
                          src={userData.imgUrl || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User size={32} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">
                        {userData?.name || user?.displayName || "Student"}
                      </h4>
                      <p className="text-gray-400">Learning enthusiast</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-300">{userData?.email || user?.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-gray-300">{userData?.phone || "Not provided"}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-gray-300">{userData?.instituteName || "Not provided"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-300">
                          Joined {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Recently"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  {[
                    { label: "Courses Completed", value: stats.completedCourses, icon: CheckCircle },
                    { label: "Hours Learned", value: `${stats.totalHours}h`, icon: Clock },
                    { label: "Certificates", value: stats.certificates, icon: Award },
                    { label: "Achievements", value: achievements.filter((a) => a.earned).length, icon: Trophy },
                  ].map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <IconComponent size={16} className="text-blue-400" />
                          <span className="text-gray-300 text-sm">{stat.label}</span>
                        </div>
                        <span className="text-white font-semibold">{stat.value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
